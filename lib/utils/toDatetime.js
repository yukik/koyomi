/**
 * *********************************************************
 *           (ユーティリティメソッド) 日時取得
 * *********************************************************
 */
/*eslint no-irregular-whitespace:0*/

module.exports = toDatetime;

/**
 * 引数をできるだけ解釈してDateオブジェクトに変更します
 * new Date(y, m, d)では1月は0ですが、この関数では月を数字で指定する場合は1です
 *
 * 対応フォーマットは次のとおりです
 *  2015-6-1
 *  2015-06-01
 *  2015.6.1
 *  2015.06.01
 *  2015/6/1
 *  2015/06/01
 *  2015年6月1日
 *  平成27年6月1日
 *  平成二十七年六月二十三日
 *  H27.6.1
 *
 *  2015-6-1 14:20
 *  2015-6-1 14:20:30
 *  2015-6-1 14:20:30.888
 *  2015-6-1 pm2:20
 *  2015年6月1日 午後2時20分
 *  2015年6月1日 午後2時
 *
 *  14:20
 *  午後二時
 *
 *  2015
 *  2015年
 *  2015-9
 *  2015年9月
 *
 *  8-16
 *  8月16日
 *
 *  2015年6月末日
 *  6月末日
 *
 * 年・月・日がすべて設定されておらず、時間のみの指定の場合は本日とします
 * 年が不定の場合は、本年度とします
 * 月が不定の場合は、開始月とします
 * 日が不定の場合は、1日とします
 * 時が不定の場合は、0時とします
 * 分が不定の場合は、0分とします
 * 秒が不定の場合は、0秒とします
 *
 * 次の4つの方法で指定できます
 *
 *   1, Date         通常はそのまま返します。例外としてInvalid Dateはnullに変更します
 *   2. 数字         YYYYMMDDHHIISS のフォーマットとみなします
 *                   桁が足りない場合はMM以下が省略されている解釈します
 *                   西暦1000年未満の日時は数字では指定できないため、文字列にします
 *   3, 文字列       和暦、漢数字、全角数字、時刻表記に対応します
 *                   時刻のみの場合は日付の部分は本日です
 *   4, 配列         [年, 月, 日, 時, 分, 秒, ミリ秒]
 *                   月以降省略することができます
 *   5. オブジェクト 年月日時分秒ミリ秒のプロパティを持ったオブジェクトと解釈します
 *
 * 数字,文字列の方法で指定した場合は、存在する日時を指定したのかを確認します
 * 配列,オブジェクトの場合は各位が繰り上げ、繰り下げを行います
 *
 * @method toDatetime
 * @param  {Date|String|Array|Number|Object} value
 * @param  {Boolean}                         startMonth 既定値:CONFIG.START_MONTH
 * @return {Date}                            date
 */

/**
 * dependencies
 */
var CONFIG = require('../../lib/config');
var suji = require('../../lib/utils/suji');

/**
 * alias
 */
var ERAS = CONFIG.ERAS;
var TERM = CONFIG.TERM;
var ERA_MAP = ERAS.reduce((x, era, i) => {
  x[era.N] = ERAS[i];
  x[era.n] = ERAS[i];
  return x;
}, {});
var REG_ERA = new RegExp('^(' + Object.keys(ERA_MAP).join('|') + ')(元|\\d+)(\\D)');
var REG_AMPM = /(am|pm|午前|午後)(\d+)/i;
var BASE_FORMAT = /^(\d{1,4})[-\/\.](\d{1,2})[-\/\.](\d{1,2})(?:[ T](\d{1,2}):(\d{1,2})(?::(\d{1,2})(?:\.(\d{1,3}))?)?(?:(?:(?: ?GMT)?([+-]\d{1,2}):?(\d{2})?)|(Z))?)?$/;
var YYYYMM1 = /^(\d{4})[-\/\.](\d{1,2})$/;
var YYYYMM2 = /^(\d{4})年(?:(\d{1,2})月)?$/;
var YYYYMMDD = /^(\d{4})年(?:(\d{1,2})月(?:(\d{1,2}|末)日)?)?/;
var MMDD1 = /^(\d{1,2})[-\/\.](\d{1,2})?/;
var MMDD2 = /^(\d{1,2})月(\d{1,2}|末)日/;
var HHIISSsss = /[ 　]*(\d{1,2})[:時](?:(\d{1,2})[:分]?(?:(\d{1,2})(?:\.(\d{1,3}))?秒?)?)?$/;
var NOT_DIGIT = /\D/;

