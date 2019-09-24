import { request } from "../../request/index.js"

Page({
  data: {
    //左侧菜单数据
    menuList: [],
    //右侧列表数据
    cateList: [],
    // 当前索引
    currentIndex: 0,
    //滚动条位置
    scrollTop:0
  },
  //全局数据
  Cates: [],
  onLoad() {
    this.loadData()
  },
  //缓存数据,避免短时多次发请求
  loadData() {
    let localData = wx.getStorageSync('hmyg');
    //判断是否有旧数据,如果有,判断是否超时;如果没有,缓存新数据.
    if (localData) {
      //判断是否超时,如果超时,重新缓存;如果不超时,获取缓存数据.
      if (Date.now() - localData.time > 1000 * 10) {
        this.getCateData();
      } else {
        this.Cates = localData.data
        //左边菜单数据
        let menuList = this.Cates.map(e => e.cat_name)
        //右边列表数据
        let cateList = this.Cates[0].children
        this.setData({
          menuList, cateList
        })
      }
    } else {
      this.getCateData();
    }
  },


  //获取分类数据
  getCateData() {
    request({ url: "/categories" })
      .then(res => {
        // console.log(res);
        this.Cates = res.data.message
        //缓存数据
        wx.setStorageSync('hmyg', {
          data: this.Cates,
          time: Date.now()
        });

        //左边菜单数据
        let menuList = this.Cates.map(e => e.cat_name)
        //右边列表数据
        let cateList = this.Cates[0].children
        this.setData({
          menuList, cateList
        })
      })
  },
  //点击菜单切换
  changeMenu(e) {
    const { index } = e.target.dataset
    let cateList = this.Cates[index].children
    this.setData({
      currentIndex: index,
      cateList,
      scrollTop:0
    })
  }
})