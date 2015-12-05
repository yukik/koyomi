/**
 * *********************************************************
 *       (ユーティリティ関数) 口語を日時に変換
 * *********************************************************
 * {Date} fromNow({String} value, {Number} startMonth, {Number} startWeek, {Date} now)
 */
module.exports = fromNow;

/**
 * dependencies
 */
var CONFIG       = require('../config');
var getWeekIndex = require('./getWeekIndex');
var suji         = require('./suji');
var add          = require('./addTerm');
var replace      = require('./replaceTerm');

/**
 * alias
 */
var START_MONTH = CONFIG.START_MONTH;
var START_WEEK  = getWeekIndex(CONFIG.START_WEEK);

/**
 * 計算式の定義
 *
 * 文字列で日時を表す語や{{num}}{{期間}}{{前|後}}などを定義する
 * 関数を定義した場合はその関数を実行する
 * 文字列を指定した場合は、その定義名と同じ処理を行う
 *
 * 関数のAPI
 *
 * 語の中に数字が存在しない場合
 * @param {Date}   now
 * @param {Number} sm   startMonth
 * @param {Number} sw   startWeek
 * @param {Date}   date
 *
 * 語の中に数字が存在する場合
 * @param {Date}   now
 * @param {Number} x
 * @param {Number} sm   startMonth
 * @param {Number} sw   startWeek
 * @param {Date}   date
 */
