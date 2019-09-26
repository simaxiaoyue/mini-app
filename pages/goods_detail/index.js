import { request } from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
    data: {
        detailList: []
    },
    onLoad(options) {
        this.getdetailData(options.goods_id)
    },
    async  getdetailData(goods_id) {
        let res = await request({
            url: "/goods/detail",
            data: {
                goods_id
            }
        })
        // console.log(res);
        let detailList = res
        this.setData({
            detailList
        })
    },
    //点击预览图片
    showBigImg(e) {
        // console.log(e);
        let urls = this.data.detailList.pics.map(v => v.pics_mid_url)
        let current = e.currentTarget.dataset.current
        wx.previewImage({
            urls: urls,// 需要预览的图片http链接列表 // ["1.png"，"2.png"...]
            current: current // 当前显示图片的http链接
        })
    },
    //加入购物车
    addCart() {
        const { detailList } = this.data
        //获取本地数据
        let cartList = wx.getStorageSync('carts') || []
        //根据id判断商品是否存在
        let index = cartList.findIndex(e => e.goods_id === detailList.goods_id)
        if (index === -1) {
            //没找到商品
            cartList.push({
                goods_id: detailList.goods_id,
                goods_name: detailList.goods_name,
                goods_price: detailList.goods_price,
                goods_small_logo: detailList.goods_small_logo,
                num: 1,
                checked:true
            })

        } else {
            //如果有,取出数据,数量++
            cartList[index].num++;
        }
        //存入本地
        wx.setStorageSync('carts', cartList);
        wx.showToast({
            title: '加入成功',
            icon: 'success',
            mask: true,
        });
    }
})