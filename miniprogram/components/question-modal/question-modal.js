// components/question-modal/question-modal.js
Component({
  /**
   * Component properties
   */
  properties: {
    show: {
      type: Boolean
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
    cancel: function() {
      this.setData({ show: false })
    }
  }
})
