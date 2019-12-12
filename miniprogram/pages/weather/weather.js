import weatherUtil from '../../utils/weather-util.js'
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    weather: {},
    lon: 116.347212,
    lat: 39.981571,
    address: '北京航空航天大学'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getWeatherData();
  },
  changeLocation: function() {
    let that = this;
    wx.chooseLocation({
      success: function (res) {
        let lat = res.latitude,
          lon = res.longitude,
          add = res.name;
        that.setData({
          address: add,
          lat: lat,
          lon: lon
        });
        that.getWeatherData();
      },
      fail: function (res) {
        if (typeof res.errMsg == 'string' && res.errMsg.includes('auth')) {
          wx.showModal({
            title: '获取地图位置失败',
            content: '为了给您提供街道级天气预报服务，请在设置中授权【地理位置】',
            confirmText: '确定',
            success: function (res) {
              wx.openSetting({
                success(res) {
                  // console.log(res.authSetting)
                }
              })
            }
          })
        }
      }
    });
  },
  getWeatherData: function() {
    let _this = this;
    wx.cloud.callFunction({
      name: 'getWeather',
      data: {
        lon: _this.data.lon,
        lat: _this.data.lat
      }
    }).then(res => {
      _this.setData({
        weather: weatherUtil.getWeather(JSON.parse(res.result).result)
      })
    }).catch(err => {
      console.log(err)
    })
  }
})