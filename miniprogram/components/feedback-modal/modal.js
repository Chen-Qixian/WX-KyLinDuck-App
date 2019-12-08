var weatherList = [
  { id: 1, image: '../../images/user1.png', text: '1', selected: false },
  { id: 2, image: '../../images/user2.png', text: '2', selected: false },
  { id: 3, image: '../../images/user3.png', text: '3', selected: false },
  { id: 4, image: '../../images/user4.png', text: '4', selected: false },
  { id: 5, image: '../../images/user5.png', text: '5', selected: false },
  { id: 6, image: '../../images/user6.png', text: '6', selected: false },
  { id: 0, image: '../../images/user0.png', text: '0', selected: false },
];

Component({

  /**
   * 组件的属性列表
   */
  properties: {
    //是否显示modal
    show: {
      type: Boolean,
      value: false
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    weatherList: weatherList,
    confirmState: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickMask(e) {
      this.setData({
        show: false,
      })
    },
    onIconTap(e) {
      if (typeof e.currentTarget.dataset.id === 'number') {
        weatherList.forEach(function(item, id){
          if (e.currentTarget.dataset.id == id) {
            item.selected = true
          } else {
            item.selected = false
          }
        })
        this.setData({
          weatherList: weatherList,
          confirmState: 'enable'
        })
      } else {
        console.error('dataset.id is null')
      }
    },
    cancel() {
      this.setData({
        show: false,
      })
    },
    confirm() {
      var num;
      weatherList.forEach(function (item, id) {
        if (item.selected == true) {
          num = id
        }
      })
      if (typeof num != 'number') {
        return
      }
      this.triggerEvent('confirm', {'num': num})
    }
  }
})
