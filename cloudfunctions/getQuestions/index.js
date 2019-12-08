// 云入口
const cloud = require('wx-server-sdk')
// 初始化云
cloud.init()
// 获取云数据库
const db = cloud.database()
// 单次获取batch上限
const MAX_LIMIT = 100

exports.main = async (event, context) => {
  // 先取出集合记录总数
  const countResult = await db.collection('questionBase').count()
  const total = countResult.total
  // 计算需分几次取
  const batchTimes = Math.ceil(total / 100)
  // 承载所有读操作的 promise 的数组
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    const promise = db.collection('questionBase').skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise)
  }
  // 等待所有
  return (await Promise.all(tasks)).reduce((acc, cur) => {
    return {
      data: acc.data.concat(cur.data),
      errMsg: acc.errMsg,
    }
  })
}