//获取天气背景图名称
function getBGPicName(skycon, DoN) {
  var allPicName = {
    'CLEAR': 'bg_clear.jpg',
    'CLEAR_NIGHT': 'bg_clear_night.jpg',
    'PARTLY_CLOUDY_DAY': 'bg_partly_cloudy.jpg',
    'PARTLY_CLOUDY_NIGHT': 'bg_partly_cloudy_night.jpg',
    'CLOUDY': 'bg_cloudy.jpg',
    'CLOUDY_NIGHT': 'bg_cloudy_night.jpg',
    'SNOW': 'bg_snow.jpg',
    'SNOW_NIGHT': 'bg_snow_night.jpg',
    'RAIN': 'bg_rain.jpg',
    'RAIN_NIGHT': 'bg_rain_night.jpg',
    'FOG': 'bg_fog.jpg',
    'FOG_NIGHT': 'bg_fog_night.jpg',
    'HAZE': 'bg_fog.jpg',
    'HAZE_NIGHT': 'bg_fog_night.jpg',
    'WIND': 'bg_wind.jpg',
    'WIND_NIGHT': 'bg_wind_night.jpg'
  };

  if (DoN == "NIGHT") {
    var m = skycon.match(/CLOUDY|SNOW|RAIN|FOG|HAZE|WIND|/)
    if (m[0]) {
      skycon = skycon + "_NIGHT"
    }
  }
  return allPicName[skycon.match(/CLEAR_NIGHT|CLEAR|CLOUDY_NIGHT|CLOUDY|PARTLY_CLOUDY_NIGHT|PARTLY_CLOUDY_DAY|SNOW_NIGHT|SNOW|RAIN_NIGHT|RAIN|FOG_NIGHT|FOG|HAZE_NIGHT|HAZE|WIND_NIGHT|WIND/)[0]] ||
    'bg_cloudy.jpg';
}

//获取天气图标名称
function getSkyIconPicName(skycon, prec) {
  var allPicName = {
    'CLEAR': 'clear.png',
    'CLEAR_NIGHT': 'clear_night.png',
    'PARTLY_CLOUDY': 'partly_cloudy.png',
    'PARTLY_CLOUDY_NIGHT': 'partly_cloudy_night.png',
    'CLOUDY': 'cloudy.png',
    'SNOW': 'snow.png',
    'RAIN': 'rain.png',
    'FOG': 'fog.png',
    'HAZE': 'haze.png',
    'WIND': 'wind.png',
  };

  var name = allPicName[skycon.match(/CLEAR_NIGHT|CLEAR|PARTLY_CLOUDY_NIGHT|PARTLY_CLOUDY|CLOUDY|SNOW|RAIN|FOG|HAZE|WIND|/)[0]] || 'partly_cloudy.png';
  if (prec && prec > 1) {
    if (prec < 10) {
      name = 'rain_low.png'
    } else if (prec < 25) {
      name = 'rain_middle.png'
    } else if (prec < 50) {
      name = 'rain_high.png'
    } else {
      name = 'rain_large.png'
    }
  }
  return "/images/skyicon/" + name;
}

// 时间数值化 12:36
function timeToValue(time) {
  var times = time.split(":");
  return parseInt(times[0]) * 60 + parseInt(times[1]);
}

//判断白天或黑夜
function getDayOrNight(sun) {
  var DoN = "",
    sunrise = timeToValue(sun.sunrise.time),
    sunset = timeToValue(sun.sunset.time),
    now = new Date(),
    nowValue = now.getHours() * 60 + now.getMinutes();
  if (nowValue > sunrise && nowValue < sunset) {
    DoN = "DAY"
  } else {
    DoN = "NIGHT"
  }
  return DoN;
}

