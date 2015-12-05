/**
 * *********************************************************
 *            (ユーティリティ関数) 日時の加減
 * *********************************************************
 */
module.exports = addTerm;

/**
 * 指定した位を加減します
 *
 * 年・月のみ指定して、日以下を指定しない場合、次のルールを適用します
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
function addTerm (date, value) {
  if ('d' in value || 'h' in value || 'i' in value ||
      's' in value || 'ms' in value) {
    return new Date(
      date.getFullYear()     + (value.y  || 0),
      date.getMonth()        + (value.m  || 0),
      date.getDate()         + (value.d  || 0),
      date.getHours()        + (value.h  || 0),
      date.getMinutes()      + (value.i  || 0),
      date.getSeconds()      + (value.s  || 0),
      date.getMilliseconds() + (value.ms || 0)
    );
  } else if ('y' in value || 'm' in value) {
    var y = date.getFullYear() + (value.y  || 0);
    var m = date.getMonth() + (value.m  || 0);
    var d = Math.min(new Date(y, m + 1, 0).getDate(), date.getDate());
    return new Date(
      y,
      m,
      d,
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    );
  } else {
    return date;
  }
}