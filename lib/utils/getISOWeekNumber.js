/**
 * *********************************************************
 *           (ユーティリティ関数) ISO週番号取得
 * *********************************************************
 */

var getWeekNumber = require('./getWeekNumber');


module.exports = getISOWeekNumber;

/**
 * ISO週番号
 *   1月&月曜始まり
 *   1月初、12月末は日数が少ない場合に前年・翌年の週番号になる
 * @method getISOWeekNumber
 * @param  {Date}   date
 * @return {Number} ISOWeekNumber
 */
function getISOWeekNumber (date) {
  var wn = getWeekNumber(date, 1, 1);
  var d1_1 = new Date(date.getFullYear(), 0, 1);
  var w1_1 = d1_1.getDay();
  // 初週の日数が少ない場合は週番号がひとつ前にずれる
  if (!w1_1 || 4 < w1_1) {
    wn--;
  }
  if (wn === 0) {
    return 53;
  } else if (wn === 53) {
    // 最終週の場合も多いほうの年の週番号とする
    var d12_31 = new Date(date.getFullYear(), 11, 31);
    var w12_31 = d12_31.getDay();
    return w12_31 && w12_31 < 4 ? 1 : wn;
  } else {
    return wn;
  }
}

