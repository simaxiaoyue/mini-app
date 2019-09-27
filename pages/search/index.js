// pages/search/index.js
import regeneratorRuntime from '../../lib/runtime/runtime';
import { request } from "../../request/index.js";
Page({
  data: {
    inputValue: "",
    isSearch: false,
    searchList: []
  },
  //定时器id
  timeoutId: -1,
  //输入框
  getInput(e) {
    const { value } = e.detail;
    //如果value有数据,显示取消按钮
    if (value.trim()) {
      this.setData({
        isSearch: true
      })
    }
      clearTimeout(this.timeoutId)
      this.timeoutId = setTimeout(() => {
        this.getQuery(value)
      }, 1000)
    
  },
  //商品搜索
  async getQuery(value) {

    const res = await request({ url: "/goods/qsearch", data: { query: value } });
    //  console.log(res);
    this.setData({
      searchList: res
    })
  },
  //点击取消
  tapCancel() {
    this.setData({
      inputValue: "",
      isSearch: false,
      searchList: []
    })
  },

})