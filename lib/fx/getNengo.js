/**
 * *********************************************************
 *        (補助関数) 年号オブジェクトの取得
 * *********************************************************
 */

var toDate = require('./toDate');
var NENGO = require('../config').NENGO;

/**
 * @method getNengo
 * @param  {Date|String} date
 * @param  {Boolean}     daily  true時は日付で年号の境を判定。falseでは年単位
 * @return {Object}      nengo
 */
function getNengo (date, daily) {
  date = toDate(date);
  var seireki = NENGO[NENGO.length - 1];
  var Y = date.getFullYear();
  // 日本でのグレゴリオ歴の導入は1873年（明治6年）以降。明治の元年〜5年は西暦を返す
  if (Y < 1873) {
    return seireki;
  }
  for(var i = 0, len = NENGO.length; i < len; i++) {
    var item = NENGO[i];
    if (daily && item.d <= date || !daily && item.y <= Y) {
      return item;
    }
  }
  return seireki;
}

module.exports = getNengo;