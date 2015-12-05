/**
 * *********************************************************
 *           (ユーティリティ関数) 期間の分割
 * *********************************************************
 */
module.exports = separate;

/**
 * dependencies
 */
var START_MONTH = require('../config').START_MONTH;
var addTerm = require('./addTerm');

/**
 * 期間をブロックごとに分割(年度、月、日)します
 *
 * この関数は、年度集計や月次集計されているデータを合算して算出する際に便利です
 * 営業日計算のキャッシュを再利用するのにも使用しています
 *
 * 期間は次のdays,months,yearsのプロパティに配列で設定されます
 *
 *   例えば from:2015-01-29  to:2017-07-02 の場合は次のようになります
 *
 *          3日          2か月       2年         3か月         2日
 *    from          m1           y           m2           d2           to
 *     |---days-1---|--months-1--|---years---|--months-2--|---days-2---|
 * 2015-01-29   2015-02-01   2015-04-01  2017-04-01   2017-07-01   2017-07-2
 *
 * {
 *   days  : [ D2015-01-29, D2015-01-30, D2015-01-31, D2017-07-01, D2017-07-02],
 *   months: [ D2015-02-01, D2015-03-01, D2017-04-01, D2017-05-01, D2017-06-01],
 *   years : [ D2015-04-01, D2016-04-01]
 * }
 *
 * (値は表記上文字列でが、すべてDateオブジェクトです)
 *
 * @method separate
 * @param  {Date}   from
 * @param  {Date}   to
 * @param  {Number} startMonth
 * @return {Object} {
 *                    days   : [days1..., days2...],
 *                    months : [months1..., months2...],
 *                    years  : [years...]
 *                  }
 */
function separate (from, to, startMonth) {
  from = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  to = new Date(to.getFullYear(), to.getMonth(), to.getDate() + 1);

  // 年度の開始月
  var sm = startMonth || START_MONTH;

  // 結果
  var days   = [];
  var months = [];
  var years  = [];

  // from/to Month/Year Start/End/Next
  var fms = new Date(from.getFullYear(), from.getMonth(), 1);
  var fmn = new Date(fms.getFullYear(), fms.getMonth() + 1, 1);
  var fys = new Date(from.getFullYear() - (from.getMonth() + 1 < sm ? 1 : 0), sm - 1, 1);
  var fyn = new Date(fys.getFullYear() + 1, fys.getMonth(), 1);
  var tms = new Date(to.getFullYear(), to.getMonth(), 1);
  var tys = new Date(to.getFullYear() - (to.getMonth() + 1 < sm ? 1 : 0), sm - 1, 1);

  var m1 = !(fms - from) ? fms : fmn < to ? fmn : to;
  var y  = !(fys - m1) ? fys : fyn < to ? fyn : tms;
  var m2 = y < tys ? tys : y;
  var d2 = m2 < tms ? tms : m2;

  var v = addTerm(from, {});

  // days 1     from <=> m1
  while(v < m1) {
    days.push(v);
    v = addTerm(v, {d: 1});
  }

  // months 1   m1 <==> y
  while(v < y) {
    months.push(v);
    v = addTerm(v, {m: 1});
  }

  // years 1    y <==> m2
  while(v < m2) {
    years.push(v);
    v = addTerm(v, {y: 1});
  }

  // months 2  m2 <==> d2
  while(v < d2) {
    months.push(v);
    v = addTerm(v, {m: 1});
  }

  // days 2    d2 <==> to
  while(v < to) {
    days.push(v);
    v = addTerm(v, {d: 1});
  }

  var rtn =  {
    years: years,
    months: months,
    days: days
  };

  return rtn;
}