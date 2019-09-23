import { request } from "../../request/index.js"

Page({
  data: {
    //左侧菜单数据
    menuList: [],
    //右侧列表数据
    cateList: [],
    // 当前索引
    currentIndex: 0
  },
  onLoad() {
    this.getCateData()
  },
  //获取分类数据
  getCateData() {
    request({ url: "/categories" })
      .then(res => {
        // console.log(res);
        let menuList = res.data.message.map(e => e.cat_name)
        let cateList = res.data.message[0].children
        this.setData({
          menuList, cateList
        })

      })
  },
  //点击菜单切换
  changeMenu(e) {
    const { index } = e.target.dataset
    this.setData({
      currentIndex:index
    })
  }
})