// pages/cart/index.js
import { request } from '../../request/index.js';
import {showModal,showToast,requestPayment} from '../../utils/asyncWx.js'
Page({
  data: {
    // 地址
    address:{},
    // 购物车
    cart:[],
    // 总价格
    totalPrice:0,
    // 总数量
    totalNum:0
  },
  onLoad: function (options) {

  },
  // 计算底部工具栏全选价格数量方法
  onReady: function () {

  },
  // 绑定支付按钮点击事件
  async orderPay(){
    try {
      // 判断缓存中有没有token
    const token = wx.getStorageSync("token");
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index',
      })
      return;
    }
    // 创建订单 
    // 请求头参数
    // request.js中优化了
    // const header = {Authorization:token};
    // console.log(header)
    // 请求体参数
    const order_price = this.data.totalPrice;
    const consignee_addr = this.data.address.provinceName+this.data.address.cityName+this.data.address.countyName+this.data.address.detailInfo;
    const cart = this.data.cart
    let goods=[];
    cart.forEach(v=>goods.push({
      goods_id:v.goods_id,
      goods_number:v.goods_number,
      goods_price:v.goods_price
    }))
    // 发送创建订单 请求
    const orderParams = {order_price,consignee_addr,goods}
    console.log(orderParams)
    const {order_number} = await request({
      url:"/my/orders/create",
      method:"POST",
      data:orderParams,
      
    })
    // console.log(order_number)
    // 发起预支付接口
    const {pay} = await request({
      url:"/my/orders/req_unifiedorder",
      method:"POST",
      data:{order_number}
    })
    // console.log(pay)
    // 发起支付

    /**
     * 到这一步需要企业账号 所以无法支付
     */
     await requestPayment(pay)
    // 查询后台订单状态
    const res = await request({
      url:"/my/orders/chkOrder",
      method:"POST",
      data:{order_number}
    })
    // console.log(res)
    await showToast({title:"支付成功",icon:"success"})
    // 删除已支付的商品
    // 获取全部商品
    let newCart = wx.getStorageSync('cart');
    newCart = newCart.filter(v=>!v.checked)
    wx.setStorageSync('cart', newCart)
    // 跳转页面
    wx.navigateTo({
      url: '/pages/order/index'

    })
    } catch (error) {
      await showToast({title:"支付失败",icon:"none"})
      console.log(error)
    }
  },
  onShow: function () {
    // 获取缓存中的收获地址
    const address = wx.getStorageSync("address");
    // 获取缓存中的购物车数据
    let cart = wx.getStorageSync("cart")||[];
    // 过滤后的购物车数组
    cart = cart.filter(v=>v.checked)
    // 总价格 总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
        totalPrice+=v.num*v.goods_price;
        totalNum+=v.num
    });
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    });
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },


})