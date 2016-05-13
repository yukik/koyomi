/**
 * *********************************************************
 *        (ユーティリティ関数) 年号オブジェクトの取得
 * *********************************************************
 */
module.exports = getEra;

var ERAS = require('../config').ERAS;
var LEN  = ERAS.length;
var AD   = ERAS[LEN - 1];

/**
 * @method getEra
 * @param  {DATE}    date
 * @param  {Boolean} daily  true時は日付で年号の境を判定。falseでは年単位
 * @return {Object}  era
 */
function getEra (date, daily) {
  var Y = date.getFullYear();
  // 日本でのグレゴリオ歴の導入は1873年（明治6年）以降。明治の元年〜5年は西暦を返す
  if (Y < 1873) {
    return AD;
  }
  for(var i = 0; i < LEN; i++) {
    var item = ERAS[i];
    if (daily && item.d <= date || !daily && item.y <= Y) {
      return item;
    }
  }
  return AD;
}