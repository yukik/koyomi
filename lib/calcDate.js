/**
 * *********************************************************
 *                       日時の計算
 * *********************************************************
 */
var CONFIG = require('./config');
var toDate = require('./fx/toDate');
var getWeekIndex = require('./fx/getWeekIndex');

var A_WEEK   = 604800000;
var A_DAY    =  86400000;
var A_HOUR   =   3600000;
var A_MINUTE =     60000;
var A_SECOND =      1000;

var TANI = {
  d : ['days', 'day', '日'],
  m : ['mo', 'mon', 'month', 'months', '月', 'カ月', 'ヶ月', 'ケ月', 'か月'],
  y : ['year', 'years', '年', 'カ年', 'ヶ年', 'ケ年', 'か年'],
  i : ['min', 'minute', 'minutes', '分'],
  h : ['hour', 'hours', '時', '時間'],
  w : ['week', 'weeks', '週', '週間'],
  s : ['sec', 'second', 'seconds', '秒']
};

var TANI_NAMES = Object.keys(TANI);

/**
 * 単位の
 * @method getTani
 * @param  {[type]} value
 * @return {[type]}       [description]
 */
function getTani (value) {
  value = value.toLowerCase();
  if (value in TANI) {
    return value;
  }
  var tani;
  var exists = TANI_NAMES.some(function(k) {
    if (~TANI[k].indexOf(value)) {
      tani = k;
      return true;
    }
    return false;
  });
  return exists ? tani : null;
}

var REG_ADD = /[ 　,、]/g;
var REG_ADD2 = /([-+]?\d+)([^-+0-9]+)/ig;

/**
 * 日時の計算
 *
 *  加算(減算)することができる単位は、年、ケ月、週、日、時間、分、秒です
 *  各単位で使用できる記述は定数TANIで確認してください
 *  
 * @method add
 * @param  {String|Date} date
 * @param  {String}      value
 * @return {Date}        date
 */
function add (date, value) {
  date = toDate(date, false);  // 複製
  var order = [];
  var replaced = value.replace(REG_ADD, '').replace(REG_ADD2, function(m, v, t){
    var tani = getTani(t);
    if (tani) {
      order.push([tani, v*1]);
      return '';
    } else {
      return m;
    }
  });

  // 処理できない単位あり
  if (replaced.length) {
    return null;
  }

  var d;
  order.forEach(function(x){
    switch(x[0]) {
    case 'd':
      date.setTime(date.getTime() + A_DAY * x[1]);
      break;
    case 'm':
      d = date.getDate();
      date = new Date(date.getFullYear(), date.getMonth() + x[1], d,
                      date.getHours(), date.getMinutes(), date.getSeconds());
      if (d !== date.getDate()) {
        // 末日から末日に処理されることがあります
        date.setTime(date.getTime() - date.getDate() * A_DAY);
      }
      break;
    case 'y':
      d = date.getDate();
      date = new Date(date.getFullYear() + x[1], date.getMonth(), d,
                      date.getHours(), date.getMinutes(), date.getSeconds());
      if (d !== date.getDate()) {
        // うるう年の補正 (2/29は2/28とします)
        date.setTime(date.getTime() - A_DAY);
      }
      break;
    case 'i':
      date.setTime(date.getTime() + A_MINUTE * x[1]);
      break;
    case 'h':
      date.setTime(date.getTime() + A_HOUR * x[1]);
      break;
    case 'w':
      date.setTime(date.getTime() + A_WEEK * x[1]);
      break;
    case 's':
      date.setTime(date.getTime() + A_SECOND * x[1]);
      break;
    }
  });
  return date;
}

/**
 * うるう年判定
 * @method isLeap
 * @param  {Number|Date|String}  year/date
 * @return {Boolean}             leap
 */
function isLeap (date) {
  var year;
  if (typeof date === 'number') {
    year = date;
  } else {
    date = toDate(date);
    year = date.getFullYear();
  }
  return new Date(year, 1, 29).getDate() === 29;
}

