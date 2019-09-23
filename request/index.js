export const request = (params) => {
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

            }
        })
    })
}