var CALC = {

  // ***** 日を表す語

  '今'          : now => now,
  'いま'        : '今',
  'now'         : '今',

  '今日'        : now => trim(now),
  'きょう'      : '今日',
  '本日'        : '今日',
  'today'       : '今日',

  '昨日'        : now => add(trim(now), {d: -1}),
  'きのう'      : '昨日',
  'yesterday'   : '昨日',

  '明日'        : now => add(trim(now), {d:  1}),
  'あす'        : '明日',
  'あした'      : '明日',
  'tomorrow'    : '明日',

  'あさって'    : now => add(trim(now), {d:  2}),
  '明後日'      : 'あさって',

  'おととい'    : now => add(trim(now), {d: -2}),
  'おとつい'    : 'おととい',
  '一昨日'      : 'おととい',

  // ***** 期間の最初または最後の日を表す語

  '年初'        : now => replace(trim(now), {m:  1, d:  1}),
  '年頭'        : '年初',
  '今年初め'    : '年初',
  '今年始め'    : '年初',
  '年末'        : now => replace(trim(now), {m: 12, d: 31}),
  '歳末'        : '年末',
  '今年末'      : '年末',

  '来年初め'    : now => replaceAdd(trim(now), {m:  1, d:  1}, {y: 1}),
  '来年始め'    : '来年初め',
  '来年末'      : now => replaceAdd(trim(now), {m: 12, d: 31}, {y: 1}),

  '昨年初め'    : now => replaceAdd(trim(now), {m:  1, d:  1}, {y: -1}),
  '昨年始め'    : '昨年初め',
  '昨年末'      : now => replaceAdd(trim(now), {m: 12, d: 31}, {y: -1}),

  '年度初め'    : (now, sm) => replace(trim(now), {y: y(now)-(m(now)<sm?1:0), m: sm, d: 1}),
  '年度始め'    : '年度初め',
  '年度頭'      : '年度初め',
  '年度末'      : (now, sm) => replace(trim(now), {y: y(now)+(m(now)<sm?0:1), m: sm, d: 0}),

  '月初'        : now => replace(trim(now), {d: 1}),
  '月初め'      : '月初',
  '月始め'      : '月初',
  '今月初め'    : '月初',
  '今月始め'    : '月初',
  '月末'        : now => replace(trim(now), {d: d(new Date(y(now), m(now), 0))}),
  '今月末'      : '月末',
  '月終わり'    : '月末',
  '今月終わり'  : '月末',

  '先月初め'    : now => replaceAdd(trim(now), {d: 1}, {m: -1}),
  '先月始め'    : '先月初め',
  '先月頭'      : '先月初め',
  '先月末'      : now => replace(trim(now), {d: 0}),
  '先月終わり'  : '先月末',

  '来月初め'    : now => replaceAdd(trim(now), {d: 1}, {m: 1}),
  '来月始め'    : '来月初め',
  '来月頭'      : '来月初め',
  '来月末'      : now => addReplace(trim(now), {m: 2}, {d: 0}),
  '来月終わり'  : '来月末',

  '週初め'      : (now, sm, sw) => add(trim(now), {d: (w(now)-sw+7)%7*-1}),
  '週初'        : '週初め',
  '今週初め'    : '週初め',
  '週開始'      : '週初め',
  '週末'        : (now, sm, sw) => add(trim(now), {d: (w(now)-sw+7)%7*-1+6}),
  '今週末'      : '週末',
  '週終わり'    : '週末',

  // ***** 加減をする語

  'x年前'       : (now, x) => add(trim(now), {y: -x}),
  'x年後'       : (now, x) => add(trim(now), {y: x}),

  '半年前'      : now => add(trim(now), {m: -6}),
  '半年後'      : now => add(trim(now), {m: 6}),

  'ひと月前'    : now => add(trim(now), {m: -1}),
  'ひと月後'    : now => add(trim(now), {m: 1}),

  'xヶ月前'     : (now, x) => add(trim(now), {m: -x}),
  'xカ月前'     : 'xヶ月前',
  'xケ月前'     : 'xヶ月前',
  'xか月前'     : 'xヶ月前',
  'xヶ月後'     : (now, x) => add(trim(now), {m: x}),
  'xカ月後'     : 'xヶ月後',
  'xケ月後'     : 'xヶ月後',
  'xか月後'     : 'xヶ月後',

  'x週間前'     : (now, x) => add(trim(now), {d: x*-7}),
  'x週前'       : 'x週間前',
  'x週間後'     : (now, x) => add(trim(now), {d: x*7}),
  'x週後'       : 'x週間後',

  'x日前'       : (now, x) => add(trim(now), {d: -x}),
  'x日後'       : (now, x) => add(trim(now), {d:  x}),

  'x時間前'     : (now, x) => add(now, {h: -x}),
  'x時間後'     : (now, x) => add(now, {h: x}),

  'x分前'       : (now, x) => add(now, {i: -x}),
  'x分後'       : (now, x) => add(now, {i: x}),

  'x秒前'       : (now, x) => add(now, {s: -x}),
  'x秒後'       : (now, x) => add(now, {s: x}),

  'xミリ秒前'   : (now, x) => add(now, {ms: -x}),
  'xミリ秒後'   : (now, x) => add(now, {ms: x}),

  // ***** ある月の日を表す語

  '今月x日'     : (now, x) => enableDay(trim(now), x),
  '今月のx日'   : '今月x日',

  '先月x日'     : (now, x) => enableDay(add(trim(now),{m: -1}), x),
  '先月のx日'   : '先月x日',

  '来月x日'     : (now, x) => enableDay(add(trim(now),{m: 1}), x),
  '来月のx日'   : '来月x日',

  '先々月x日'   : (now, x) => enableDay(add(trim(now),{m: -2}), x),
  '先々月のx日' : '先々月x日',

  '再来月x日'   : (now, x) => enableDay(add(trim(now),{m: 2}), x),
  '再来月のx日' : '再来月x日',

  '今度のx日'   : (now, x) => enableDay(add(trim(now),{m: d(now)<x?0:1}), x),
  '次のx日'     : '今度のx日',

  '前回のx日'   : (now, x) => enableDay(add(trim(now),{m: d(now)<x?-1:0}), x),
  '前のx日'     : '前回のx日',

  // ***** ある週の曜日を表す語

  '今週日曜日'  : (now, sm, sw) => add(trim(now), {d: 0-w(now)+(0<sw?7:0)}),
  '今週月曜日'  : (now, sm, sw) => add(trim(now), {d: 1-w(now)+(1<sw?7:0)}),
  '今週火曜日'  : (now, sm, sw) => add(trim(now), {d: 2-w(now)+(2<sw?7:0)}),
  '今週水曜日'  : (now, sm, sw) => add(trim(now), {d: 3-w(now)+(3<sw?7:0)}),
  '今週木曜日'  : (now, sm, sw) => add(trim(now), {d: 4-w(now)+(4<sw?7:0)}),
  '今週金曜日'  : (now, sm, sw) => add(trim(now), {d: 5-w(now)+(5<sw?7:0)}),
  '今週土曜日'  : now => add(trim(now), {d: 6-w(now)}),

  '今週の日曜日'  : '今週日曜日',
  '今週の月曜日'  : '今週月曜日',
  '今週の火曜日'  : '今週火曜日',
  '今週の水曜日'  : '今週水曜日',
  '今週の木曜日'  : '今週木曜日',
  '今週の金曜日'  : '今週金曜日',
  '今週の土曜日'  : '今週土曜日',

  '先週日曜日'  : (now, sm, sw) => add(CALC['今週日曜日'](now, sm, sw), {d:-7}),
  '先週月曜日'  : (now, sm, sw) => add(CALC['今週月曜日'](now, sm, sw), {d:-7}),
  '先週火曜日'  : (now, sm, sw) => add(CALC['今週火曜日'](now, sm, sw), {d:-7}),
  '先週水曜日'  : (now, sm, sw) => add(CALC['今週水曜日'](now, sm, sw), {d:-7}),
  '先週木曜日'  : (now, sm, sw) => add(CALC['今週木曜日'](now, sm, sw), {d:-7}),
  '先週金曜日'  : (now, sm, sw) => add(CALC['今週金曜日'](now, sm, sw), {d:-7}),
  '先週土曜日'  : (now, sm, sw) => add(CALC['今週土曜日'](now, sm, sw), {d:-7}),

  '先週の日曜日'  : '先週日曜日',
  '先週の月曜日'  : '先週月曜日',
  '先週の火曜日'  : '先週火曜日',
  '先週の水曜日'  : '先週水曜日',
  '先週の木曜日'  : '先週木曜日',
  '先週の金曜日'  : '先週金曜日',
  '先週の土曜日'  : '先週土曜日',

  '来週日曜日'  : (now, sm, sw) => add(CALC['今週日曜日'](now, sm, sw), {d:7}),
  '来週月曜日'  : (now, sm, sw) => add(CALC['今週月曜日'](now, sm, sw), {d:7}),
  '来週火曜日'  : (now, sm, sw) => add(CALC['今週火曜日'](now, sm, sw), {d:7}),
  '来週水曜日'  : (now, sm, sw) => add(CALC['今週水曜日'](now, sm, sw), {d:7}),
  '来週木曜日'  : (now, sm, sw) => add(CALC['今週木曜日'](now, sm, sw), {d:7}),
  '来週金曜日'  : (now, sm, sw) => add(CALC['今週金曜日'](now, sm, sw), {d:7}),
  '来週土曜日'  : (now, sm, sw) => add(CALC['今週土曜日'](now, sm, sw), {d:7}),

  '来週の日曜日'  : '来週日曜日',
  '来週の月曜日'  : '来週月曜日',
  '来週の火曜日'  : '来週火曜日',
  '来週の水曜日'  : '来週水曜日',
  '来週の木曜日'  : '来週木曜日',
  '来週の金曜日'  : '来週金曜日',
  '来週の土曜日'  : '来週土曜日',

  '先々週日曜日'  : (now, sm, sw) => add(CALC['今週日曜日'](now, sm, sw), {d:-14}),
  '先々週月曜日'  : (now, sm, sw) => add(CALC['今週月曜日'](now, sm, sw), {d:-14}),
  '先々週火曜日'  : (now, sm, sw) => add(CALC['今週火曜日'](now, sm, sw), {d:-14}),
  '先々週水曜日'  : (now, sm, sw) => add(CALC['今週水曜日'](now, sm, sw), {d:-14}),
  '先々週木曜日'  : (now, sm, sw) => add(CALC['今週木曜日'](now, sm, sw), {d:-14}),
  '先々週金曜日'  : (now, sm, sw) => add(CALC['今週金曜日'](now, sm, sw), {d:-14}),
  '先々週土曜日'  : (now, sm, sw) => add(CALC['今週土曜日'](now, sm, sw), {d:-14}),

  '先々週の日曜日'  : '先々週日曜日',
  '先々週の月曜日'  : '先々週月曜日',
  '先々週の火曜日'  : '先々週火曜日',
  '先々週の水曜日'  : '先々週水曜日',
  '先々週の木曜日'  : '先々週木曜日',
  '先々週の金曜日'  : '先々週金曜日',
  '先々週の土曜日'  : '先々週土曜日',

  '再来週日曜日'  : (now, sm, sw) => add(CALC['今週日曜日'](now, sm, sw), {d:14}),
  '再来週月曜日'  : (now, sm, sw) => add(CALC['今週月曜日'](now, sm, sw), {d:14}),
  '再来週火曜日'  : (now, sm, sw) => add(CALC['今週火曜日'](now, sm, sw), {d:14}),
  '再来週水曜日'  : (now, sm, sw) => add(CALC['今週水曜日'](now, sm, sw), {d:14}),
  '再来週木曜日'  : (now, sm, sw) => add(CALC['今週木曜日'](now, sm, sw), {d:14}),
  '再来週金曜日'  : (now, sm, sw) => add(CALC['今週金曜日'](now, sm, sw), {d:14}),
  '再来週土曜日'  : (now, sm, sw) => add(CALC['今週土曜日'](now, sm, sw), {d:14}),

  '再来週の日曜日'  : '再来週日曜日',
  '再来週の月曜日'  : '再来週月曜日',
  '再来週の火曜日'  : '再来週火曜日',
  '再来週の水曜日'  : '再来週水曜日',
  '再来週の木曜日'  : '再来週木曜日',
  '再来週の金曜日'  : '再来週金曜日',
  '再来週の土曜日'  : '再来週土曜日',

  '今度の日曜日': now => add(trim(now), {d: 7-w(now)}),
  '今度の月曜日': now => add(trim(now), {d: (w(now)<1?0:7)+1-w(now)}),
  '今度の火曜日': now => add(trim(now), {d: (w(now)<2?0:7)+2-w(now)}),
  '今度の水曜日': now => add(trim(now), {d: (w(now)<3?0:7)+3-w(now)}),
  '今度の木曜日': now => add(trim(now), {d: (w(now)<4?0:7)+4-w(now)}),
  '今度の金曜日': now => add(trim(now), {d: (w(now)<5?0:7)+5-w(now)}),
  '今度の土曜日': now => add(trim(now), {d: (w(now)<6?0:7)+6-w(now)}),

  '次の日曜日': '今度の日曜日',
  '次の月曜日': '今度の月曜日',
  '次の火曜日': '今度の火曜日',
  '次の水曜日': '今度の水曜日',
  '次の木曜日': '今度の木曜日',
  '次の金曜日': '今度の金曜日',
  '次の土曜日': '今度の土曜日',

  '前回の日曜日': now => add(trim(now), {d: w(now)?-w(now):-7}),
  '前回の月曜日': now => add(trim(now), {d: (1<w(now)?0:-7)+1-w(now)}),
  '前回の火曜日': now => add(trim(now), {d: (2<w(now)?0:-7)+2-w(now)}),
  '前回の水曜日': now => add(trim(now), {d: (3<w(now)?0:-7)+3-w(now)}),
  '前回の木曜日': now => add(trim(now), {d: (4<w(now)?0:-7)+4-w(now)}),
  '前回の金曜日': now => add(trim(now), {d: (5<w(now)?0:-7)+5-w(now)}),
  '前回の土曜日': now => add(trim(now), {d: -1-w(now)}),

  '前の日曜日': '前回の日曜日',
  '前の月曜日': '前回の月曜日',
  '前の火曜日': '前回の火曜日',
  '前の水曜日': '前回の水曜日',
  '前の木曜日': '前回の木曜日',
  '前の金曜日': '前回の金曜日',
  '前の土曜日': '前回の土曜日'
};

