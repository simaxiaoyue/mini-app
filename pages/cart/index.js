import regeneratorRuntime from '../../lib/runtime/runtime';
import { getSetting, openSetting, chooseAddress } from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //地址信息
    address: {},
    //购物信息
    cartData: []
  },
  onShow() {

  },
  async addAddress() {
    let res1 = await getSetting();
    const auth = res1.authSetting["scope.address"]
    if (auth === false) {
      await openSetting()
    }
    res2.detailAddress = res2.provinceName + res2.cityName + res2.countyName + res2.detailInfo;
    let res2 = await chooseAddress();
    this.setData({
      address: res2
    })
    console.log(res2);
    // wx.getSetting({
    //   success: (result1) => {
    //     // console.log(result1);
    //     const auth = result1.authSetting["scope.address"]
    //     // console.log(auth);
    //     if (auth === false) {
    //       wx.openSetting({
    //         success: (result3) => {
    //           console.log(result3);
    //           wx.chooseAddress({
    //             success: (result4) => {
    //               console.log(result4);
    //             }
    //           });
    //         }
    //       });
    //     } else {
    //       wx.chooseAddress({
    //         success: (result2) => {
    //           console.log(result2);
    //         }
    //       });
    //     }
    //   }
    // });

    // wx.openSetting()
  }


})