function toDatetime(value, startMonth) {

  var sm = startMonth || CONFIG.START_MONTH;

  // Dateオブジェクト
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;

  // 省略時はnull
  } else if (!value) {
    return null;
  }

  switch(typeof value) {
  case 'number':
    return numberToDate('' + value, sm);

  case 'string':
    return value.match(NOT_DIGIT) ? stringToDate(value, sm) : numberToDate(value, sm);

  case 'object':
    return Array.isArray(value) ? arrayToDate(value, sm) : objectToDate(value, sm);

  default:
    return null;
  }
}


// **************************************************************** 数字 => 日時
/**
 * 4-14桁の数字を日時として取り扱う
 *
 *  YYYYMMDDHHIISS
 *
 * MM以下を省略する事ができます
 *
 *  YYYY:
 *  MM  : startMonth
 *  DD  : 1日
 *  HH  : 0時
 *  II  : 0分
 *  SS  : 0秒
 *
 * @method numberToDate
 * @param  {String} value
 * @param  {NUmber} startMonth
 * @return {Date}   date
 */
function numberToDate(value, startMonth) {
  return getValidDate(
    +value.slice( 0,  4),
    +value.slice( 4,  6) || startMonth,
    +value.slice( 6,  8) || 1,
    +value.slice( 8, 10),
    +value.slice(10, 12),
    +value.slice(12, 14),
    0);
}

// ************************************************************** 文字列 => 日時
function stringToDate(value, sm) {
  value = value.trim();
  var r, y, m, d, h = 0, i = 0, s = 0, ms =0, len=0;

  if (r = value.match(BASE_FORMAT)) {
    return baseToDate(r);
  }

  // 変換
  value = replace(value);

  if (r = value.match(BASE_FORMAT)) {
    return baseToDate(r);
  }


  // 年+月のみ
  if (r = value.match(YYYYMM1) || value.match(YYYYMM2)) {
    return getValidDate(+r[1], +(r[2] || sm), 1, 0, 0, 0, 0);
  }

  var now = new Date();

  var timeskip = false;

  if (r = value.match(YYYYMMDD)) {
    y = +r[1];
    m = +(r[2] || sm);
    d = r[3] === '末' ? new Date(y, m, 0).getDate() : +(r[3] || 1);
    len = r[0].length;
    timeskip = !r[3];
  } else if (r = value.match(MMDD1) || value.match(MMDD2)) {
    m = +r[1];
    y = now.getFullYear() + (m < sm ? 1 : 0);
    d = r[2] === '末' ? new Date(y, m, 0).getDate() : +r[2];
    len = r[0].length;
  } else {
    y = now.getFullYear();
    m = now.getMonth() + 1;
    d = now.getDate();
  }

  if (r = value.match(HHIISSsss)) {
    h  = +r[1];
    i  = +(r[2] || 0);
    s  = +(r[3] || 0);
    ms = +(r[4] ? (r[4] + '00').slice(0, 3) : 0);
    len += timeskip ? 0 : r[0].length;
  }

  return value.length === len ? getValidDate(y, m, d, h, i, s, ms) : null;
}

/**
 * 推奨フォーマットの日時をDateオブジェクトにする
 * @param  {Array} r
 * @return {Date}  date
 */
