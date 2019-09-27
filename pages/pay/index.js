import regeneratorRuntime from '../../lib/runtime/runtime';
import { request, requestPayment,showToast } from "../../request/index.js";

Page({
  data: {
    //地址信息
    address: {},
    //购物信息
    carts: [],
    //总价格
    totalPrice: 0,
    //总数量
    totalNum: 0
  },
  onShow() {
    //获取缓存中的收货地 
    const address = wx.getStorageSync("address");
    //获取缓存中的购物车数据
    let carts = wx.getStorageSync("carts");
    //
    carts = carts.filter(v => v.checked);
    this.setData({ carts, address });
    //结算
    this.cuclOrderPay(carts);
  },
  //结算
  cuclOrderPay(carts) {
    //总价
    let totalPrice = 0
    //总数量
    let totalNum = 0
    carts.forEach(v => {
      if (v.checked) {
        //计算总价
        totalPrice += v.goods_price * v.num
        //计算总数量
        totalNum += v.num
      }
    })
    //存入data
    this.setData({
      totalPrice, totalNum
    })
  },
  //点击支付
  async tapToPay() {
    let token = wx.getStorageSync("token");
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index',
      });
      return
    }
    //获取收货地址,订单数组
    const { address, carts, totalPrice } = this.data
    const order_price = totalPrice;
    const consignee_addr = address.detailAddress;
    //获取订单数组所需参数
    const goods = carts.map(v => {
      return {
        goods_id: v.goods_id,
        goods_number: v.num,
        goods_price: v.goods_price
      }
    });
    //创建订单所需参数
    const orderData = {
      order_price, consignee_addr, goods
    }
    //创建订单,获取订单号
    const { order_number } = await request({ url: "/my/orders/create", method: "post", data: orderData, header: { Authorization: token } });
    //获得支付参数
    const { pay } = await request({ url: "/my/orders/req_unifiedorder", method: "post", data: { order_number }, header: { Authorization: token } });
    //调起微信内置的支付
    await requestPayment(pay);
    //查询订单支付状态
    const message = await request({ url: "/my/orders/chkOrder", method: "post", data: { order_number }, header: { Authorization: token } });
    await showToast({ title: message, mask: true });
    //
    let localCarts=wx.getStorageSync("carts");

    wx.setStorageSync("carts", localCarts.filter(v=>!v.checked));
    wx.navigateTo({
      url: '/pages/order/index',
    });
 
  }
})