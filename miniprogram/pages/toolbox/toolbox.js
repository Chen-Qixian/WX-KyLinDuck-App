// pages/toolbox/toolbox.js
Page({
  /**
   * Page initial data
   */
  data: {

  },
  tomovie: function() {
    wx.navigateTo({
      url: '../movie/movie',
    })
  },
  toweather: function() {
    wx.navigateTo({
      url: '../weather/weather'
    })
  },
  tocalc: function() {
    wx.navigateTo({
      url: '../calc/calc',
    })
  },
  totrans: function() {
    wx.showModal({
      title: '敬请期待',
      content: '麒麟翻译功能暂缓开放，敬请期待哦～',
      showCancel: false,
      confirmText: '我知道啦'
    })
  }
})