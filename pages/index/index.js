
import {request} from "../../request/index.js"

Page({
  data: {
    swiperData: [],
    navData:[],
    floorData:[]
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
    request({url: "/home/swiperdata"})
    .then(res=>{
        // console.log(res);
        this.setData({
          swiperData: res.data.message
        })
    })
  
    // wx.request({
    //   url: "https://api.zbztb.cn/api/public/v1/home/swiperdata",
    //   success: (res) => {
    //     // console.log(res);
    //     this.setData({
    //       swiperData: res.data.message
    //     })
    //   }
    // })
  },
  //获取导航数据
  getCatItems() {
    wx.request({
      url: "https://api.zbztb.cn/api/public/v1/home/catitems",
      success: (res) => {
        // console.log(res);
        this.setData({
          navData: res.data.message
        })
      }
    })
  },
  //获取列表数据
  getFloorData() {
    wx.request({
      url: "https://api.zbztb.cn/api/public/v1/home/floordata",
      success: (res) => {
        console.log(res);
        this.setData({
          floorData: res.data.message
        })
      }
    })
  }
})