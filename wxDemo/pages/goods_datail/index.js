import {request} from "../../request/index.js"
// pages/goods_datail/index.js
Page({
  data: {
    goodsObj:{},
    // 商品是否被收藏
    isCollect:false
  },
  onShow: function () {
    let pages =  getCurrentPages();
    let currentPage = pages[pages.length-1];
    let options = currentPage.options;
    const {goods_id} =options;
    this.getGoodsDetail(goods_id);
  },
  // 点击收藏按钮
  collect(){
    let isCollect =false;
    // 获取缓存中被收藏的商品列表
    let collect = wx.getStorageSync("collect")||[];
    // 判断该商品是否被收藏
    // this.data.goodsObj.goods_id 为当前的商品id
    let index = collect.findIndex(v=>v.goods_id===this.data.goodsObj.goods_id);
    // 当index不为-1，表示被收藏过了 ，收藏列表里有当前商品
    if (index!==-1) {
      collect.splice(index,1)
      isCollect=false;
      wx.showToast({
        title: '已取消',
        icon: 'success',
        mask: true,
      });
        
    }else{
      collect.push(this.data.goodsObj)
      isCollect=true
      wx.showToast({
        title: '已收藏',
        icon: 'success',
        mask: true,
      });
    }
    // 把数组存入缓存中
    wx.setStorageSync('collect', collect);
    // 修改data中的属性 isCollect
    this.setData({isCollect})
      
  },
  // 获取商品detail
  async getGoodsDetail(goods_id){
    const goodsObj = await request({
      url:"/goods/detail",
      data:{goods_id}
    })
    this.setData({
      //  data中尽量存放页面中需要的数据
      // goodsObj:{
      //   goods_name:goodsObj.goods_name,
      //   goods_price:goodsObj.goods_price,
      //   // iphone部分手机不支持webp图片格式 转换一下 但是要确保后台有jpg文件
      //   goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,".jpg"),
      //   pics:goodsObj.pics
      // }
      goodsObj
     })
     // 获取缓存中商品收藏的数组
     let collect = wx.getStorageSync("collect")||[];
     // 判断当前商品是否被收藏
     let isCollect =collect.some(v=>v.goods_id==this.data.goodsObj.goods_id)
     console.log(isCollect);
     this.setData({
      isCollect
     })
  },
  // 预览图片轮播图
  prevewImage(e){
    const urls = this.data.goodsObj.pics.map(v=>v.pics_mid)
    const current = e.currentTarget.dataset.url
    wx.previewImage({
      current,
      urls: urls
    });
  },
  // 加入购物车
  cartAdd(){
    // 1.获取缓存中的购物车数据  数组
    let cart = wx.getStorageSync("cart")||[];
    // 2.判断商品是否存在购物车数组中
    let index = cart.findIndex(v=>v.goods_id === this.data.goodsObj.goods_id);
    if(index == -1){
      // 表示不存在 第一次添加
      this.setData({
        'goodsObj.num':1,
        'goodsObj.checked':true
      })
      cart.push(this.data.goodsObj)
    }else{
      // 购物车已经存在此商品
      cart[index].num++;
    }
    // 把购物车添加到缓存中去
    wx.setStorageSync("cart", cart);
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      mask:true,
      duration: 1000,
      
    });
      
      
  },
  onReady: function () {

  },

  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})