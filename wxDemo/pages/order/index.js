// pages/order/index.js
import {request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"全部",
        isActive:true
      },
      {
        id:1,
        value:"待付款",
        isActive:false
      },
      {
        id:2,
        value:"待发货",
        isActive:false
      },
      {
        id:3,
        value:"退款/退货",
        isActive:false
      }
    ],
    order:[]
  },
  // 根据订单选项来激活tabs被选中
  changeTitleIndex(index){
    // 使用浅拷贝的方法赋值
    let {tabs} = Object.assign({}, this.data);;
    tabs.forEach((v,i)=>{
      i == index?v.isActive=true:v.isActive=false
    })
    this.setData({
      tabs
    })
  },
  handleTabsItemChange(e){
    const {index} = e.detail;
    this.changeTitleIndex(index);
    // 重新发请求
    this.getOrder(index+1)
  },
  // options只有在onLoad中才能拿到
  onLoad: function (options) {

  },

  onReady: function () {

  },
  // 获取订单列表的方法
  async getOrder(type){
  const res = await request({
    url:"/my/orders/all",
    data:{type}
  })

  this.setData({
    order:res.orders.map(v=>{
      return {...v,create_time_cn:(new Date(v.create_time*1000).toLocaleString())}
    })
  })
  },

  onShow: function () {
    const token = wx.getStorageSync("token");
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index'
      });
        return;
    }
      

  //  获取当前页面栈，最多10个
  let pages =  getCurrentPages();
  // getCurrentPages数组中索引最大的页面，就是当前页面
  let currentPage = pages[pages.length-1];
  this.getOrder(currentPage.options.type)
  this.changeTitleIndex(currentPage.options.type-1);
  }
})