/**
 * promise的getSetting
 */
export const getSetting=()=>{
    return new Promise((resolve,reject)=>{
        wx.getSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {}
        });
          
    })
}

/**
 * promise的chooseAddress
 */
export const chooseAddress=()=>{
    return new Promise((resolve,reject)=>{
        wx.chooseAddress({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {}
        });
          
    })
}


/**
 * promise的openSetting
 */
export const openSetting=()=>{
    return new Promise((resolve,reject)=>{
        wx.openSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {}
        });
          
    })
}

/**
 * promise的wx.showModal
 */
export const showModal=({content})=>{
    return new Promise((resolve,reject)=>{
        wx.showModal({
            title: '提示',
            content: content,
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确定',
            confirmColor: '#3CC51F',
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {}
          });
          
    })
}

/**
 * promise的wx.showToast
 */
export const showToast=({title,icon})=>{
    return new Promise((resolve,reject)=>{
        wx.showToast({
            title: title,
            icon: icon,
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            }
          });
          
    })
}

/**
 * promise的wx.login
 */
export const login=()=>{
    return new Promise((resolve,reject)=>{
        wx.login({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            }
          });
          
    })
}

/**
 * promise的wx.requestPayment
 */
export const requestPayment=(pay)=>{
    return new Promise((resolve,reject)=>{
        wx.requestPayment({
            ...pay,
            success: function(res){
                resolve(res)
            },
            fail: function(err) {
                reject(err)
            }
        })
          
    })
}
