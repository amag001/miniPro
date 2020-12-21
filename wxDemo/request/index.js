// 防止多个异步请求只成功一个就把wx.hideLoading()关闭了
let ajaxTimes = 0;
export const request=(params)=>{
    // 判断url是否带有/my 有的话为私有路径  需要带上token
    let header = {...params.header};
    if(params.url.includes('/my/')){
        // 拼接header 带上token
        header['Authorization'] = wx.getStorageSync("token");
        
    }
    ajaxTimes++;
    // 显示加载中效果
        wx.showLoading({
            title:"加载中",
            // 蒙版 显示的时候点击不了别的东西
            mask: true
        });
          
    // 定义公共URL
    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve,reject)=>{
        wx.request({
            ...params,
            url:baseUrl+params.url,
            header:header,
            success:(res)=>{
                resolve(res.data.message)
            },
            fail:(err)=>{
                reject(err)
            },
            complete:()=>{
                ajaxTimes--;
                if(ajaxTimes == 0){
                    wx.hideLoading();
                }  
            }
        })
    })
}