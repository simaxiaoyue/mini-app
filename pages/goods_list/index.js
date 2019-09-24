import { request } from "../../request/index.js";

Page({
  data: {
    titleList: [
      { id: 0, text: "综合" },
      { id: 1, text: "销量" },
      { id: 2, text: "价格" }
    ],
    goodList: []
  },
  //发送请求所需要的参数
  GoodQuery: {
    //关键字
    query: "",
    //分类id
    cid: 0,
    //页码
    pagenum: 1,
    //页容量
    pagesize: 20
  },
  onLoad(options) {
    this.GoodQuery.cid = options.cid
    this.getGoodData()

  },
  //获取商品列表
  getGoodData() {
    request({
      url: "/goods/search",
      data: this.GoodQuery
    }).then(res => {
      // console.log(res);
      let goodList = res.data.message.goods;
      console.log(goodList);
      this.setData({
        goodList
      })
      
    })
  }
})