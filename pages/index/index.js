import { request } from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    swiperData: [],
    navData: [],
    floorData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getSwiperData();
    this.getCatItems();
    this.getFloorData()
  },
  //获取轮播图数据
  async getSwiperData() {
    let res = await request({ url: "/home/swiperdata" })
    this.setData({
      swiperData: res
    })
  },
  //获取导航数据
  async getCatItems() {
    let res = await request({ url: "/home/catitems" })
    // console.log(res);
    this.setData({
      navData: res
    })
  },
  //获取列表数据
  async getFloorData() {
    let res = await request({ url: "/home/floordata" })
    // console.log(res);
    this.setData({
      floorData: res
    })
  }
})