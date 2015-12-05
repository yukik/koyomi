/**
 * *********************************************************
 *         (ユーティリティ関数) 日時の位を置き換え
 * *********************************************************
 */
module.exports = replaceTerm;

/**
 * 指定した位を置き換えます
 *
 * 年・月のいずれかのみ置き換えを行った場合は、次のルールが適用します
 *
 * 民法第143条 暦による期間の計算
 * 週、月又は年の初めから期間を起算しないときは、その期間は、最後の週、月又は年において
 * その起算日に応当する日の前日に満了する。ただし、月又は年によって期間を定めた場合にお
 * いて、最後の月に応当する日がないときは、その月の末日に満了する。
 *
 * @param  {Date}   date
 * @param  {Object} value
 * @return {Date}   date
 */
function replaceTerm(date, value) {
  var y  = value.hasOwnProperty('y')  ? value.y  : date.getFullYear();
  var m  = value.hasOwnProperty('m')  ? value.m  : date.getMonth() + 1;
  var d  = value.hasOwnProperty('d')  ? value.d  : date.getDate();
  var h  = value.hasOwnProperty('h')  ? value.h  : date.getHours();
  var i  = value.hasOwnProperty('i')  ? value.i  : date.getMinutes();
  var s  = value.hasOwnProperty('s')  ? value.s  : date.getSeconds();
  var ms = value.hasOwnProperty('ms') ? value.ms : date.getMilliseconds();
  if ((value.hasOwnProperty('y') || value.hasOwnProperty('m')) &&
       !value.hasOwnProperty('d') &&
       !value.hasOwnProperty('h') &&
       !value.hasOwnProperty('i') &&
       !value.hasOwnProperty('s') &&
       !value.hasOwnProperty('ms')) {
    d = Math.min(new Date(y, m, 0).getDate(), d);
  }
  return new Date(y, m - 1, d, h, i, s, ms);
}




