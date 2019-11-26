// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

let rp = require('request-promise')

// 云函数入口函数
exports.main = async (event, context) => {
  let url = `http://api.douban.com/v2/movie/subject/${event.movieid}?apikey=0df993c66c0c636e29ecbb5344252a4a`;
  console.log('url:',url);

  return await rp(url)
    .then(function (res) {
      // 注意！！！一定要将接口请求到的结果返回！！
      return res;
    })
    .catch(function (err) {
      console.log(err);
    });
}