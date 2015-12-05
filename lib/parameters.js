/**
 * dependencies
 */
var CONFIG = require('./config');

/**
 * *********************************************************
 *               パラメータ文字列の変換定義
 * *********************************************************
 *
 *  ２つの引数をとる関数を設定します
 *    t: Dateのインスタンス
 *    k: koyomiオブジェクト
 *  戻り値が、数値や文字列の場合はその値がパラメーター文字列と置換されます
 *
 *  新たなパラメータ文字列の組み合わせを指定してパラメータ文字列を作成することも
 *  できます。その場合は関数ではなく文字列を指定してください
 *  参考: WAREKI, wareki
 *
 *  また引数の日時をなんらかの計算した後に、変換を行う場合は
 *  配列を戻り値にする関数を設定します
 *  配列では、最初の要素にDateのインスタンスを、
 *  ２番目の要素に新しいパラメータ文字列の組み合わせを指定します
 *  参考: BIZ3
 *
 */
var PARAMS;

module.exports = PARAMS = {

  //  -----  カスタマイズ  -----

  // 和暦-年区切り   平成元年一月七日
  WAREKI: 'GGN年M月D日>>漢数字',

  // 和暦-日付区切り 昭和六十四年一月七日
  wareki: 'ggn年M月D日>>漢数字',

  // ISO 8601 拡張形式
  ISO: '{YYYY}-{MM}-{DD}T{HH}:{II}:{SS}{Z}',

  // 3営業日後の日付を返す
  BIZ3: (t, k) => [k.addBiz(t, 3), 'YYYY-MM-DD'],

  //  -----  西暦  -----

  // 西暦-4桁    2014
  YYYY: t => ('0000' + t.getFullYear()).slice(-4),

  // 西暦 2014
  Y: t => t.getFullYear(),

  // 西暦-下2桁  14
  y: t => ('' + t.getFullYear()).slice(-2),


  // -----  皇紀 -----

  // 皇紀 2675
  GGG: t => t.getFullYear() + 660,


  // -----  和暦 (年区切り)-----

  // 和暦-年号   平成
  GG: (t, k) => k.getEra(t).N,

  // 和暦-年号   H
  G: (t, k) => k.getEra(t).n,

  // 和暦-年     1,  27
  N: (t, k) => t.getFullYear() - k.getEra(t).y + 1,


  // -----  和暦 (日付区切り) -----

  // 和暦-年号  平成
  gg: (t, k) => k.getEra(t, true).N,

  // 和暦-年号  H
  g: (t, k) => k.getEra(t, true).n,

  // 和暦-年    1,  24
  n: (t, k) => t.getFullYear() - k.getEra(t, true).y + 1,


  // ----- 上半期・下半期 -----

  // 上半期, 下半期
  V: (t, k) => (t.getMonth() - k.startMonth + 13) % 12 < 6 ? '上半期' : '下半期',

  // ----- 四半期 -----

  // 1, 2, 3, 4      開始月に依存する四半期
  Q: (t, k) => {
    // startMonthを仮想1月とした時何月か
    var index = (t.getMonth() - k.startMonth + 14) % 12 || 12;
    return parseInt((index - 1) / 3, 10) + 1;
  },


  // -----   月   -----

  // 英語    August
  MMM: t => CONFIG.MONTH[t.getMonth()],

  // 0埋め    08,  12
  MM: t => ('0' + (t.getMonth() + 1)).slice(-2),

  // 8,  12
  M: t => t.getMonth() + 1,


  // -----  週番号  -----

  // 週番号
  R: (t, k) => k.getWeekNumber(t),

  // ISO週番号
  r: (t, k) => k.getISOWeekNumber(t),


  // -----  日  -----

  // 05,  25
  DD: t => ('0' + t.getDate()).slice(-2),

  //  5,  25
  D: t => t.getDate(),


  //  -----  総日数・経過日数・残日数(年)  -----

  // 総日数(年)
  CCC: (t, k) => k.days(t, 'year'),

  // 経過日数(年)
  CC: (t, k) => k.passDays(t, 'year'),

  // 残日数(年)
  C: (t, k) => k.remainDays(t, 'year'),


  //  -----  総日数・経過日数・残日数(月)  -----

  // 総日数(月)
  ccc: (t, k) => k.days(t, 'month'),

  // 経過日数(月)
  cc: (t, k) => k.passDays(t, 'month'),

  // 残日数(月)
  c: (t, k) => k.remainDays(t, 'month'),


  //  -----  営業日数・営業残日数(年)  -----

  // 総営業日数(年)
  BBB: (t, k) => k.biz(t, 'year'),

  // 経過営業日数(年)
  BB: (t, k) => k.passBiz(t, 'year'),

  // 残営業日数(年)
  B: (t, k) => k.remainBiz(t, 'year'),


  //  -----  営業日数・営業残日数(月)  -----

  // 総営業日数(月)
  bbb: (t, k) => k.biz(t, 'month'),

  // 経過営業日数(月)
  bb: (t, k) => k.passBiz(t, 'month'),

  // 残営業日数(月)
  b: (t, k) => k.remainBiz(t, 'month'),


  // -----  曜日  -----

  // Monday
  WW: t => CONFIG.WEEK[t.getDay()],

  // 日本語 日曜日, 月曜日,
  W: t => CONFIG.JWEEK[t.getDay()] + '曜日',

  // 日:0 -> 土:6
  w: t => t.getDay(),


  //  -----  祝日  -----

  // 祝日名または曜日  元日, 成人の日, 日曜日...土曜日
  FF: (t, k) => k.getHolidayName(t) || PARAMS.W(t, k),

  // 祝日名            元日, 成人の日,
  F : (t, k) => k.getHolidayName(t) || '',

  // 祝日または曜日    祝日, 日曜日...土曜日
  ff: (t, k) => PARAMS.f(t, k) || PARAMS.W(t, k),

  // 祝日
  f : (t, k) => k.getHolidayName(t) ? '祝日' : '',


  //  -----  営業日・休業日  -----

  // 曜日または休業日
  EE: (t, k) => k.isOpen(t) ? PARAMS.W(t) : '休業日',

  // 営業日または休業日
  E: (t, k) => k.isOpen(t) ? '営業日' : '休業日',

  // 休業日理由 特別休業, 祝日名, 休業日, 定休日
  e: (t, k) => k.closeCause(t),


  //  -----  時  -----

  // 24時間 0埋め    15
  HH: t => ('0' + t.getHours()).slice(-2),

  // 24時間          3, 15
  H: t => t.getHours(),

  // 12時間 0埋め    03, 15
  hh: t => ('0' + t.getHours() % 12).slice(-2),

  // 12時間          3
  h: t => t.getHours() % 12,


  //  -----  分  -----

  // 0埋め  05,  38
  II: t => ('0' + t.getMinutes()).slice(-2),

  // 0なし   5,  38
  I: t => t.getMinutes(),


  //  -----  秒  -----

  // 0埋め  07,  29
  SS: t => ('0' + t.getSeconds()).slice(-2),

  // 0なし   7,  29
  S: t => t.getSeconds(),


  // -----  ミリ秒  -----

  // 0埋め 001, 042, 567, 999
  sss: t => ('00' + t.getMilliseconds()).slice(-3),

  // 0なし   1,  42, 567, 999
  s: t => t.getMilliseconds(),

  //  -----  午前午後  -----

  // AM/PM
  AA: t => t.getHours() < 12 ? 'AM' : 'PM',

  // am/pm
  aa: t => t.getHours() < 12 ? 'am' : 'pm',

  // 午前/午後
  A: t => t.getHours() < 12 ? '午前' : '午後',


  //  ----- タイムゾーン -----

  // Z
  Z: t => {
    var tos = t.getTimezoneOffset() * -1;
    var mm = tos % 60;
    var h = (tos - mm) / 60;
    return (h < 0 ? '-' : '+') + h + ':' + ('0' + mm).slice(-2);
  },

  //  ----- 年齢 -----

  O: (t, k) => k.getAge(t),

  //  ----- 口語 -----

  K: (t, k) => k.kind(t)
};