function baseToDate(r) {
  var ms = r[7] ? (r[7] + '00').slice(0, 3) : 0;
  var date = getValidDate(+r[1], +r[2], +r[3], +(r[4] || 0), +(r[5] || 0), +(r[6] || 0), +ms);

  if (date) {
    // GMT+h:mm
    if (r[8]) {
      var h = +r[8];
      var m = +(r[9] || 0);
      if (-12 <= h && h <= 12 && 0 <= m && m < 60) {
        var diff = date.getTimezoneOffset() + (h * 60 + m);
        date.setTime(date.getTime() - diff * 60000);
      } else {
        date = null;
      }

    // Z
    } else if (r[10]) {
      date.setTime(date.getTime() - date.getTimezoneOffset() * 60000);
    }
  }

  return date;
}


/**
 * 漢数字、漢字、全角文字・和暦・午前・午後を半角数字に変換
 * @param  {String} value
 * @return {String} value
 */
function replace(value) {

  // 漢数字、漢字、全角文字を半角数字に変換
  value = suji(value);

  // 和暦時西暦に変換
  value = value.replace(REG_ERA, (x, g, n, af) => {
    var era = ERA_MAP[g];
    return '' + (era.y + (n === '元' ?  1 : +n) - 1) + af;
  });

  // 午前午後を24時間表記に変換
  value = value.replace(REG_AMPM, (x, ampm, n) => {
    var pm = ampm === '午後' || ampm.toLowerCase() === 'pm';
    return pm ? +n + 12 : n;
  });

  return value;
}

// **************************************************************** 配列 => 日時
/**
 * 配列を日時にします
 * 値が数字でない場合や、8つ以上の要素が存在する場合はnullを返します
 * 存在しない日時でも繰り上げ、繰り下げを行います
 * @param  {Array}  value
 * @param  {Number} sm
 * @return {Date}   date
 */
function arrayToDate(value, sm) {
  var v = [0, sm, 1, 0, 0, 0, 0];
  var err = false;
  value.forEach((x, i) => {
    if (i === 7 || typeof x !== 'number') {
      err = true;
    } else {
      v[i] = x;
    }
  });
  return err ? null : new Date(v[0], v[1] - 1, v[2], v[3], v[4], v[5], v[6]);
}

// ******************************************************** オブジェクト => 日時
/**
 * CONFIG.TERMに設定されているキーと値に数字を設定したオブジェクトを
 * 日時にします
 * 存在しない日時でも繰り上げ、繰り下げを行います
 * 存在しないtermや同じtermのキーを使用したり値が数字でない場合はnullを返します
 *
 * @param  {Object} value
 * @param  {Number} sm
 * @return {Date}   date
 */
function objectToDate(value, sm) {
  var d = Object.keys(value).reduce((x, k) => {
    var term = TERM[k.toLowerCase()];
    var v = value[k];
    if (term && !(term in x) && typeof v === 'number') {
      x[term] = v;
    } else {
      x.err = true;
    }
    return x;
  }, {});

  if (d.err) {
    return null;
  }

  var td = new Date();

  if (!('y' in d ) && !('m' in d ) && !('d' in d )) {
    d.y = td.getFullYear();
    d.m = td.getMonth() + 1;
    d.d = td.getDate();
  }

  var month = 'm' in d ? d.m : sm;
  var year  = 'y' in d ? d.y : td.getFullYear() - (month < sm ? 1 : 0);

  return new Date(
    year,
    month - 1,
    'd'  in d ? d.d  : 1,
    'h'  in d ? d.h  : 0,
    'i'  in d ? d.i  : 0,
    's'  in d ? d.s  : 0,
    'ms' in d ? d.ms : 0
  );
}

// ******************************************************** 存在する日時かを確認
/**
 * @param  {Number} y
 * @param  {Number} mh
 * @param  {Number} d
 * @param  {Number} h
 * @param  {Number} m
 * @param  {Number} s
 * @param  {Number} ms
 * @return {Date}   date
 */
function getValidDate (y, m, d, h, i, s, ms) {
  var date = new Date(y, m - 1, d, h, i, s, ms);
  if (
      y  === date.getFullYear()  &&
      m  === date.getMonth() + 1 &&
      d  === date.getDate()      &&
      h  === date.getHours()     &&
      i  === date.getMinutes()   &&
      s  === date.getSeconds()   &&
      ms === date.getMilliseconds()
  ) {
    return date;
  } else {
    return null;
  }
}