//风速转成自然语言描述
function judgeWind(obj) {
  var speeds = [
    { max: 2, desc: '风平浪静', grade: 0 },
    { max: 6, desc: '微风徐徐', grade: 1 },
    { max: 12, desc: '微风拂面', grade: 2 },
    { max: 19, desc: '树叶摇摆', grade: 3 },
    { max: 30, desc: '树枝摇动', grade: 4 },
    { max: 40, desc: '风力强劲', grade: 5 },
    { max: 51, desc: '撑伞困难', grade: 6 },
    { max: 62, desc: '撑伞困难', grade: 7 },
    { max: 75, desc: '行走困难', grade: 8 },
    { max: 87, desc: '强度极烈', grade: 9 },
    { max: 103, desc: '暴风毁树', grade: 10 },
    { max: 117, desc: '暴风毁树', grade: 11 },
    { max: 132, desc: '飓风', grade: 12 },
    { max: 149, desc: '台风', grade: 13 },
    { max: 166, desc: '强台风', grade: 14 },
    { max: 183, desc: '强台风', grade: 15 },
    { max: 201, desc: '超强台风', grade: 16 },
    { max: 220, desc: '超强台风', grade: 17 },
    { desc: '极强台风', grade: 18 }
  ],
    directions = [
      { max: 22.5, desc: '北', direction: 0 },
      { max: 67.5, desc: '东北', direction: 1 },
      { max: 112.5, desc: '东', direction: 2 },
      { max: 157.5, desc: '东南', direction: 3 },
      { max: 202.5, desc: '南', direction: 4 },
      { max: 247.5, desc: '西南', direction: 5 },
      { max: 292.5, desc: '西', direction: 6 },
      { max: 337.5, desc: '西北', direction: 7 },
      { max: 360, desc: '北', direction: 0 }
    ],
    speedDesc, directionDesc, grade, _direction,
    result = {};

  if (obj.speed) {
    // 获取风力描述
    for (var i in speeds) {
      if (obj.speed <= speeds[i].max) {
        speedDesc = speeds[i].desc;
        grade = '' + speeds[i].grade;
        break;
      }
      else if (speeds[i].max === undefined) {
        speedDesc = speeds[i].desc;
        grade = speeds[i].grade;
      }
    }
  }

  if (obj.direction) {
    // 获取风力方向
    for (var i in directions) {
      if (obj.direction <= directions[i].max) {
        directionDesc = directions[i].desc;
        _direction = '' + directions[i].direction;
        break;
      }
    }
  }

  if (speedDesc) result.speed = speedDesc;
  if (grade) result.grade = grade;
  if (directionDesc) result.direction = directionDesc;
  if (_direction) result._direction = _direction;
  return result;
}

// 获取天气概述
function parseSkycon(skycon) {
  var allDesc = {
    'CLEAR_DAY': '晴',
    'CLEAR_NIGHT': '晴',
    'PARTLY_CLOUDY_DAY': '多云',
    'PARTLY_CLOUDY_NIGHT': '多云',
    'CLOUDY': '阴',
    'CLOUDY_NIGHT': '阴',
    'RAIN': '雨',
    'SNOW': '雪',
    'SNOW_NIGHT': '雪',
    'WIND': '大风',
    'FOG': '雾',
    'HAZE': '雾霾'
  };
  return allDesc[skycon] || '晴';
}

