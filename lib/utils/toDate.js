/**
 * *********************************************************
 *           (ユーティリティメソッド) 日時取得
 * *********************************************************
 */

module.exports = toDate;

/**
 * dependencies
 */
var toDatetime = require('./toDatetime');

/**
 * できる限り日時を判別しDateオブジェクトを作成する関数
 *
 * skipTrimにtrueをした場合は、Dateオブジェクトの場合に時以下の切り捨てをしません
 *
 * @param  {Date|String|Array|Number|Object} date
 * @param  {Number}                          startMonth
 * @return {Date}                            date
 */
function toDate(date, startMonth) {
  date = toDatetime(date, startMonth);
  return date ? new Date(date.getFullYear(), date.getMonth(), date.getDate()) : null;
}
