import { request } from "../../request/index.js"
Page({
    data: {
        detailList: []
    },
    onLoad(options) {
        this.getdetailData(options.goods_id)
    },
    getdetailData(goods_id) {
        request({
            url: "/goods/detail",
            data: {
                goods_id
            }
        }).then(res => {
            console.log(res);
            let detailList = res.data.message
            this.setData({
                detailList
            })
        })
    },
    //点击预览图片
    showBigImg(e) {
        // console.log(e);
            let urls=this.data.detailList.pics.map(v=>v.pics_mid_url)
            let current=e.currentTarget.dataset.current
        wx.previewImage({
            urls:urls,// 需要预览的图片http链接列表 // ["1.png"，"2.png"...]
            current: current // 当前显示图片的http链接
        })
    }
})