/**
 * *********************************************************
 *       (ユーティリティ関数) 第x week曜日の日にち
 * *********************************************************
 */
module.exports = getXDay;

/**
 * @method getXDay
 * @param  {Number} year
 * @param  {Number} month
 * @param  {Number} x      5以上を指定した場合は最終の指定曜日の日とします
 * @param  {Number} week   0:日, 1:月, ...
 * @return {Date}   date
 */
function getXDay(year, month, x, week) {
  var f = new Date(year, month - 1, 1).getDay();      // 1日のインデックス
  var d1 = 1 + week - f + (week < f ? 7 : 0);         // 第1の日にち
  if (4 < x) {
    var days = (new Date(year, month, 0)).getDate();  // 最終週の場合
    x = parseInt((days - d1) / 7, 10) + 1;
  }
  var day = d1 + (x - 1) * 7;                            // 第xの日にち
  return new Date(year, month -1, day);
}

