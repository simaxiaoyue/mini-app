import { request } from "../../request/index.js";

Page({
  data: {
    titleList: [
      { id: 0, text: "综合" },
      { id: 1, text: "销量" },
      { id: 2, text: "价格" }
    ],
    goodList: [],
    isExitData:false
  },
  //列表总页数
  totalPage: 1,
  //发送请求所需要的参数
  GoodQuery: {
    //关键字
    query: "",
    //分类id
    cid: 0,
    //页码
    pagenum: 1,
    //页容量
    pagesize: 10
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
      let newList = res.data.message.goods;
      let oldList = this.data.goodList;
      //获取数据总条数
      let total = res.data.message.total;
      //计算总页数
      this.totalPage = Math.ceil(total / this.GoodQuery.pagesize)
      this.setData({
        goodList: [...oldList, ...newList] 
      })

    })
  },
  //滚动条触底时触发
  onReachBottom() {
    if (this.GoodQuery.pagenum >= this.totalPage) {
      this.setData({
        isExitData:true
      })
     wx.showToast({
       title: '已经没有下一页了',
       icon: 'none',
       mask: true,
     });
    } else {
      this.GoodQuery.pagenum++;
      this.getGoodData()
    }
  }
})