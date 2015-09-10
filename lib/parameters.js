/**
 * *********************************************************
 *               パラメータ文字列の変換定義
 *       thisから他の変換定義にアクセスすることができます
 * *********************************************************
 */
var Koyomi; // Koyomiからのrequireで設定
var CONST = require('./const');

/**
 * パラメータ文字列 (クラスでも使用可能)
 * 一つの引数Dateインスタンスをとる関数を定義します
 */
var PARAMS_CLASS = {

  //  -----  カスタマイズ  -----

  // 和暦-年区切り   平成元年一月七日
  WAREKI: function (t) {return [t, 'GGN年M月D日>>漢数字'];},

  // 和暦-日付区切り 昭和六十四年一月七日
  wareki: function (t) {return [t, 'ggn年M月D日>>漢数字'];},


  //  -----  西暦  -----

  // 西暦-4桁    2014
  YYYY: function (t) {return ('0000' + t.getFullYear()).slice(-4);},

  // 西暦 2014
  Y: function (t) {return t.getFullYear();},

  // 西暦-下2桁  14
  y: function (t) {return String(t.getFullYear()).slice(-2);},


  // -----  皇紀 -----

  // 皇紀 2675
  GGG: function (t) {return t.getFullYear() + 660;},


  // -----  和暦 (年区切り)-----

  // 和暦-年号   平成
  GG: function (t) {return Koyomi.getNengo(t).N;},

  // 和暦-年号   H
  G: function (t) {return Koyomi.getNengo(t).n;},

  // 和暦-年     1,  27
  N: function (t) {return t.getFullYear() - Koyomi.getNengo(t).y + 1;},


  // -----  和暦 (日付区切り) -----

  // 和暦-年号  平成
  gg: function (t) {return Koyomi.getNengo(t, true).N;},

  // 和暦-年号  H
  g: function (t) {return Koyomi.getNengo(t, true).n;},

  // 和暦-年    1,  24
  n: function (t) {return t.getFullYear() - Koyomi.getNengo(t, true).y + 1;},


  // ----- 上半期・下半期 -----

  // first half, second half 
  VV: function (t) {return t.getMonth() < 6 ? 'first half' : 'second half';},

  // 上半期, 下半期
  V: function (t) {return t.getMonth() < 6 ? '上半期' : '下半期';},


  // ----- 四半期 -----

  // 1, 2, 3, 4      1月始まり
  Q: function (t) {return parseInt(t.getMonth() / 3, 10) + 1;},

  // 1, 2, 3, 4      4月始まり
  Qj: function (t) {return this.Q(t) - 1 || 4;},


  // -----   月   -----

  // 英語    August
  MMM: function (t) {return CONST.MONTH[t.getMonth()];},

  // 0埋め    08,  12
  MM: function (t) {return ('0' + (t.getMonth() + 1)).slice(-2);},

  // 8,  12
  M: function (t) {return t.getMonth() + 1;},


  // -----  週番号  -----

  // 週番号 1月始まり、週の始まり月曜
  R: function (t) {return Koyomi.getWeekNumber(t);},

  // 週番号 4月始まり、週の始まり日曜
  Rj: function (t) {return Koyomi.getWeekNumber(t, '日', 4);},

  // ISO週番号
  Ri: function (t) {return Koyomi.getISOWeekNumber(t);},

  // -----  日  -----

  // 05,  25
  DD  : function (t) {return ('0' + t.getDate()).slice(-2);},

  //  5,  25
  D: function (t) {return t.getDate();},


  //  -----  経過日数・残日数(年)  -----

  // 総日数(年)
  TT: function (t) {return Koyomi.yearDays(t);},

  // 経過日数(年)
  T: function (t) {return Koyomi.passYearDays(t);},

  // 残日数(年)
  t: function (t) {return Koyomi.remainYearDays(t);},


  //  -----  経過日数・残日数(月)  -----

  // 総日数(月)
  UU: function (t) {return Koyomi.monthDays(t);},

  // 経過日数(月)
  U: function (t) {return Koyomi.passDays(t);},

  // 残日数(月)
  u: function (t) {return Koyomi.remainDays(t);},


  // -----  曜日  -----

  // Monday
  WW: function (t) {return CONST.WEEK[t.getDay()];},

  // 日:0 -> 土:6
  W: function (t) {return t.getDay();},

  // 日本語 日曜日, 月曜日,
  Wj: function (t) {return CONST.JWEEK[t.getDay()] + '曜日';},


  //  -----  祝日  -----

  // 祝日名または曜日  元日, 成人の日, 日曜日...土曜日
  FFw: function(t){ return this.FF(t) || this.Wj(t);},

  // 祝日名 元日, 成人の日,
  FF: function (t) {return Koyomi.getHolidayName(t) || '';},

  // 祝日または曜日  祝日, 日曜日...土曜日
  Fw: function(t){ return this.F(t) || this.Wj(t);},

  // 祝日
  F: function(t){ return this.FF(t) ? '祝日' : '';},


  // 祝日名  元日, 成人の日

  //  -----  時  -----

  // 24時間 0埋め    15
  HH: function (t) {return ('0' + t.getHours()).slice(-2);},

  // 24時間          3, 15
  H: function (t) {return t.getHours();},

  // 12時間 0埋め    03, 15
  hh: function (t) {return ('0' + t.getHours() % 12).slice(-2);},

  // 12時間          3
  h: function (t) {return t.getHours() % 12;},


  //  -----  分  -----

  // 0埋め  05,  38
  mm: function (t) {return ('0' + t.getMinutes()).slice(-2);},

  // 0なし   5,  38
  m: function (t) {return t.getMinutes();},


  //  -----  秒  -----

  // 0埋め  07,  29
  ss: function (t) {return ('0' + t.getSeconds()).slice(-2);},

  // 0なし   7,  29
  s: function (t) {return t.getSeconds();},


  //  -----  午前午後  -----

  // AM/PM
  AA: function (t) {return t.getHours() < 12 ? 'AM' : 'PM';},

  // am/pm
  A: function (t) {return t.getHours() < 12 ? 'am' : 'pm';},

  // 午前/午後
  Aj: function (t) {return t.getHours() < 12 ? '午前' : '午後';},


  //  ----- タイムゾーン -----

  // Z
  Z: function (t){
    var tos = t.getTimezoneOffset() * -1;
    var mm = tos % 60;
    var h = (tos - mm) / 60;
    return (h < 0 ? '-' : '+') + h + ':' + ('0' + mm).slice(-2);
  },

  //  ----- 年齢 -----

  O: function (t) {return Koyomi.getAge(t);},

  //  ----- 口語 -----

  K: function (t) {return Koyomi.kind(t);}
};

