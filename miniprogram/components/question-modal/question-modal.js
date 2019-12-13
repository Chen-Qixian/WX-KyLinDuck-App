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
      type: String
    },
    student: {
      type: String
    }
  },

  /**
   * Component initial data
   */
  data: {

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
    },
    wa: function() {
      this.setData({ show: false })
      this.triggerEvent('wronganswer')
    }
  }
})
