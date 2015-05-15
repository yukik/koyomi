/**
 * *********************************************************
 *                 (補助関数) 週番号を取得
 * *********************************************************
 */
var A_DAY = require('../const').A_DAY;
var toDate = require('./toDate');
var CONFIG = require('../config');
var getWeekIndex = require('./getWeekIndex');

/**
 * @method getWeekNumber
 * @param  {Date}   date
 * @param  {String} startWeek   週の始まりの曜日       既定値 CONFIG.START_WEEK
 * @param  {Number} startMonth  始まりの月 ※1月 -> 1  既定値 CONFIG.START_MONTH
 * @return {Number} weekNumber
 */
function getWeekNumber (date, startWeek, startMonth) {
  date = toDate(date, true);
  startWeek = getWeekIndex(startWeek || CONFIG.START_WEEK);
  startMonth = startMonth || CONFIG.START_MONTH;
  var y = date.getFullYear();
  var m = date.getMonth();
  y = m < startMonth - 1 ? y - 1 : y;            // 年度の補正
  var dx1 = new Date(y, startMonth - 1, 1);      // x月1日
  var plus = (dx1.getDay() - startWeek + 7) % 7; // x日1日の前の日数 
  var days = (date - dx1) / A_DAY + plus;        // そこからのdateまでの日数
  return Math.floor(days / 7) + 1;
}


module.exports = getWeekNumber;