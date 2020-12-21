import {request} from "../../request/index.js"
import {login} from "../../utils/asyncWx.js"
Page({
  // 获取用户信息
  async getUserInfo(e){
    // 获取用户信息
    const {encryptedData,rawData,signature,iv} = e.detail;
    // 获取小程序登录后的code值
    const {code} =await login();
    // console.log(code);
    // 发送请求 获取token
    // 没有企业账号，发请求获取不了本案例的token
    // const loginParams = {encryptedData,rawData,signature,iv,code}
    // const res = await request({
    //   url:"/users/wxlogin",
    //   data:loginParams,
    //   method:"post"
    // })
    // console.log(res);

    // 这里直接用的老师获取来的token
    wx.setStorageSync('token', "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo");
    wx.navigateBack({
      delta: 1
    });
  }
})