// 天气数据JSON拼装
function getWeather(data) {
  let weatherData = data;
  // 日出日落时间表
  let astro = weatherData.daily.astro;
  // 获取天气描述
  let windDesc = judgeWind(weatherData.realtime.wind);
  let skyDesc = parseSkycon(weatherData.realtime.skycon);
  // 获取背景图片
  weatherData.bg = "https://caiyunapp.com/images/bg/" + getBGPicName(weatherData.realtime.skycon, getDayOrNight(astro[1]));
  // 当前天气状况
  weatherData.current = {};
  // 获取AQI
  let aqi = weatherData.realtime.aqi;
  let levels = ['优', '良', '轻度', '中度', '重度', '无'];
  let levels_en = ['fresh', 'good', 'light', 'moderate', 'heavy', 'none'];
  let level = levels[aqi < 50 ? 0 : aqi < 100 ? 1 : aqi < 150 ? 2 : aqi < 200 ? 3 : 4];
  let level_en = levels_en[aqi < 50 ? 0 : aqi < 100 ? 1 : aqi < 150 ? 2 : aqi < 200 ? 3 : 4];
  weatherData.current.aqi = aqi + " " + level;
  weatherData.aqi_image = "https://www.caiyunapp.com/images/air/" + level_en + ".png";
  weatherData.aqi_bg_image = "https://www.caiyunapp.com/images/air/" + level_en + "-bg.png";
  weatherData.current.skyDesc = skyDesc;
  weatherData.current.summary = skyDesc + " / " + windDesc.direction + "风 " + windDesc.speed;
  weatherData.current.grade = windDesc.grade;
  weatherData.current.speed = windDesc.speed;
  weatherData.current.windDesc = windDesc.direction;
  weatherData.current.wind_ratate = windDesc._direction;
  weatherData.current.temperature = weatherData['realtime']['temperature'].toFixed(0) + '°';
  weatherData.current.skycon = getSkyIconPicName(weatherData.daily.skycon[1].value, weatherData.daily.precipitation[1].avg * 24);
  weatherData.current.humidity = parseInt(weatherData['realtime']['humidity'] * 100) + '%';
  weatherData.current.dayTemperature = weatherData.daily.temperature[1].min.toFixed(0) + '°~' + weatherData.daily.temperature[1].max.toFixed(0) + '°';
  // 解析拼装昨今明天气数据
  let serverDate = new Date();
  let weekDayTexts = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  let aqi_colors = ["aqi_fresh", "aqi_good", "aqi_light", "aqi_med", "aqi_heavy"];
  weatherData.today = {}
  let todayList = [];
  for (var i = 1; i < 3; i++) {
    aqi = weatherData.daily.aqi[i].avg.toFixed(0);
    todayList.push({
      id: "today" + i,
      day: i == 1 ? "今天" : i == 2 ? "明天" : weekDayTexts[(serverDate.getDay() + i) % 7],
      skydesc: parseSkycon(weatherData.daily.skycon[i].value),
      _skydesc: weatherData.daily.skycon[i].value,
      skyicon: getSkyIconPicName(weatherData.daily.skycon[i].value, weatherData.daily.precipitation[i].avg * 24),
      temperature: weatherData.daily.temperature[i].min.toFixed(0) + '°~' + weatherData.daily.temperature[i].max.toFixed(0) + '°',
      aqi: {
        color: aqi_colors[aqi < 50 ? 0 : aqi < 100 ? 1 : aqi < 150 ? 2 : aqi < 200 ? 3 : 4],
        text: levels[aqi < 50 ? 0 : aqi < 100 ? 1 : aqi < 150 ? 2 : aqi < 200 ? 3 : 4],
        avg: aqi,
      }
    });
  }
  weatherData.today.list = todayList;
  
  // 今日日出日落时间数值化
  let sunriseTime = astro[1].sunrise.time;
  let sunsetTime = astro[1].sunset.time;
  let sunriseValue = timeToValue(sunriseTime);
  let sunsetValue = timeToValue(sunsetTime);

  // 解析拼装48小时预报数据
  let hourlyList = [];
  for (let i = 24; i < 72; i++) {
    aqi = weatherData.hourly.aqi[i].value.toFixed(0);
    let time = weatherData.hourly.aqi[i].datetime.slice(11);
    let date = weatherData.hourly.aqi[i].datetime.slice(0, 10)
    let timeClass = 'hourly_time';
    if (time == '00:00') {
      time = weatherData.hourly.aqi[i].datetime.slice(5, 10)
      timeClass = 'hourly_time_bold'
    }
    if (i == 0) {
      time = "现在"
    }

    hourlyList.push({
      time: time,
      timeClass: timeClass,
      temperature: weatherData.hourly.temperature[i].value.toFixed(0) + '°',
      skyicon: getSkyIconPicName(weatherData.hourly.skycon[i].value, weatherData.hourly.precipitation[i].value * 24),
      aqi: {
        color: aqi_colors[aqi < 50 ? 0 : aqi < 100 ? 1 : aqi < 150 ? 2 : aqi < 200 ? 3 : 4],
        text: levels[aqi < 50 ? 0 : aqi < 100 ? 1 : aqi < 150 ? 2 : aqi < 200 ? 3 : 4],
        value: aqi,
      }
    })

    // 插入日出日落时间
    let timeValue = timeToValue(time)
    if ((sunriseValue >= timeValue && sunriseValue < (timeValue + 60))) {
      astro.forEach(function (item, i) {
        if (item.date == date) {
          sunriseTime = item.sunrise.time
        }
      })
      hourlyList.push({
        time: sunriseTime,
        timeClass: 'hourly_time_bold',
        temperature: weatherData.hourly.temperature[i].value.toFixed(0) + '°',
        skyicon: '../../images/sunrise.png',
        aqi: {
          color: aqi_colors[aqi < 50 ? 0 : aqi < 100 ? 1 : aqi < 150 ? 2 : aqi < 200 ? 3 : 4],
          text: levels[aqi < 50 ? 0 : aqi < 100 ? 1 : aqi < 150 ? 2 : aqi < 200 ? 3 : 4],
          value: aqi,
        }
      })
    }
    if ((sunsetValue >= timeValue && sunsetValue < (timeValue + 60))) {
      astro.forEach(function (item, i) {
        if (item.date == date) {
          sunsetTime = item.sunset.time
        }
      })
      hourlyList.push({
        time: sunsetTime,
        timeClass: 'hourly_time_bold',
        temperature: weatherData.hourly.temperature[i].value.toFixed(0) + '°',
        skyicon: '../../images/sunset.png',
        aqi: {
          color: aqi_colors[aqi < 50 ? 0 : aqi < 100 ? 1 : aqi < 150 ? 2 : aqi < 200 ? 3 : 4],
          text: levels[aqi < 50 ? 0 : aqi < 100 ? 1 : aqi < 150 ? 2 : aqi < 200 ? 3 : 4],
          value: aqi,
        }
      })
    }
  }
  weatherData.hourly.list = hourlyList;

  // 解析拼装15天预报数据
  let dailyList = [];

  for (let i = 1; i < 16; i++) {
    aqi = weatherData.daily.aqi[i].avg.toFixed(0);
    let wind = judgeWind(weatherData.daily.wind[i].avg)

    dailyList.push({
      weekday: i == 1 ? "今天" : weekDayTexts[(serverDate.getDay() + i - 1) % 7],
      date: weatherData.daily.aqi[i].date.slice(5),
      skydesc: parseSkycon(weatherData.daily.skycon[i].value),
      skyicon: getSkyIconPicName(weatherData.daily.skycon[i].value, weatherData.daily.precipitation[i].avg * 24),
      temperature: weatherData.daily.temperature[i].min.toFixed(0) + '°~' + weatherData.daily.temperature[i].max.toFixed(0) + '°',
      wind: {
        grade: wind.grade + "级",
        direction: wind.direction + "风"
      },
      aqi: {
        color: aqi_colors[aqi < 50 ? 0 : aqi < 100 ? 1 : aqi < 150 ? 2 : aqi < 200 ? 3 : 4],
        text: levels[aqi < 50 ? 0 : aqi < 100 ? 1 : aqi < 150 ? 2 : aqi < 200 ? 3 : 4],
        avg: aqi,
      }

    });
  }
  weatherData.daily.list = dailyList;
  // 生活指数
  weatherData.lifeIndexes = [
    {
      desc: weatherData.daily.coldRisk[0].desc,
      index: weatherData.daily.coldRisk[0].index,
      src: '../../images/icon-coldrisk.png',
      name: '感冒'
    },
    {
      desc: weatherData.daily.dressing[0].desc,
      index: weatherData.daily.dressing[0].index,
      src: '../../images/icon-dressing.png',
      name: '穿衣'
    },
    {
      desc: weatherData.realtime.ultraviolet.desc,
      index: weatherData.realtime.ultraviolet.index,
      src: '../../images/icon-ziwaixian.png',
      name: '紫外线'
    },
    {
      desc: weatherData.daily.carWashing[0].desc,
      index: weatherData.daily.carWashing[0].index,
      src: '../../images/icon-car-washing.png',
      name: '洗车'
    }
  ]
  return weatherData;
}

module.exports = {
  getWeather: getWeather
}