/**
 * 指定した単位の最初の値を返します
 * つまり端数を切り捨てします
 * @method start
 * @param  {Date|String} date
 * @param  {String}      grid
 * @return {Date}        date
 */
function start(date, grid) {
  date = toDate(date);
  if (!date) {
    return null;
  }
  var y = date.getFullYear();
  var m = date.getMonth();
  var d = date.getDate();
  var w = date.getDay();
  var h = date.getHours();
  var i = date.getMinutes();
  var s = date.getSeconds();
  var startMonth = this.startMonth || CONFIG.START_MONTH;
  var startWeek = this.startWeek || CONFIG.START_WEEK;
  switch(getTani(grid)) {
  case 'y':
    // 年始めの月との差
    var mx = (m - (startMonth - 1) + 12) % 12;
    return new Date(y, m - mx, 1, 0, 0, 0, 0);
  case 'm':
    return new Date(y, m, 1, 0, 0, 0, 0);
  case 'd':
    return new Date(y, m, d, 0, 0, 0, 0);
  case 'w':
    // 週初めとの日差
    var dx = (w - getWeekIndex(startWeek) + 7) % 7;
    return new Date(y, m, d - dx, 0, 0, 0, 0);
  case 'h':
    return new Date(y, m, d, h, 0, 0, 0);
  case 'i':
    return new Date(y, m, d, h, i, 0, 0);
  case 's':
    return new Date(y, m, d, h, i, s, 0);
  default:

    console.log(grid, getTani(grid));
    return null;
  }
}

/**
 * 指定した単位の最後の値を返します
 * @method last
 * @param  {Date|String} date
 * @param  {String}      grid
 * @return {Date}        date
 */
function end(date, grid) {
  date = toDate(date);
  var y = date.getFullYear();
  var m = date.getMonth();
  var d = date.getDate();
  var w = date.getDay();
  var h = date.getHours();
  var i = date.getMinutes();
  var s = date.getSeconds();
  var startMonth = this.startMonth || CONFIG.START_MONTH;
  var startWeek = this.startWeek || CONFIG.START_WEEK;
  switch(getTani(grid)) {
  case 'y':
    // 年始めの月との差
    var mx = (m - (startMonth - 1) + 12) % 12;
    return new Date(y + 1, m - mx, 0, 23, 59, 59, 999);
  case 'm':
    return new Date(y, m + 1, 0, 23, 59, 59, 999);
  case 'd':
    return new Date(y, m, d, 23, 59, 59, 999);
  case 'w':
    // 週初めとの日差
    var dx = (w - getWeekIndex(startWeek) + 7) % 7;
    return new Date(y, m, d  + (6 - dx), 23, 59, 59, 999);
  case 'h':
    return new Date(y, m, d, h, 59, 59, 999);
  case 'i':
    return new Date(y, m, d, h, i, 59, 999);
  case 's':
    return new Date(y, m, d, h, i, s, 999);
  default:
    return null;
  }
}

/**
 * ２つの日の差の日数を返します
 * 計算時２つの日の時の部分は切り捨てられます
 * @method diffDays
 * @param  {Date|String} from
 * @param  {Date|String} to
 * @return {Number}      days
 */
function diffDays (from, to) {
  var f = toDate(from, true);
  var t = toDate(to, true);
  if (f || t) {
    return (t.getTime() - f.getTime()) / A_DAY;
  } else {
    return null;
  }
}

/**
 * ２つの時間の分数差を返します
 * 秒は切り捨てられます
 * @method diffMinutes
 * @param  {Date|String} from
 * @param  {Date|String} to
 * @return {Number}      minutes
 */
function diffMinutes (from, to) {
  var f = toDate(from);
  var t = toDate(to);
  if (f && t) {
    return parseInt((t.getTime() - f.getTime()) / A_MINUTE, 10);
  } else {
    return null;
  }
}

