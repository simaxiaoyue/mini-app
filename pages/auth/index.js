import regeneratorRuntime from '../../lib/runtime/runtime';
import { login, request } from "../../request/index.js";

Page({
  async  getuserinfo(e) {
    // console.log(e);
    //获取code值
    const { code } = await login();
    //获取用户数据
    const { encryptedData, rawData, iv, signature } = e.detail;
    let getToken = { encryptedData, rawData, iv, signature, code }
    //  获取用户token
    const {token} = await request({
      url: "/users/wxlogin",
      method: "POST",
      data: getToken
    });
    //存入本地
    wx.setStorageSync("token", token);
    //返回上一页
    wx.navigateBack({
      delta: 1
    });
  }
})