// pages/qafirst/qafirst.js
Page({
  data: {
    showLoginModal: false
  },
  enter: function() {
    this.setData({
      showLoginModal: true
    })
    // wx.navigateTo({
    //   url: '../qabot/qabot',
    // })
  }
})