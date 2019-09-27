
import regeneratorRuntime from '../../lib/runtime/runtime';
import { request, requestPayment, showToast } from "../../request/index.js";
Page({
  data: {
    // 用户收货信息
    address: {},
    // 购物车数据
    carts: [],
    // 总价格
    totalPrice: 0,
    // 总数量
    totalNum: 0
  },

  onShow() {
    // 获取缓存中的收货地址 
    const address = wx.getStorageSync("address");
    // 3 获取缓存中的购物车数据
    let carts = wx.getStorageSync("carts") || [];
    carts = carts.filter(v => v.checked);
    this.setData({ carts, address })
    this.countData(carts);
  },
  // 计算数据
  countData(carts) {
    //  要 元素的选中属性  checked=true 来计算价格 
    let totalPrice = 0;
    // 要 元素的选中属性  checked=true 来计算  数量
    let totalNum = 0;
    carts.forEach((v, i) => {
      if (v.checked) {
        // 计算价格和数量
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      }
    });
    this.setData({
      totalPrice,
      totalNum
    })
  },
  // 点击支付按钮
  handleOrderPay() {
    this.orderPay();
  },

  // 执行支付的逻辑
  async orderPay() {
    try {
      
    // 判断有没有token
    const token = wx.getStorageSync("token");
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index'
      });
      return;
    }
    // 获取订单参数
    const { totalPrice, address, carts } = this.data;
    const order_price = totalPrice;
    const consignee_addr = address.detailAddress;
    const goods = carts.map(v => {
      return {
        goods_id: v.goods_id,
        goods_number: v.num,
        goods_price: v.goods_price
      }
    });

    const orderParams = {
      order_price, consignee_addr, goods
    }
    // 创建订单
    const { order_number } = await request({ url: "/my/orders/create", method: "post", data: orderParams });
    //获取支付参数
    const { pay } = await request({ url: "/my/orders/req_unifiedorder", method: "post", data: { order_number } });
    // 调起微信内置的支付
    await requestPayment(pay);
    //查询刚才的订单支付状态
    const message = await request({ url: "/my/orders/chkOrder", method: "post", data: { order_number } });

    await showToast({ title: message, mask: true });
 
    let localCarts=wx.getStorageSync("carts");
    wx.setStorageSync("carts", localCarts.filter(v=>!v.checked));
    wx.navigateTo({
      url: '/pages/order/index',
    });
    } catch (error) {
        console.log(error);
    }
  }

})