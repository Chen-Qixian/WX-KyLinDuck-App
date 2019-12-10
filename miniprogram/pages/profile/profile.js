// pages/profile/profile.js
Page({
  /**
   * Page initial data
   */
  data: {
    userInfo: {},
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let _this = this;
    wx.getUserInfo({
      success: function(res) {
        let gender = '',
            userInfo = res.userInfo
        if(res.userInfo.gender == 0) {
          gender = '未知'
        }
        else if (res.userInfo.gender == 1) {
          gender = '男'
        }
        else {
          gender = '女'
        }
        userInfo.gender = gender;
        _this.setData({
          userInfo: userInfo
        })
      }
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})