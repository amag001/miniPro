// pages/category/index.js
import {
  request
} from "../../request/index.js"
Page({
  data: {
    // 左侧菜单数据
    leftMeauList: [],
    // 右侧内容数据
    rightContent: [],
    // 被点击菜单
    currentIndex: 0,
    // 右侧内容离顶部距离
    scrollTop: 0
  },
  // 接口的返回数据
  Cates: [],
  onLoad: function (options) {
    /*
    1.先判断一下本地存储有没有旧缓存
    2.没有旧数据发请求
    3.有旧数据并没有过期，就使用本地存储的数据
    */

    // 1.获取本地存储的数据
    const Cates = wx.getStorageSync('cates')
    // 2.判断
    if (!Cates) {
      // 不存在 发送请求
      this.getCates();
    } else {
      // 有旧数据 定义过期时间10S
      if (Date.now() - Cates.time > 1000 * 10) {
        // 过期了
        this.getCates();
      } else {
        this.Cates = Cates.data
        let leftMeauList = this.Cates.map(item => {
          return item.cat_name
        })
        let rightContent = this.Cates[0].children
        this.setData({
          leftMeauList,
          rightContent
        })
      }
    }
  },
  // 获取分类数据
  async getCates() {
    // request({
    //   url:"/categories"
    // }).then(res=>{
    //   this.Cates = res.data.message;
    //   // 把接口的数据存入到本地存储中
    //   wx.setStorageSync('cates',{time:Date.now(),data:this.Cates})
    //   // 构造左侧的大菜单数据
    //   let leftMeauList = this.Cates.map(item =>{return item.cat_name})
    //   // 构造右侧商品数据
    //   // let rightContent = this.Cates.map(item=>item.children)
    //   let rightContent = this.Cates[0].children
    //   this.setData({
    //     leftMeauList,
    //     rightContent
    //   })
    // }) 

    // 使用es7中的 async 和 await 改造
    const res = await request({
      url: "/categories"
    })
    this.Cates = res;
    // 把接口的数据存入到本地存储中
    wx.setStorageSync('cates', {
      time: Date.now(),
      data: this.Cates
    })
    // 构造左侧的大菜单数据
    let leftMeauList = this.Cates.map(item => {
      return item.cat_name
    })
    // 构造右侧商品数据
    // let rightContent = this.Cates.map(item=>item.children)
    let rightContent = this.Cates[0].children
    this.setData({
      leftMeauList,
      rightContent
    })

  },
  handleItemTap(e) {
    const {
      index
    } = e.currentTarget.dataset;
    // 渲染右侧商品内用，不要调用getCates()太浪费性能了，所有值一开始就获取完了，传入不同索引即可。
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop: 0
    })

  },
  onReady: function () {

  },

  onShow: function () {

  },

  onHide: function () {

  }
})