/**
 * パラメータ文字列(インスタンス限定)
 * ２つの引数をとる関数を設定します
 *    t: Dateのインスタンス
 *    k: Koyomiのインスタンス
 */
var PARAMS_INSTANCE = {

  // ----- 上半期・下半期 -----

  Vx: function (t, k) {return (t.getMonth() - k.startMonth + 13) % 12 < 6 ? '上半期' : '下半期';},


  // ----- 四半期 -----

  // 開始月に依存する四半期
  Qx: function (t, k) {
    // startMonthを仮想1月とした時何月か
    var index = (t.getMonth() - k.startMonth + 14) % 12 || 12;
    return parseInt((index - 1) / 3, 10) + 1;
  },


  //  -----   週番号   -----

  // 週番号  インスタンスの設定から計算
  Rx:   function (t, k) { return k.getWeekNumber(t); },


  //  -----  経過日数・残日数(年)  -----

  // 総日数
  TTx: function (t, k) {return k.nendoDays(t);},

  // 経過日数
  Tx: function (t, k) {return  k.passNendoDays(t);},

  // 残日数
  tx: function (t, k) {return  k.remainNendoDays(t);},


  //  -----  営業日数・営業残日数(年)  -----

  // 総営業日数(年)
  BB: function (t, k) {return k.nendoEigyobi(t);},

  // 経過営業日数(年)
  B: function (t, k) {return k.passNendoEigyobi(t);},

  // 残営業日数(年)
  b: function (t, k) {return k.remainNendoEigyobi(t);},


  //  -----  営業日数・営業残日数(月)  -----

  // 総営業日数(月)
  PP: function (t, k) {return k.monthEigyobi(t);},

  // 経過営業日数(月)
  P: function (t, k) {return k.passEigyobi(t);},

  // 残営業日数(月)
  p: function (t, k) {return k.remainEigyobi(t);},


  //  -----  営業日・休業日  -----

  // 曜日または休業日
  Ew: function (t, k) {return k.isOpened(t) ? this.Wj(t) : '休業日';},

  // 営業日または休業日
  E: function (t, k) {return k.isOpened(t) ? '営業日' : '休業日';},

  // 休業日理由 祝日, 休業日, 定休日
  e: function (t, k) {
    var opened = k.forcedOpenClose(t);
    if (opened !== null) {return opened ? '' : '休業日';}
    if (k.isHolidayClosed(t)) {return '祝日';}
    if (k.isSeasonHoliday(t)) {return '休業日';}
    if (k.isRegularHoliday(t)) {return '定休日';}
    return '';
  }
};


// ------------------------------------------------------------------    EXPORTS
module.exports = function (Koyomi_) {
  Koyomi = Koyomi_;
  // クラスパラメータをインスタンスでも使用できるようにミックスイン
  Object.keys(PARAMS_CLASS).forEach(function(x){
    PARAMS_INSTANCE[x] = PARAMS_CLASS[x];
  });
  Koyomi.parameters = PARAMS_CLASS;
  Koyomi.prototype.parameters = PARAMS_INSTANCE;
};
