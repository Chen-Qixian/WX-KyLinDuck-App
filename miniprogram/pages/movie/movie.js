// pages/movie/movie.js
Page({

  /**
   * Page initial data
   */
  data: {
    movieList:[]
  },

  getMovieList: function() {
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'movieList',
      data: {
        start: this.data.movieList.length,
        count: 10
      }
    }).then(res => {
      console.log(res);
      this.setData({
        movieList: this.data.movieList.concat(JSON.parse(res.result).subjects)
      })
      // 异步请求，在此处隐藏加载提示
      wx.hideLoading();
    }).catch(err => {
      console.log(err);
      wx.hideLoading();
    })
    
  },

  gotoComment: function(e) {
    wx.navigateTo({
      url: `../comment/comment?movieid=${e.target.dataset.movieid}`,
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.getMovieList();
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
    this.getMovieList();
  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})