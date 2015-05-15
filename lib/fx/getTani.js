/**
 * *********************************************************
 *                   (補助関数) 単位取得
 * *********************************************************
 */

var TANI = require('../const').TANI;
var TANI_NAMES = Object.keys(TANI);

/**
 * 単位を取得する
 * @method getTani
 * @param  {String} value
 * @return {String} tani
 */
function getTani (value) {
  value = value.toLowerCase();
  if (value in TANI) {
    return value;
  }
  var tani;
  var exists = TANI_NAMES.some(function(k) {
    if (~TANI[k].indexOf(value)) {
      tani = k;
      return true;
    }
    return false;
  });
  return exists ? tani : null;
}

module.exports = getTani;