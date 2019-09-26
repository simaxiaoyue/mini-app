let requestTimes = 0
export const request = (params) => {
    //发送请求次数
    requestTimes++;
    //设置loading效果
    wx.showLoading({
        title: "加载中",
        // 遮罩层  true-> 用户无法再次点击 屏幕 
        mask: true
    });
    //设置公共的url
    let baseUrl = "https://api.zbztb.cn/api/public/v1"
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            url: baseUrl + params.url,
            success: (result) => {
                resolve(result.data.message);
            },
            fail: (err) => {
                reject(err);
            },
            complete: () => {
                requestTimes--;
                //请求全部发送完成后，隐藏loading效果
                requestTimes === 0 && wx.hideLoading();
                // if(requestTimes===0){
                //     wx.hideLoading()
                // }
            }
        })
    })
}


export const getSetting = () => {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => { }
        });

    })
}
export const openSetting = () => {
    return new Promise((resolve, reject) => {
        wx.openSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => { }
        });

    })
}
export const chooseAddress = () => {
    return new Promise((resolve, reject) => {
        wx.chooseAddress({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => { }
        });

    })
}