// pages/search/index.js
import {request} from "../../request/index.js"
/**
 * 1.获取输入框的值
 * 2.发请求
 * 3.防抖(input输入一个字符，发一次请求的问题) 定时器 一般用于输入框中
 *    1.定义全局定时器
 * 4.节流 一般用于页面上拉下拉
 */
Page({
  data: {
    goods:[],
    //  取消的按钮是否显示
    isFocus:false,
    // input的值
    inpValue:''
  },
  // 全局定时器ID
  TimeId:-1,
  // 输入框改变就会触发的事件
  getInput(e){
    // 输入框的值
    const {value} = e.detail;
    // 检测合法性
    if (!value.trim()) {
      // 值不合法
      this.setData({
        goods:[],
        isFocus:false
      })
      return;
    }
    this.setData({
      isFocus:true
    })
    // 准备发送请求 获取数据
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(() => {
      this.qsearch(value)
    }, 1000);
    
  },
  // 点击取消按钮
  setCancel(){
    this.setData({
      inpValue:"",
      isFocus:false,
      goods:[]
    })
  },
  // 发送请求的函数 , 获取数据
  async qsearch(query){
    const res =await request({
      url:"/goods/qsearch",
      data:{query}
    })
    this.setData({
      goods:res
    })
  }

})