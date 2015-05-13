/**
 * *********************************************************
 *                 (補助関数) 週番号を取得
 * *********************************************************
 */
var A_DAY = require('../const').A_DAY;
var toDate = require('./toDate');
var getWeekIndex = require('./getWeekIndex');

/**
 * @method getWeekNumber
 * @param  {Date}   date
 * @param  {String} week   週の始まりの曜日 既定値 Mon
 * @param  {Number} month  始まりの月       既定値 1    ※1月 -> 1
 * @return {Number} weekNumber
 */
function getWeekNumber (date, week, month) {
  date = toDate(date, true);
  week = getWeekIndex(week, 1);
  month = month ? month - 1 : 0;
  var y = date.getFullYear();
  var m = date.getMonth();
  y = m < month ? y - 1 : y;                // 年度の補正
  var dx1 = new Date(y, month, 1);          // x月1日
  var plus = (dx1.getDay() + 7 - week) % 7; // x日1日の前の日数 
  var days = (date - dx1) / A_DAY + plus;   // そこからのdateまでの日数
  return Math.floor(days / 7) + 1;
}


module.exports = getWeekNumber;