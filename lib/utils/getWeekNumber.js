/**
 * *********************************************************
 *            (ユーティリティ関数) 週番号を取得
 * *********************************************************
 */
module.exports = getWeekNumber;

/**
 * alias
 */
var A_DAY =  86400000;

/**
 * @method getWeekNumber
 * @param  {Date}   date
 * @param  {String} startWeek   日:0, 月:1, ...
 * @param  {Number} startMonth  1月:1, 2月:2, ...
 * @return {Number} weekNumber
 */
function getWeekNumber (date, startWeek, startMonth) {
  var y = date.getFullYear();
  var m = date.getMonth();
  y = m < startMonth - 1 ? y - 1 : y;            // 年度の補正
  var dx1 = new Date(y, startMonth - 1, 1);      // x月1日
  var plus = (dx1.getDay() - startWeek + 7) % 7; // x日1日の前の日数
  var days = (date - dx1) / A_DAY + plus;        // そこからのdateまでの日数
  return Math.floor(days / 7) + 1;
}


