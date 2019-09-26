import regeneratorRuntime from '../../lib/runtime/runtime';
import { getSetting, openSetting, chooseAddress, showModal ,showToast} from "../../request/index.js";

Page({
  data: {
    //地址信息
    address: {},
    //购物信息
    carts: [],
    //全选状态
    allChecked: false,
    //总价格
    totalPrice: 0,
    //总数量
    totalNum: 0
  },
  onShow() {
    //获取缓存中的收货地 
    const address = wx.getStorageSync("address");
    //获取缓存中的购物车数据
    const carts = wx.getStorageSync("carts");
    this.setData({ carts, address });
    //结算
    this.cuclOrderPay(carts);
  },
  //点击结算按钮
 async tapPay(){
    const{totalNum,address}=this.data
    //判断购物车是否有商品
    if (totalNum === 0) {
      await showToast({
        title: "您还没选购商品",
        icon: 'none',
        mask: true
      });
      return;
    }
    //判断是否添加了收货地址
    if (address === "") {
      await showToast({
        title: "请选择收货地址",
        icon: 'none',
        mask: true
      });
      return;
    }
    //跳转页面
    wx.navigateTo({
      url: '/pages/pay/index'
    });
  },
  //点击加减商品
  async numChange(e) {
    // console.log(e);
    //获得+1或-1操作
    const { change, index } = e.target.dataset
    //取出购物车数据
    const { carts } = this.data
    // -1时判断num是否已经为1
    if (carts[index].num === 1 && change === -1) {
      let res = await showModal({
        title: '警告',
        content: '您确定要删除吗？',
      })
      if (res) {
        carts.splice(index, 1)
      }
    } else {
      carts[index].num += change
    }
    //保存数据到本地
    this.setData({
      carts
    })
    wx.setStorageSync('carts', carts);
    //重新结算
    this.cuclOrderPay(carts)
  },
  //点击商品前的多选框
  checkBoxChange(e) {
    //取出索引
    const { index } = e.target.dataset
    //取出购物车数据
    const { carts } = this.data
    //状态取反
    carts[index].checked = !carts[index].checked
    // console.log(carts);
    //保存数据到本地
    this.setData({
      carts
    })
    wx.setStorageSync('carts', carts);
    //重新结算
    this.cuclOrderPay(carts)

  },
  //添加地址
  async addAddress() {
    try {
      // 获取用户的 授权状态
      const res1 = await getSetting();
      const auth = res1.authSetting["scope.address"]
      //判断是否有授权
      if (auth === false) {
        //没有授权,打开授权设置页面手动授权
        await openSetting()
      }
      //拼接地址
      const res2 = await chooseAddress();
      res2.detailAddress = res2.provinceName + res2.cityName + res2.countyName + res2.detailInfo;
      this.setData({
        address: res2
      })
      //存入本地
      wx.setStorageSync('address', res2);
    } catch (error) {

    }
  },
  //结算
  cuclOrderPay(carts) {
    //总价
    let totalPrice = 0
    //总数量
    let totalNum = 0
    //全选状态
    let allChecked = true
    carts.forEach(v => {

      if (!v.checked) {
        allChecked = false
      } else {
        //计算总价
        totalPrice += v.goods_price * v.num
        //计算总数量
        totalNum += v.num
      }
    })
    //判断是否为空
    allChecked = carts.length === 0 ? false : true;
    //存入data
    this.setData({
      totalPrice, totalNum, allChecked
    })
  }
})