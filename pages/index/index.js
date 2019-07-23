//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        banners: ["https://images.wallpaperscraft.com/image/cat_tabby_eyes_surprise_lie_94958_1280x720.jpg", "https://images.wallpaperscraft.com/image/eagle_flight_sky_wings_clouds_97499_1280x720.jpg", "https://images.wallpaperscraft.com/image/tiger_kitten_big_cat_cub_predator_91634_1280x720.jpg"],
        citys:["武汉","深圳","重庆"]
    },
    getLocationAuth: function() {
        wx.getLocation({
            success: function(res) {
                var lo=JSON.stringify(res);
                console.log(lo);
                wx.navigateTo({
                    url: '../logs/logs'
                })
            },
        })
    },
    //事件处理函数
    bindViewTap: function() {
        var that=this;
        wx.getSetting({
            success(res) {
                if (!res.authSetting['scope.userLocation']) {
                    wx.authorize({
                        scope: 'scope.userLocation',
                        success() {
                            
                            that.getLocationAuth();
                        }
                    })
                } else {
                    console.log("this is:");
                    console.log(that);
                    that.getLocationAuth();
                }
            }
        })
    },
    onLoad: function() {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            console.log(123)
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
    }
})