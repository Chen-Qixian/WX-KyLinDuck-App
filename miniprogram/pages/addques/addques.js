var app = getApp();
Page({
  data: {
    contriArray: ['匿名贡献', '先先', '老祁', '枫宝','琦琦','尚纯','亮哥'],
    ansArray: ['当前学员', '先先', '老祁', '枫宝', '琦琦', '尚纯', '亮哥'],
    userInfo: {},
    contriIndex: 0,
    ansIndex: 0
  },
  contriPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      contriIndex: e.detail.value
    })
  },
  ansPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      ansIndex: e.detail.value
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