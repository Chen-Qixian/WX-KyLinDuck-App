import weatherUtil from '../../utils/weather-util.js'
const ADDAPIKEY = 'I7QBZ-EVFCD-RV74V-HWKNX-SZ4Y5-GOBHU'
const ADDAPIURL = 'https://apis.map.qq.com/ws/geocoder/v1/'
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
  onLoad: function(options) {
    let _this = this;
    this.updateLocation();
  },
  onPullDownRefresh: function() {
    wx.showLoading({
      title: '更新天气',
    })
    this.getWeatherData();
  },
  getCurLocation: function() {
    this.updateLocation();
  },
  updateLocation: function() {
    // console.log('updating location...')
    wx.showLoading({
      title: '正在定位',
    })
    let _this = this;
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        let latitude = res.latitude,
            longitude = res.longitude
        // console.log('get location succeed...')
        wx.request({
          url: `${ADDAPIURL}?location=${latitude},${longitude}&key=${ADDAPIKEY}`,
          success: function(res) {
            // console.log('request address succeed...')
            _this.setData({
              address: res.data.result.address
            })
            wx.hideLoading();
          }
        })
        _this.setData({
          lon: longitude,
          lat: latitude
        })
        setTimeout(() => {
          _this.getWeatherData();
          wx.stopPullDownRefresh();
        },500)
      },
      fail: function (res) {
        _this.getLocationFail(res);
      }
    })
  },
  changeLocation: function() {
    let _this = this;
    wx.chooseLocation({
      success: function(res) {
        let lat = res.latitude,
            lon = res.longitude,
            add = res.name;
        if (add) {
          _this.setData({
            address: add,
            lat: lat,
            lon: lon
          });
          _this.getWeatherData();
        }
      },
      fail: function (res) {
        _this.getLocationFail(res);
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
      wx.hideLoading();
    }).catch(err => {
      console.log(err)
    })
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 500)
  },
  getLocationFail: function(res) {
    console.log(res)
    if (typeof res.errMsg == 'string' && res.errMsg.includes('auth')) {
      wx.showModal({
        title: '获取地图位置失败',
        content: '为了给您提供街道级天气预报服务，请在设置中授权【地理位置】',
        confirmText: '我知道啦',
        showCancel: false,
        success: function (res) {
          wx.openSetting()
        }
      })
    }
    if (typeof res.errMsg == 'string' && res.errCode === 2) {
      wx.showModal({
        title: '获取地图位置失败',
        content: '为了给您提供街道级天气预报服务，请打开您的手机定位功能',
        confirmText: '我知道啦',
        showCancel: false
      })
    }
    this.getWeatherData();
    wx.stopPullDownRefresh();
  }
})