var app = getApp();
Page({
  data: {
    questionList: [],
    showQuestionModal: false,
    showLoginModal: false,
    curQuestion: '我是问题',
    curMentor: '匿名反馈',
    curStudent: '匿名反馈1'
  },
  /** 跳转至新增问题页面 */
  addQuestion: function () {
    wx.navigateTo({
      url: '../addques/addques',
    })
  },
  admin: function() {
    this.setData({
      showLoginModal: true
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
        curMentor: this.data.questionList[0].contriIndex,
        curStudent: this.data.questionList[0].ansIndex,
        showQuestionModal: true     
      })
      this.updateList();
    }, 800)
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
  wrongAnswer: function() {
    let _this = this;
    wx.showModal({
      title: '考核不通过',
      content: '请该名学员继续接受考核！',
      showCancel: false,
      confirmText: '我知道了',
      success(res) {
        if(res.confirm) {
          _this.ansQuestion();
        }
      }
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