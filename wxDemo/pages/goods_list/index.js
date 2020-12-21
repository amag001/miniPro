// pages/goods_list/index.js
import {request} from "../../request/index.js"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
    ],
    goodsList:[]
  },
  // 接口要的参数
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  // 总页数
  totalPage:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid||"";
    this.QueryParams.query = options.query||"";
    this.getGoodsList()
  },
  // 获取商品列表数据
  async getGoodsList(){
    const res = await request({
      url:"/goods/search",
      data:this.QueryParams
    })
    // 获取总条数
    const total = res.total
    // 计算总页数
   this.totalPage = Math.ceil(total/this.QueryParams.pagesize)
    this.setData({
      // 数组拼接
      goodsList:[...this.data.goodsList,...res.goods]
    })
  },
  handleTabsItemChange(e){
    console.log(e);
    const {index} = e.detail;
    // 使用浅拷贝的方法赋值
    let {tabs} = Object.assign({}, this.data);;
    tabs.forEach((v,i)=>{
      i == index?v.isActive=true:v.isActive=false
    })
    this.setData({
      tabs
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.QueryParams.pagenum=1;
    this.setData({
      goodsList:[]
    })
    this.getGoodsList()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 判断还有没有下一页数据
    if(this.QueryParams.pagenum>=this.totalPage){
      // 没下一页了
     wx.showToast({
       title: '没数据了别拉了',
       icon: 'none',
       duration: 1500
     });
       
    }else{
      // 有下一页
      this.QueryParams.pagenum++;
      this.getGoodsList()
    }
  }
})