var app = getApp();
const db = wx.cloud.database();
Page({
  data: {
    contriArray: ['匿名导师', '先先', '老祁', '枫宝','琦琦','尚纯','亮哥'],
    ansArray: ['当前学员', '先先', '老祁', '枫宝', '琦琦', '尚纯', '亮哥'],
    question: '',
    contriIndex: 0,
    ansIndex: 0
  },
  contriPickerChange: function (e) {
    this.setData({
      contriIndex: parseInt(e.detail.value)
    })
  },
  ansPickerChange: function (e) {
    this.setData({
      ansIndex: parseInt(e.detail.value)
    })
  },
  inputChange: function(e) {
    this.setData({
      question: e.detail.value
    })
  },
  /** 确认上传 */
  submition: function () {
    let _this = this;
    if(!this.data.question) {
      wx.showModal({
        title: '注意',
        content: '考核内容不能为空哦！',
        showCancel: false
      })
      return;
    }
    wx.showModal({
      title: '提交确认',
      content: '确认上传考核内容？',
      confirmColor: '#5ebb8d',
      cancelColor: '#666',
      success(res) {
        if(res.confirm) {
          _this.confirmSubmition();
        }
      }
    })
  },
  confirmSubmition: function() {
    wx.showLoading({
      title: '题目入库中',
      mask: true
    })
    // console.log(this.data.question, this.data.contriArray[parseInt(this.data.contriIndex)], this.data.ansArray[parseInt(this.data.ansIndex)]);
    db.collection('questionBase').add({
      data: {
        question: this.data.question,
        contriIndex: this.data.contriArray[parseInt(this.data.contriIndex)],
        ansIndex: this.data.ansArray[parseInt(this.data.ansIndex)]
      }
    }).then(res => {
      wx.hideLoading();
      wx.showToast({
        title: '成功入库'
      })
    }).catch(err => {
      wx.showToast({
        title: '上传失败'
      })
    })
  }
})