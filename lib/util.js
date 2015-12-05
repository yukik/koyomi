

module.exports = {
  parse           : parse,
  toDatetime      : toDatetime,
  toDate          : toDate,
  getEra          : getEra,
  getWeekNumber   : getWeekNumber,
  getISOWeekNumber: getISOWeekNumber,
  getXDay         : getXDay
};

/**
 * dependencies
 */
var suji               = require('./utils/suji');
var parseFn            = require('./utils/parse');
var toDateFn           = require('./utils/toDate');
var toDatetimeFn       = require('./utils/toDatetime');
var getEraFn           = require('./utils/getEra');
var getWeekIndex       = require('./utils/getWeekIndex');
var getWeekNumberFn    = require('./utils/getWeekNumber');
var getISOWeekNumberFn = require('./utils/getISOWeekNumber');
var getXDayFn          = require('./utils/getXDay');

/**
 * alias
 */
var BIZ = /^(\d+)営業日(前|後)?$/;

/**
 * 口語から日時を返します
 * 判別できない場合はtoDatetimeへ処理を委譲し結果を返します
 * @param  {String} value
 * @param  {Date}   now     既定値: 現在の日時
 * @return {Date}   date
 */
function parse (value, now) {
  now = now ? this.toDate(now) : new Date();
  if (!now) {
    return null;
  }
  // 営業日計算
  if (value.indexOf('営業日') !== -1) {
    value = suji(value);
    var matches = value.match(BIZ);
    if (matches) {
      return this.addBiz(now, matches[1] * (matches[2] === '前' ? -1 : 1));
    } else {
      return null;
    }
  // そのほか
  } else {
    return parseFn(value, this.startMonth, this._startWeek, now) ||
           toDatetimeFn(value, this.startMonth);
  }
}

/**
 * 日時の形式のものをできる限り日時を判別しDateオブジェクトを作成する関数
 * @param  {Date|String|Array|Number|Object} date
 * @return {Date}                            date
 */
function toDatetime (date) {
  return toDatetimeFn(date, this.startMonth);
}

/**
 * 日時の形式のものをできる限り日にちを判別しDateオブジェクトを作成する関数
 * @param  {Date|String|Array|Number|Object} date
 * @return {Date}                            date
 */
function toDate (date) {
  return toDateFn(date, this.startMonth);
}

/**
 * 元号オブジェクトを返します
 * @param  {DATE}    date
 * @param  {Boolean} daily
 * @return {Object}  era
 */
function getEra(date, daily) {
  date = this.toDate(date);
  return date ? getEraFn(date, daily) : null;
}

/**
 * 週番号を返します
 * @param  {DATE}   date
 * @return {Number} weekNumber
 */
function getWeekNumber(date) {
  date = this.toDate(date);
  var week = this._startWeek;
  return date ? getWeekNumberFn(date, week, this.startMonth): null;
}

/**
 * ISO週番号を返します
 * @param  {DATE}   date
 * @return {Number} weekNumber
 */
function getISOWeekNumber (date) {
  date = this.toDate(date);
  return date ? getISOWeekNumberFn(date) : null;
}

/**
 * 第x week曜日の日にちをします
 * dateを省略したら今月を対象にします
 * @param  {Number} x
 * @param  {String} week
 * @param  {DATE}   date
 * @return {Date}   date
 */
function getXDay(x, week, date) {
  week = getWeekIndex(week);
  date = date ? this.toDate(date) : new Date();
  if (date && typeof week === 'number') {
    return getXDayFn(date.getFullYear(), date.getMonth()+1, x, week);
  } else {
    return null;
  }
}