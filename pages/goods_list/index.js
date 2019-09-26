import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
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
  async getGoodData() {
   let res=await request({
      url: "/goods/search",
      data: this.GoodQuery
    })
      // console.log(res);
      let newList = res.goods;
      let oldList = this.data.goodList;
      //获取数据总条数
      let total = res.total;
      //计算总页数
      this.totalPage = Math.ceil(total / this.GoodQuery.pagesize)
      this.setData({
        goodList: [...oldList, ...newList] 
      })
      //关闭下拉效果
      wx.stopPullDownRefresh()
  },
  //滚动条触底时触发
  onReachBottom() {
    //判断当前页是否大于等于总页数,如果大,说明没有数据;如果小,获取下一页数据
    if (this.GoodQuery.pagenum >= this.totalPage) {
      this.setData({
        isExitData:true
      })
      //提示框
     wx.showToast({
       title: '已经没有下一页了',
       icon: 'none',//默认为success,一个对勾
       mask: true,
     });
    } else {
      //当前页数+1,获取下一页数据
      this.GoodQuery.pagenum++;
      this.getGoodData()
    }
  },
    //下拉时触发
  onPullDownRefresh: function () {
    //重置页面
    this.GoodQuery.pagenum=1;
    this.setData({
      goodsList:[],
      isExitData:false
    });
    this.getGoodData()
  }
})