/**
 * ２つの時間の秒数差を返します
 * ミリ秒は切り捨てられます
 * @method diffSeconds
 * @param  {Date|String} from
 * @param  {Date|String} to
 * @return {Number}      senconds
 */
function diffSeconds (from, to) {
  var f = toDate(from);
  var t = toDate(to);
  if (f && t) {
    return parseInt((t.getTime() - f.getTime()) / A_SECOND, 10);
  } else {
    return null;
  }
}

/**
 * 年の日数を返します
 * @method yearDays
 * @param  {Date|String} date
 * @return {Number}      days
 */
function yearDays (date) {
  date = toDate(date);
  if (!date) {
    return null;
  }
  var year = date.getFullYear();
  return diffDays([year, 1, 1], [year + 1, 1, 1]);
}

/**
 * 月の日数を返します
 * @method monthDays
 * @param  {Date|String} date
 * @return {Number}      days
 */
function monthDays (date) {
  date = toDate(date);
  if (!date) {
    return null;
  }
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  return diffDays([year, month, 1], [year, month + 1, 1]);
}

/**
 * 年初からの経過日数を返します
 * (指定日を含む)
 * @method passYearDays
 * @param  {Date|String} date
 * @return {Number}      days
 */
function passYearDays (date) {
  date = toDate(date);
  if (!date) {
    return null;
  }
  var year = date.getFullYear();
  return diffDays([year, 1, 1], date) + 1;
}

/**
 * 月初からの経過日数を返します
 * (指定日を含む)
 * @method passDays
 * @param  {Date|String} date
 * @return {Number}      days
 */
function passDays (date) {
  date = toDate(date);
  if (!date) {
    return null;
  }
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  return diffDays([year, month, 1], date) + 1;
}

/**
 * 年末までの日数を返します
 * (指定日を含む)
 * @method remainYearDays
 * @param  {Date|String}  date
 * @return {Number}       days
 */
function remainYearDays (date) {
  date = toDate(date);
  if (!date) {
    return null;
  }
  var year = date.getFullYear();
  return diffDays(date , [year + 1, 1, 1]);
}

/**
 * 月末までの日数を返します
 * (指定日を含む)
 * @method remainDays
 * @param  {Date|String}  date
 * @return {Number}       days
 */
function remainDays (date) {
  date = toDate(date);
  if (!date) {
    return null;
  }
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  return diffDays(date , [year, month + 1, 1]);
}

// ------------------------------------------------------------------    EXPORTS
module.exports = function (Koyomi) {

  Koyomi.initialize.push(function(koyomi, config){
    // タイムゾーン名
    koyomi.timezoneName = config.timezoneName || CONFIG.TIMEZONE_NAME;
  });

  Koyomi.add            = add;
  Koyomi.isLeap         = isLeap;
  Koyomi.start          = start;
  Koyomi.end            = end;
  Koyomi.diffDays       = diffDays;
  Koyomi.diffMinutes    = diffMinutes;
  Koyomi.diffSeconds    = diffSeconds;
  Koyomi.yearDays       = yearDays;
  Koyomi.monthDays      = monthDays;
  Koyomi.passYearDays   = passYearDays;
  Koyomi.passDays       = passDays;
  Koyomi.remainYearDays = remainYearDays;
  Koyomi.remainDays     = remainDays;

  Koyomi.prototype.add            = add;
  Koyomi.prototype.isLeap         = isLeap;
  Koyomi.prototype.start          = start;
  Koyomi.prototype.end            = end;
  Koyomi.prototype.diffDays       = diffDays;
  Koyomi.prototype.diffMinutes    = diffMinutes;
  Koyomi.prototype.diffSeconds    = diffSeconds;
  Koyomi.prototype.yearDays       = yearDays;
  Koyomi.prototype.monthDays      = monthDays;
  Koyomi.prototype.passYearDays   = passYearDays;
  Koyomi.prototype.passDays       = passDays;
  Koyomi.prototype.remainYearDays = remainYearDays;
  Koyomi.prototype.remainDays     = remainDays;
};