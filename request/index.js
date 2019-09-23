let requestTimes=0
export const request = (params) => {
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
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            },
            completed: () => {
                requestTimes--;
                requestTimes===0 && wx.hideLoading();
            }
        })
    })
}