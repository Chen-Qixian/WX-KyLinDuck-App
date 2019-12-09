var app = getApp();
Page({
  data: {
    questionList: [],
    showQuestionModal: false,
    curQuestion: '在我东南45公里以外正在下小雨，我这里雾霾极其严重。',
    curMentor: '匿名反馈',
    curStudent: '匿名反馈1'
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
  /** 显示题目组件 */
  ansQuestion: function () {
    wx.showLoading({
      title: '题目生成中',
    })
    
    setTimeout(() => {
      wx.hideLoading();
      this.setData({ 
        curQuestion: this.data.questionList[0].question,
        curMentor: parseInt(this.data.questionList[0].contriIndex),
        curStudent: parseInt(this.data.questionList[0].ansIndex),
        showQuestionModal: true     
      })
      this.updateList();
    }, 300)
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
    let list = this.data.questionList;
    this.shuffle(list);
    this.setData({
      questionList: list
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