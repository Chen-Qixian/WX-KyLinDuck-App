// pages/comment/comment.js
const db = wx.cloud.database();
Page({
  /**
   * Page initial data
   */
  data: {
    detail: {},
    content: '',
    score: 10,
    imageList:[],
    fileIds:[],
    movieid: -1
  },
  uploadImg: function() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        this.setData({
          imageList: this.data.imageList.concat(tempFilePaths)
        })
      }
    })
  },
  submit: function(e) {
    wx.showLoading({
      title: '正在提交'
    })
    let promiseArr = [];
    for(let i = 0 ; i < this.data.imageList.length ; i ++) {
      promiseArr.push(new Promise((resolve, reject) => {
        let item = this.data.imageList[i]; // 获取上传图片项
        let suffix = /\.\w+$/.exec(item)[0]; // 返回文件的扩展名
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + suffix,
          filePath: item,
          success: res => {
            this.setData({
              fileIds: this.data.fileIds.concat(res.fileID)
            })
            resolve();
          },
          fail: console.error
        })
      }))
    }

    Promise.all(promiseArr).then(res => {
      db.collection('comment').add({
        data: { 
          content: this.data.content,
          score: this.data.score,
          movieid: this.data.movieid,
          fileIds: this.data.fileIds
        }
      }).then(res => {
        wx.hideLoading();
        wx.showToast({
          title: '评论成功'
        })
      }).catch(err => {
        wx.showToast({
          title: '评论失败'
        })
      })
    })
  },
  onContentChange: function(e) {
    this.setData({
      content: e.detail
    })
  },
  onScoreChange: function(e) {
    this.setData({
      score: e.detail * 2
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      movieid: options.movieid
    })
    wx.cloud.callFunction({
      name: 'getDetail',
      data: {
        movieid: options.movieid
      }
    }).then(res => {
      this.setData({
        detail: JSON.parse(res.result)
      })
    }).catch(err => {
      console.error(err);
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