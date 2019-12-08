var app = getApp();
Page({
  data: {
    array: ['美国', '中国', '巴西', '日本'],
    settingLocation: '中关村768创意产业园',
    settingTime: '07:00',
    settingLon: 116.35218,
    settingLat: 40.0089,
    userInfo: {},
    index: 0
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  /** 确认订阅 */
  confirmSubscription: function () {
    wx.showToast({
      title: '订阅成功',
      icon: 'success',
      duration: 1500,
      mask: true
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    app.globalData.firstOpen = false;
  },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },
  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },
  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})