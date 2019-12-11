// components/login-modal/login-modal.js
const ROOMNAME = 'KyLinDuckTech'
const PASSWORD = 'lqznc666'
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
    roomId: '',
    password: ''
  },

  /**
   * Component methods
   */
  methods: {
    clickMask: function () {
      this.setData({ show: false })
    },
    cancel: function () {
      this.setData({ show: false })
    },
    roomId: function(e) {
      this.setData({ 
        roomId: e.detail.value
      })
    },
    roomPwd: function(e) {
      this.setData({
        password: e.detail.value
      })
    },
    confirm: function() {
      if(this.data.roomId == ROOMNAME && this.data.password == PASSWORD) {
        this.setData({ show: false })
        wx.navigateTo({
          url: '../../pages/qabot/qabot',
        })
      }
      else {
        this.setData({ show: false })
        wx.showModal({
          title: '注意',
          content: '用户名或密码错误',
          showCancel: false
        })
      }
    }
  }
})
