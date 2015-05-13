/**
 * *********************************************************
 *          (補助関数) 第x week曜日の日にちを返す
 * *********************************************************
 */
var getWeekIndex = require('./getWeekIndex');

/**
 * @method getXDay
 * @param  {Number} year
 * @param  {Number} month
 * @param  {Number} x      5以上を指定した場合は最終の指定曜日の日とします
 * @param  {String} week   Sun-Sat, Sunday-Saturday, 日-土
 * @return {Number} day
 */
function getXDay(year, month, x, week) {
  var w = getWeekIndex(week);                         // 曜日のインデックス
  if (w === null) {
    return null;
  }
  var f = new Date(year, month - 1, 1).getDay();      // 1日のインデックス
  var d1 = 1 + w - f + (w < f ? 7 : 0);               // 第1の日にち
  if (4 < x) {
    var days = (new Date(year, month, 0)).getDate();  // 最終週の場合
    x = parseInt((days - d1) / 7, 10) + 1;
  }
  return d1 + (x - 1) * 7;                            // 第xの日にち
}

module.exports = getXDay;