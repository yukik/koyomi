/**
 * *********************************************************
 *                       祝日の計算
 * *********************************************************
 */
module.exports = function (Koyomi) {
  Koyomi.getHolidays    = getHolidays;
  Koyomi.getHolidayName = getHolidayName;
  Koyomi.prototype.getHolidays    = getHolidays;
  Koyomi.prototype.getHolidayName = getHolidayName;
};

/**
 * dependencies
 */
var CONFIG   = require('./config');
var A_DAY    = require('./const').A_DAY;
var HOLIDAYS = CONFIG.HOLIDAYS;
var toDate   = require('./fx/toDate');
var getXDay  = require('./fx/getXDay');

// キャッシュ
var holidayCache = {};

/**
 * (クラスメソッド)
 * 祝日名を取得
 * @method getHolidayName
 * @param  {Date|String} date
 * @return {String}      name
 */
function getHolidayName (date) {
  date = toDate(date);
  var key = (date.getMonth() + 1) * 100 + date.getDate();
  var holidays = getHolidays(date.getFullYear());
  return holidays[key] || null;
}

/**
 * (クラスメソッド) 
 * 祝日一覧を取得する
 * キーに日にち、値に祝日名が設定されたオブジェクトを返す
 * 
 *  {'101': '元日', '111': '成人の日', '211': '建国記念日', （省略...）
 * 
 * @method getHolidays
 * @param  {Number}   year
 * @return {Object}   holidays
 */
function getHolidays(year) {
  var holidays = holidayCache[year];
  if (holidays) {
    return holidays;
  }

  // 祝日を計算し追加
  holidays = {};
  HOLIDAYS.forEach(function (item) {
    var h;
    switch (item) {
    case '春分の日':
      h = getShunbun(year);
      break;
    case '秋分の日':
      h = getShubun(year);
      break;
    default:
      h = parseHoliday(year, item);
      break;
    }
    if (h) {
      var key = h[0] * 100 + h[1];
      holidays[key] = h[2];
    }
  });

  // 振替休日を設定
  if (~HOLIDAYS.indexOf('振替休日')) {
    setFurikaeKyujitu(year, holidays);
  }

  // 国民の休日を設定
  if (~HOLIDAYS.indexOf('国民の休日')) {
    setKokuminNoKyujitu(year, holidays);
  }

  // キャッシュに保存
  holidayCache[year] = holidays;

  return holidays;
}

// 祝日定義の日にち部分の正規表現
var REG_HOLIDAY = /^(?:(\d+)(-)?(\d+)?\/)?(\d+)\/(\d+)(\D*)?$/;


/**
 * 祝日の定義から、祝日であれば日にちを返す。祝日でないならnullを返す
 *   例
 *     year    = 2016
 *     item    = '海の日 1996-2002/7/20  2003-/7/3Mon'
 *     holiday = [7, 18, '海の日']
 * 
 * @method parseHoliday
 * @param  {Number}     year
 * @param  {String}     item
 * @return {Array}      holiday
 */
function parseHoliday(year, item) {
  var data = item.match(/(\S+)/g);
  var name = data[0];
  for(var i = 1; i < data.length; i++) {
    var m = data[i].match(REG_HOLIDAY);
    if (m) {
      var from = m[1] * 1;
      var to = (m[3] || (m[2] ? year : from)) * 1;
      var month = m[4] * 1;
      var day = m[6] ? getXDay(year, month, m[5], m[6]) : m[5] * 1;
      if (day && from <= year && year <= to) {
        return [month, day, name];
      }
    }
  }
  return null;
}

/**
 * 春分の日 (wikiの簡易計算より)
 * @method getShunbun
 * @param  {Number}   year
 * @return {Array}    shunbun
 */
function getShunbun(year) {
  if (year < 1949 || 2099 < year) {
    return null;
  }
  var day;
  switch(year % 4) {
  case 0:
    day = year <= 1956 ? 21 : year <= 2088 ? 20 : 19;
    break;
  case 1:
    day = year <= 1989 ? 21 : 20;
    break;
  case 2:
    day = year <= 2022 ? 21 : 20;
    break;
  case 3:
    day = year <= 1923 ? 22 : year <= 2055 ? 21 : 20;
  }
  return [3, day, '春分の日'];
}

/**
 * 秋分の日 (wikiの簡易計算より)
 * @method getShubun
 * @param  {Number}  year
 * @return {Array}   shubun
 */
function getShubun(year) {
  if (year < 1948 || 2099 < year) {
    return null;
  }
  var day;
  switch(year % 4) {
  case 0:
    day = year <= 2008 ? 23 : 22;
    break;
  case 1:
    day = year <= 1917 ? 24 : year <= 2041 ? 23 : 22;
    break;
  case 2:
    day = year <= 1946 ? 24 : year <= 2074 ? 23 : 22;
    break;
  case 3:
    day = year <= 1979 ? 24 : 23;
  }
  return [9, day, '秋分の日'];
}

/**
 * 振替休日を設定する
 * 施行: 1973/4/30-
 * @method setFurikaeKyujitu
 * @param  {Number}   year
 * @param  {Object}   holidays
 */
function setFurikaeKyujitu(year, holidays) {
  if (year < 1973) {
    return;
  }
  var last = null;
  var furikae = [];
  var activeTime = new Date(1973, 4-1, 29).getTime(); // 施行前日の祝日から適用
  var flg = false;
  var keys = Object.keys(holidays);
  keys.push('1231');
  keys.forEach(function(md) {
    var date = new Date(year, md.slice(0, -2) * 1 - 1, md.slice(-2) * 1);
    if (flg) {
      last.setTime(last.getTime() + A_DAY);
      if (last.getTime() !== date.getTime()) {
        furikae.push((last.getMonth() + 1) * 100 + last.getDate());
        flg = false;
      }
    } else {
      flg = date.getDay() === 0 && activeTime <= date.getTime();
    }
    last = date;
  });
  furikae.forEach(function(x){
    holidays[x] = '振替休日';
  });
}

/**
 * 国民の休日を設定する
 * 施行: 1988-
 * @method setKokuminNoKyujitu
 * @param  {Number}   year
 * @param  {Object}   holidays
 */
function setKokuminNoKyujitu(year, holidays) {
  if (year < 1988) {
    return;
  }
  var kokumin = [];
  var last = null;
  Object.keys(holidays).forEach(function(md) {
    var date = new Date(year, md.slice(0, -2) * 1 - 1, md.slice(-2) * 1);
    if (last){
      last.setTime(last.getTime() + A_DAY);
      if (last.getTime() + A_DAY === date.getTime()) {
        kokumin.push((last.getMonth() + 1) * 100 + last.getDate());
      }
    }
    last = date;
  });
  kokumin.forEach(function (x){
    if (x in holidays) { // 他の祝日や振替休日が優先される
      return;
    }
    holidays[x] = '国民の休日';
  });
}
