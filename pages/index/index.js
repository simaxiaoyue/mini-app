
import { request } from "../../request/index.js"

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
  getSwiperData() {
    request({ url: "/home/swiperdata" })
      .then(res => {
        // console.log(res);
        this.setData({
          swiperData: res.data.message
        })
      })
  },
  //获取导航数据
  getCatItems() {
    request({ url: "/home/catitems" })
      .then(res => {
        // console.log(res);
        this.setData({
          navData: res.data.message
        })
      })
  },
  //获取列表数据
  getFloorData() {
    request({ url: "/home/floordata" })
      .then(res => {
        // console.log(res);
        this.setData({
          floorData: res.data.message
        })
      })
  }
})