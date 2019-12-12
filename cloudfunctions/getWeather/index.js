// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

let rp = require('request-promise')

// 云函数入口函数
exports.main = async (event, context) => {
  let lon = event.lon;
  let lat = event.lat;

  let begin = (Date.now() / 1000).toFixed(0) - 24 * 3600;
  let url = "https://api.caiyunapp.com/v2/Y2FpeXVuX25vdGlmeQ==/" + lon + "," + lat + "/weather?dailysteps=16&hourlysteps=120&alert=true&begin=" + begin;
  console.log('url:', url);

  return await rp(url)
    .then(function (res) {
      // 注意！！！一定要将接口请求到的结果返回！！
      return res;
    })
    .catch(function (err) {
      console.log(err);
    });
}