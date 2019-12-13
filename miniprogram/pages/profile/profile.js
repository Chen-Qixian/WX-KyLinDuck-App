// pages/profile/profile.js
Page({
  /**
   * Page initial data
   */
  data: {
    userInfo: {
      nickName: '',
      country: '',
      province: '',
      city: '',
      gender: ''
    },
    showInfo: false,
    origin: 'origin',
    clicked: 'clicked'
  },
  getInfo: function(e) {
    let gender = '',
      userInfo = e.detail.userInfo
    if (userInfo.gender == 0) {
      gender = '未知'
    }
    else if (userInfo.gender == 1) {
      gender = '男'
    }
    else {
      gender = '女'
    }
    userInfo.gender = gender;
    this.setData({
      userInfo: userInfo,
      showInfo: true,
      origin: '',
      clicked: ''
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let _this = this;
    wx.getSetting({
      success(res) {
        if(!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              _this.getInfo();
            }
          })
        }
      }
    })
  }
})