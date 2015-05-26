/**
 * *********************************************************
 *                 (補助関数) 日時取得
 * *********************************************************
 * できる限り日時を判別しDateオブジェクトを作成する関数
 */
var NENGO = require('../config').NENGO;
var suji = require('./suji');
var getTani = require('./getTani');

// 推奨フォーマット
var FORMAT = /^(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})(?: (\d{1,2}):(\d{1,2})(?::(\d{1,2}))?)?$/;


//年号一覧    ['平成', 'H', '昭和', 'S',...]    和暦西暦変換で使用する
var NENGO_NAMES = NENGO.reduce(function(x, nengo) {
  if (nengo.n) {
    x.push(nengo.N);
    x.push(nengo.n);
  }
  return x;
}, []);

// 和暦西暦変換用正規表現
var REG_NENGO = new RegExp('^(' + NENGO_NAMES.join('|') + ')(元|\\d+)(\\D)');


/** 
 * 次の4つの方法で指定できる
 *   1, Dateオブジェクト
 *   2, 文字列       和暦、漢数字、全角数字、時刻のみ対応
 *                   時刻のみの場合は日付の部分は本日です
 *   3, 配列         [年, 月, 日, 時, 分, 秒, ミリ秒]
 *                   月以降省略した場合は、その部で最初の数値が適用されます
 *                   1月は1です
 *   4. 数字         Y>4MMDDHHmmss のフォーマットとみなす
 *                   桁が足りない場合はMM以下が省略されているとみなす
 *                   西暦1000年未満の日時は数字では指定できません
 *   5. オブジェクト 年月日時分秒のプロパティを持つ
 *   
 * 文字列からDateに対応
 * 和暦から西暦にも対応
 * @method toDate
 * @param  {Date|String|Array|Number|Object} value
 * @param  {Boolean}                         trim    時以下を切り捨てる。
 *                                                   falseでも指定すると必ず複製を返す
 *                                                   指定しないとできるだけ参照を返す
 * @return {Date}                            date
 */
function toDate(value, trim) {

  // 省略時はnull
  if (!value) {
    return null;

  // Dateオブジェクト
  } else if (value instanceof Date) {
    if (trim === false) {
      value = new Date(value.getTime());
    }

  // 文字列
  } else if (typeof value === 'string') {
    // 推奨フォーマット
    var m = value.match(FORMAT);
    if (m) {
      return new Date(
        m[1] * 1,
        m[2] * 1 - 1,
        m[3] * 1,
        trim ? 0 : (m[4] || 0) * 1,
        trim ? 0 : (m[5] || 0) * 1,
        trim ? 0 : (m[6] || 0) * 1
      );
    } else {
      value = stringToDate(value);
    }

  // 配列
  } else if (Array.isArray(value)) {
    var v = [0, 1, 1, 0, 0, 0, 0];
    value.forEach(function(x, i){v[i] = x;});
    value = new Date(v[0], v[1] - 1, v[2], v[3], v[4], v[5], v[6]);

  // 数字
  } else if (typeof value === 'number') {
    value = numberToDate(value);

  // オブジェクト
  } else if (typeof value === 'object') {
    value = objectToDate(value);

  // その他
  } else {
    return null;
  }

  // Invalid Date Check
  if (Number.isNaN(value.getTime())) {
    return null;
  }

  return trim ? trimDate(value) : value;
}

/**
 * 文字列 -> 日付
 * @method stringToDate
 * @param  {String}     value
 * @return {Date}       date
 */
function stringToDate (value) {
  value = value.trim();
  if (!value.length) {
    return null;
  }

  // 漢数字、漢字、全角文字を半角数字に変換
  value = suji(value.trim());

  // 和暦時西暦に変換
  value = value.replace(REG_NENGO, function(x, g, n, af) {
    var idx = parseInt(NENGO_NAMES.indexOf(g) / 2, 10);
    return '' + (NENGO[idx].y + (n === '元' ?  1 : n * 1) - 1) + af;
  });

  // 最初に現れる数字以外の文字により日時か時間かを判別
  var first = value.match(/\D+/);

  // 20150630123520 のように年月日時分秒がすべてくっついている場合
  if (!first) {
    return numberToDate(value);
  }

  var isTime = false;
  var pm = false;

  first = first[0].trim();
  if (~['am', 'AM', '午前', ':', '：', '時'].indexOf(first)) {
    isTime = true;
  } else if (~['pm', 'PM', '午後'].indexOf(first)) {
    isTime = true;
    pm = true;
  } else if (/pm|PM|午後/.test(value)) {
    pm = true;
  }

  // 年月日時分秒
  var data;

  if (isTime) {
    var t = new Date();
    data = [t.getFullYear(), t.getMonth() + 1, t.getDate(), 0, 0, 0];
  } else {
    data = [0, 1, 1, 0, 0, 0];
  }

  value.split(/\D/).filter(function(x){return x;}).forEach(function(x, i){
    if (isTime) {
      i += 3;
    }
    if (pm && i === 3) {
      data[3] = x * 1 + 12;
    } else {
      data[i] = x * 1;
    }
  });
  return new Date(data[0], data[1] - 1, data[2], data[3], data[4], data[5]);
}

/**
 * 時の部分を切り捨てる
 * @method trim
 * @param  {Date} date
 * @return {Date} 
 */
function trimDate (date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/**
 * 4-14桁の数字を日時として取り扱う
 *
 *    YMMDDHHmmss
 *
 * 年以外既定の値が設定される
 *
 *  MM: 1月
 *  DD: 1日
 *  HH: 0時
 *  mm: 0分
 *  ss: 0秒
 * 
 * @method numberToDate
 * @param  {Number}     num
 * @return {Date}       date
 */
function numberToDate (num) {
  num += '';
  // 年以外が省略時も動作する
  return new Date(
    num.slice( 0,  4) * 1,
    (num.slice(4,  6) * 1 || 1) - 1,
    num.slice( 6,  8) * 1 || 1,
    num.slice( 8, 10) * 1,
    num.slice(10, 12) * 1,
    num.slice(12, 14) * 1
  );
}

/**
 * オブジェクトから日時
 * @method objectToDate
 * @param  {Object}     value
 * @return {Date}
 */
function objectToDate (value) {
  var d = Object.keys(value).reduce(function(x, k) {
    var tani = getTani(k);
    if (!(tani in x)) {
      x[tani] = value[k];
    }
    return x;
  }, {});

  var td = new Date();

  if (!('y' in d ) && !('m' in d ) && !('d' in d )) {
    d.y = td.getFullYear();
    d.m = td.getMonth() + 1;
    d.d = td.getDate();
  }

  return new Date(
    'y' in d ? d.y : td.getFullYear(),
    'm' in d ? d.m - 1 : 0,
    'd' in d ? d.d : 1,
    'h' in d ? d.h : 0,
    'i' in d ? d.i : 0,
    's' in d ? d.s : 0,
    0
  );
}

module.exports = toDate;

