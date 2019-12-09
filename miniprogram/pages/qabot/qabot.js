var app = getApp();
Page({
  data: {
    questionList: []
  },
  /** 跳转至新增问题页面 */
  addQuestion: function () {
    wx.navigateTo({
      url: '../addques/addques',
    })
  },
  shuffle: function(arr) {
    let i = arr.length;
    while (i) {
      let j = Math.floor(Math.random() * i--);
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
  },
  updateList: function() {
    let newQuestionList = this.data.questionList;
    newQuestionList.shift();
    if(newQuestionList.length === 0) {
      this.getQuestions();
      newQuestionList = this.data.questionList;
    }
    this.shuffle(newQuestionList);
    this.setData({questionList: newQuestionList});
  },
  /** 跳转至答题页面 */
  ansQuestion: function () {
    wx.showLoading({
      title: '题目生成中',
    })
    let list = this.data.questionList;
    this.shuffle(list);
    this.setData({
      questionList: list
    })
    setTimeout(() => {
      wx.hideLoading();
      wx.showModal({
        title: '导师考核，现在开始',
        content: this.data.questionList[0].question,
        confirmText: '通过',
        cancelText: '不合格',
        complete: this.updateList()
      })
    }, 500)
  },
  getQuestions: function () {
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
    if (this.data.questionList.length === 0) {
      this.getQuestions();
    }
  }
})