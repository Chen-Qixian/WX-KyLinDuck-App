// components/login-modal/login-modal.js
const ROOMNAME = 'ChrisChen'
const PASSWORD = 'laoqi1219'
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
      this.setData({ show: false })
      if(this.data.roomId == ROOMNAME && this.data.password == PASSWORD) {
        wx.navigateTo({
          url: '../../pages/manage/manage',
        })
      }
      else {
        wx.showModal({
          title: '注意',
          content: '用户名或密码错误',
          showCancel: false
        })
      }
    }
  }
})
