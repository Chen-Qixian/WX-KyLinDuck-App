// pages/ansques/ansques.js
Page({

  /**
   * Page initial data
   */
  data: {
    questionList: []
  },

  getQuestions: function() {
    let _this = this;
    wx.cloud.callFunction({
      name: 'getQuestions'
    }).then(res => {
      _this.setData({
        questionList: res.result.data
      })
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    if(questionList.length === 0) {
      this.getQuestions();
    }
  }
})