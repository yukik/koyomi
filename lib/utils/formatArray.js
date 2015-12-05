/**
 * *********************************************************
 *       (ユーティリティ関数) パラメータ文字列の変換
 * *********************************************************
 */
module.exports = formatArray;

/**
 * dependencies
 */
var PARAMS = require('../parameters');
var suji = require('./suji');
var compile = require('./compileFormat');
var formatOptions = require('./formatOptions');

/**
 * 各パラメータ文字列を値に変換し値を返します
 * @method formatArray
 * @param  {Date}  date
 * @param  {Array} format
 * @return {Array}
 */
function formatArray (koyomi, date, format) {
  return format.map(x => {

    // 変換なし
    if (typeof x === 'string') {
      return x;

    // 変換あり
    } else {

      var v;
      var fn = PARAMS[x.p];

      // 変換関数が文字列の場合はカスタマイズ文字列の処理とする
      if (typeof fn === 'string') {
        var c = compile(fn);
        v = formatArray(koyomi, date, c.v).join('');
        if (c.o) {
          v = formatOptions(v, c.o);
        }

      // 関数の場合はそのまま結果を受け取る
      } else {
        v = fn(date, koyomi);

        // 結果が配列の場合はさらに変換作業を行う
        if (Array.isArray(v)) {
          var f = compile(v[1]);
          v = formatArray(koyomi, v[0], f.v).join('');
          if (f.o){
            // 全体オプション (全角、漢数字等)
            v = formatOptions(v, f.o);
          }
        }
      }

      // 個別オプション
      return x.hasOwnProperty('o') ? convertFormatNumber(v, x.o) : v;
    }
  });
}

/**
 * 0埋め、序数、切り捨てを処理する
 * @method convertFormatNumber
 * @param  {Number|String} value
 * @param  {Number}        num
 * @return {String}        value
 */
function convertFormatNumber (value, num) {
  // 序数
  if (num === 0) {
    return suji(value, '序数');
  }
  // 0埋め
  if (typeof value === 'number') {
    value = value + '';
    return value.length < num ? ('000000000' + value).slice(-num) : value;
  }
  // 切り捨て
  return num && num < value.length ? value.substring(0, num) : value;
}