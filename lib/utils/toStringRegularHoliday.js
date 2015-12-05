/**
 * *********************************************************
 *       (ユーティリティ関数) 定休日のビルド
 * *********************************************************
 */
module.exports = toStringRegularHoliday;

var CONFIG = require('../config');

/**
 * 定休日をビルドする
 * {
 *   week : {'0': true, '6': true},
 *   day  : {'20': true, '30': true},
 *   xweek: {'2-2': true, '3-2': true}
 * } ->
 * '日, 土, 20, 30, 2火, 3火'
 *
 * @param  {Object} value
 * @return {String}
 */
function toStringRegularHoliday(value) {
  if (typeof value === 'function') {
    return value;
  }
  var weeks = Object.keys(value.week).map(x => CONFIG.JWEEK[x]);
  var days = Object.keys(value.day);
  var xweeks = Object.keys(value.xweek).map(x => {
    var sp = x.split('-');
    return sp[0] + CONFIG.JWEEK[sp[1]];
  });
  return [].concat(weeks).concat(days).concat(xweeks).join(', ') || null;
}