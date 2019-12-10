// pages/manage/manage.js
const db = wx.cloud.database();

Page({
  /**
   * Page initial data
   */
  data: {
    list: []
  },
  del: function(e) {
    // console.log(e.target.dataset.delid);
    let _this = this;
    let idx = e.target.dataset.delid;
    wx.showModal({
      title: '注意！',
      content: '你确定要删除这个问题吗',
      success(res) {
        if(res.confirm) {
          _this.confirmDel(idx)
        }
      }
    })
  },
  confirmDel: function(idx) {
    let id = this.data.list[idx]._id;
    wx.cloud.callFunction({
      name: 'delQuestion',
      data: {
        _id: id
      }
    })
    let newList = this.data.list;
    newList.splice(idx, 1);
    this.setData({
      list: newList
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let _this = this;
    wx.cloud.callFunction({
      name: 'getQuestions'
    }).then(res => {
      _this.setData({
        list: res.result.data
      })
    })
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