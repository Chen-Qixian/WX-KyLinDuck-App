// components/question-modal/question-modal.js
Component({
  /**
   * Component properties
   */
  properties: {
    show: {
      type: Boolean
    },
    question: {
      type: String
    },
    mentor: {
      type: Number
    },
    student: {
      type: Number
    }
  },

  /**
   * Component initial data
   */
  data: {
    contriArray: ['匿名导师', '先先', '老祁', '枫宝', '琦琦', '尚纯', '亮哥'],
    ansArray: ['挑战学员', '先先', '老祁', '枫宝', '琦琦', '尚纯', '亮哥'],
  },

  /**
   * Component methods
   */
  methods: {
    clickMask: function() {
      this.setData({ show: false })
    },
    ac: function() {
      this.setData({ show: false })
      wx.showModal({
        title: '考核通过',
        content: '请下一位挑战学员接受考核～',
        showCancel: false,
        confirmText: '我知道了'
      })
    },
    wa: function() {
      this.setData({ show: false })
      this.triggerEvent('wronganswer')
    }
  }
})