/**
 * 口語から日時を返します
 *
 * nowに仮の現在日時を指定することもできます
 *
 * @param  {String} value
 * @param  {Number} startMonth 既定値: CONFIG.START_MONTH  1...12
 * @param  {Number} startWeek  既定値: CONFIG.START_WEEK   日:0...土:6,
 * @param  {Date}   now        既定値: 現在の日時
 * @return {Date}   date
 */
function fromNow(value, startMonth, startWeek, now) {
  value = value.toLowerCase();
  var sm = typeof startMonth === 'number' ? startMonth : START_MONTH;
  var sw = typeof startWeek === 'number' ?  startWeek : START_WEEK;
  now = now || new Date();

  var calc = CALC[value];
  if (calc) {
    return typeof calc === 'function' ? calc(now, sm, sw) : CALC[calc](now, sm, sw);

  } else {
    value = suji(value);
    var r;
    if (r = value.match(/\d+/)) {
      var c = value.replace(r[0], 'x');
      calc = CALC[c];
      if (calc) {
        var x = +r[0];
        return typeof calc === 'function' ? calc(now, x, sm, sw) : CALC[calc](now, x, sm, sw);
      }
    }
  }
  return null;
}

// *************************** サポート関数 共通

// 時間を省略
function trim(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

// 年の取得
function y (date) {
  return date.getFullYear();
}

// 月の取得
function m (date) {
  return date.getMonth() + 1;
}

// 日の取得
function d (date) {
  return date.getDate();
}

// 曜日の取得
function w (date) {
  return date.getDay();
}

// 指定した位を加算後に置き換えする
function addReplace (date, value1, value2) {
  return replace(add(date, value1), value2);
}

// 指定した位を置き換え後に加算する
function replaceAdd (date, value1, value2) {
  return add(replace(date, value1), value2);
}

// *************************** サポート関数 個別

// 日にちの日を置き換えて、月が変わらなかった場合はその日を返し
// 変わってしまう場合はnullを返す
function enableDay(date, d) {
  var val = replace(date, {d: d});
  if (date.getFullYear() === val.getFullYear() &&
      date.getMonth() === val.getMonth()) {
    return val;
  } else {
    return null;
  }
}
