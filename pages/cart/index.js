import regeneratorRuntime from '../../lib/runtime/runtime';
import { getSetting, openSetting, chooseAddress } from "../../request/index.js";

Page({
  data: {
    //地址信息
    address: {},
    //购物信息
    carts: [],
    //全选状态
    allChecked: false,
    //总价格
    totalPrice: 0,
    //总数量
    totalNum: 0
  },
  onShow() {
    //获取缓存中的收货地 
    const address = wx.getStorageSync("address");
    //获取缓存中的购物车数据
    const carts = wx.getStorageSync("carts");
    this.setData({ carts, address });
    //结算
    this.cuclOrderPay(carts);
  },
  handleAdd() {
    this.addAddress()
  },
  async addAddress() {
    try {
      // 获取用户的 授权状态
      const res1 = await getSetting();
      const auth = res1.authSetting["scope.address"]
      //判断是否有授权
      if (auth === false) {
        //没有授权,打开授权设置页面手动授权
        await openSetting()
      }
      //拼接地址
      const res2 = await chooseAddress();
      res2.detailAddress = res2.provinceName + res2.cityName + res2.countyName + res2.detailInfo;
      this.setData({
        address: res2
      })
      //存入本地
      wx.setStorageSync('address', res2);
    } catch (error) {
      console.log(error);
    }
  },
  //结算
  cuclOrderPay(carts) {
    //总价
    let totalPrice = 0
    //总数量
    let totalNum = 0
    //全选状态
    let allChecked = true
    carts.forEach(v => {
      //计算总价
      totalPrice += v.goods_price * v.num
      //计算总数量
      totalNum += v.num
      if (!v.checked) {
        allChecked = false
      } else {
        allChecked = true
      }
    })
    //存入data
    this.setData({
      totalPrice, totalNum, allChecked
    })

  }
})