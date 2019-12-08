var app = getApp();
Page({
  data: {},
  /** 跳转至新增问题页面 */
  addQuestion: function () {
    wx.navigateTo({
      url: '../addques/addques',
    })
  },
  /** 跳转至答题页面 */
  ansQuestion: function () {
    wx.navigateTo({
      url: '../ansques/ansques',
    })
  }
})