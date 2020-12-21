// pages/cart/index.js
import {showModal,showToast} from '../../utils/asyncWx.js'
Page({
  data: {
    // 地址
    address:{},
    // 购物车
    cart:[],
    // 全选
    allChecked:false,
    // 总价格
    totalPrice:0,
    // 总数量
    totalNum:0
  },
/**
 * 1.获取用户收货地址
 *  绑定点击事件
 *  调用小程序api wx.chooseAddress
 * 2.获取用户对小程序所授予的获取地址的权限状态 scope
 *    假设用户点击收获地址是确定的话wx.getSetting中 authSetting scope.address 为true
 *    假设用户点击取消则为false
 *    
 * 上面这些没用了 ，现在wx.chooseAddress不用授权了，能直接打开 在真机上，上面的描述可以用作别的地方。
 * 3.把获取到的收货地址存到本地
 */
/**
 *  2.页面加载完毕】
 *    1.获取本地存储的地址数据
 * 3.在onShow获取缓存中的购物车数组
 * 4.总价格和总数量
 *    1.需要被选中
 *    2.获取购物车数组
 *    3.遍历
 *    4.判断是否被选中
 *    5.总价格+=商品单价*商品数量。总数量+=商品的数量
 * 5.商品的选中
 *    1.绑定change事件
 *    2.获取被修改的商品对象
 *    3.商品对象的选中状态取反
 *    4.重新填充data和缓存中的数据
 *    5.重新计算全选。总价格总数量。。。
 * 6.当商品数量为1 且用户点击减号操作 弹窗提示是否删除商品
 * 7.点击结算 判断用户有没有收获地址和选购商品。通过的话跳转到支付页面
 */
  onLoad: function (options) {

  },
  // 支付
  async handlePay(){
    //判断收货地址
    const {address,totalNum} = this.data;
    if(!address.userName){
      await showToast({title:"您还没有选择收货地址",icon:"none"})
      return;
    }
    // 判断有没有选择商品
    if(totalNum===0){
      await showToast({title:"您还没有选择商品",icon:"none"})
      return;
    }
    // 跳转到支付页面
    wx.navigateTo({
      url: '/pages/pay/index',
    })
  },
  // 加和减的操作
  async numEdit(e){
    var that = this
    // 获取传递过来的参数
    const {operation,id} = e.currentTarget.dataset;
    // 获取购物车数组
    let {cart} = this.data;
    // 找到要修改的商品索引
    const index = cart.findIndex(v=>v.goods_id === id);
    // 判断是否要删除
    if(cart[index].num===1&&operation===-1){
      // 弹窗提示
      // wx.showModal({
      //   title: '提示',
      //   content: '你是否要删除此商品',
      //   showCancel: true,
      //   cancelText: '取消',
      //   cancelColor: '#000000',
      //   confirmText: '确定',
      //   confirmColor: '#3CC51F',
      //   success: (result) => {
      //     if (result.confirm) {
      //       cart.splice(index,1);
      //       that.setData({cart})
      //     }else{
            
      //     }
      //   },
      //   fail: () => {},
      //   complete: () => {}
      // });

      const res =await showModal({content:"你是否要删除此商品"})
      if (res.confirm) {
        cart.splice(index,1);
        that.setCart(cart)
      }
    }else{
      // 修改数量
      cart[index].num+=operation;
      // 设置回缓存中
      this.setCart(cart)
    }
    
  },
  // 点击全选
  allCheckChange(){
    // 获取data中的数据
    let {cart,allChecked} = this.data;
    // 修改值
    allChecked = !allChecked;
    // 循环修改cart中商品的check forEach会修改原数组
    cart.forEach(v=>v.checked=allChecked);
    this.setCart(cart)
  },
  // 点击单选check
  checkChange(e){
    // 获取当前点击的商品对象
    const goods_id = e.currentTarget.dataset.id;
    // 获取购物车数组
    let {cart} = this.data;
    // 找到被修改的商品对象
    let index = cart.findIndex(v=>v.goods_id===goods_id);
    // 商品对象的选中状态取反
    cart[index].checked = !cart[index].checked;
    this.setCart(cart);
  },
  // 计算底部工具栏全选价格数量方法
  setCart(cart){
    // 重新计算全选。总价格总数量。。。
    let allChecked = true;
    // 总价格 总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if(v.checked){
        totalPrice+=v.num*v.goods_price;
        totalNum+=v.num
      }else{
        allChecked=false
      }
    });
    // 判断数组是否为空
    allChecked = cart.length!=0?allChecked:false
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    });
    wx.setStorageSync('cart', cart);
  },
  // 点击收货地址按钮
  chooseAddress(){
    // 获取收货地址，小程序内置api
    wx.chooseAddress({
      success: (result) => {
        // 存入到缓存中
        wx.setStorageSync("address", result);  
      }
    });
  },
  onReady: function () {

  },

  onShow: function () {
    // 获取缓存中的收获地址
    const address = wx.getStorageSync("address");
    // 获取缓存中的购物车数据
    const cart = wx.getStorageSync("cart")||[];
    this.setCart(cart);
    this.setData({address})
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },


})