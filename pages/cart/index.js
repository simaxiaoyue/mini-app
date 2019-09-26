import regeneratorRuntime from '../../lib/runtime/runtime';
import { getSetting, openSetting, chooseAddress } from "../../request/index.js";

Page({
  data: {
    //地址信息
    address: {},
    //购物信息
    cartData:[]
  },
  onShow() {
    //获取缓存中的收货地 
    const address = wx.getStorageSync("address");
    //获取缓存中的购物车数据
    const carts = wx.getStorageSync("carts");
    this.setData({ carts, address })
  },
  handleAdd(){
    this.addAddress()
  },
  async addAddress() {
    try {
      // 1 获取用户的 授权状态
      const result1 = await getSetting();
      const auth = result1.authSetting["scope.address"];
      // 2 判断授权状态
      if (auth === false) {
        await openSetting();
      }
      const result2 = await chooseAddress();
      result2.detailAddress = result2.provinceName + result2.cityName + result2.countyName + result2.detailInfo;
      // 4 把收货地址存入到 缓存中（下次打开小程序获取页面使用） 和 data（给页面渲染要用的）
      this.setData({
        address: result2
      })
      wx.setStorageSync("address", result2);
    } catch (error) {
      console.log(error);
    }
  }
})