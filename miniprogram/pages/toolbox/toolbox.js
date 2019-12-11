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
  }
})