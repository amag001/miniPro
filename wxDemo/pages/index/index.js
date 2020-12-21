//Page 
import {request} from "../../request/index.js"
Page({
  data: {
    SwiperList:[],
    CatesList:[],
    floorList:[]
  },
  //options(Object)
  onLoad: function(options) {
    // 发送异步请求 使用 promise优化
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata', 
    //   success: (result) => {
    //     this.setData({
    //       SwiperList:result.data.message
    //     })
    //   }
    // });
    this.getSwiperList();
    this.getCatesList();
    this.getFloorList();
      
  },
  // 获取轮播图数据
  getSwiperList(){
    request({
      url:"/home/swiperdata"
    }).then(res=>{
      res.forEach(v => {v.navigator_url = v.navigator_url.replace('/goods_detail/main', '/goods_datail/index');});
      this.setData({
        SwiperList:res
      })
    })

  },
  // 获取分类导航
  getCatesList(){
    request({
      url:"/home/catitems"
    }).then(res=>{
      this.setData({
        CatesList:res
      })
    })
  },
  // 获取楼层信息
  getFloorList(){
    request({
      url:"/home/floordata"
    }).then(res=>{
      for (let k = 0; k < res.length; k++) {
        res[k].product_list.forEach(v => {
            v.navigator_url = v.navigator_url.replace('?', '/index?');
        });
    }
      this.setData({
        floorList:res
      })
    })
  },
  onReady: function() {
    
  },
  onShow: function() {
    
  },
  onHide: function() {

  }
});
  