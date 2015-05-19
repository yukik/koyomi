/**
 * *********************************************************
 *                    フォーマット
 * *********************************************************
 */
module.exports = function (Koyomi) {

  // 定数設定
  defineMush(Koyomi);

  // 初期化
  Koyomi.initialize.push(function(koyomi, config){
    // 既定のフォーマット
    Object.defineProperty(koyomi, '_defaultFormat', {value: null, writable:true});
    Object.defineProperty(koyomi, '_defaultFormatInput', {value: null, writable:true});
    koyomi.defaultFormat = config.defaultFormat || DEFAULT_FORMAT;
  });

  /**
   * formatメソッドの既定のフォーマット
   * @property {String} defaultFormat
   */
  Object.defineProperty(Koyomi.prototype, 'defaultFormat', {
    enumarable: true,
    get: function () {return this._defaultFormatInput;},
    set: function (value) {
      this._defaultFormatInput = value;
      value = value || DEFAULT_FORMAT;
      if (!~value.indexOf('{')) {
        value = value.replace(MUSH_INSTANCE, function (x, p, n) {
          return '{' + p + (n ? '>' + n : '' ) + '}';
        });
      }
      this._defaultFormat = value;
    }
  });

  Koyomi.format = classFormat;
  Koyomi.prototype.format = instanceFormat;
  Koyomi.convertFormatOption = convertFormatOption;
  Koyomi.defineMush = defineMush;
};

/**
 * dependencies
 */
// {}付きパラメータ文字列を検出する正規表現
var REG_PLACE = /\{([a-z]+)(?:>(\d))?\}/ig;
var DEFAULT_FORMAT = require('./config').FORMAT;
var toDate = require('./fx/toDate');
var suji = require('./fx/suji');

var PARAMS_CLASS;      // パラメータ文字列の定義（クラス）
var PARAMS_INSTANCE;   // パラメータ文字列の定義（インスタンス）
var MUSH_CLASS;        // {}付きにする正規表現（クラス）
var MUSH_INSTANCE;     // {}付きにする正規表現（インスタンス）
          // ※いずれもKoyomiからrequire時に設定

/**
 * (クラスメソッド)
 * フォーマット
 * 日時をパラメータ文字列にそって整形します
 *  フォーマットにオプションを追加する際は>>の後に追加するオプション名を記載します
 *        'Y/MM/DD>>全角'
 * 対応するオプションはconvertFormatOptionで確認
 * @method format
 * @param  {Date|String} date        日時
 * @param  {String}      format      フォーマット 既定値 DEFAULT.FORMAT
 * @return {String}      formatted
 */
function classFormat (date, format) {
  var Koyomi = this;
  date = toDate(date);
  if (!date) {
    return '';
  }

  // カッコ付き変換(0埋め,序数,切り捨てオプション分離)
  format = format || DEFAULT_FORMAT;
  if (!~format.indexOf('{')) {
    format = format.replace(MUSH_CLASS, function (x, p, n) {
      return '{' + p + (n ? '>' + n : '' ) + '}';
    });
  }

  // 短縮,元年,漢数字,漢字,全角オプション分離
  var options = null;
  var oIdx = format.indexOf('>>');
  if (0 < oIdx) {
    options = format.substring(oIdx);
    format = format.substring(0, oIdx);
  }

  // 変換
  var parameters = Koyomi.parameters;
  var value = format.replace(REG_PLACE, function (x, param, num){
    if (param in parameters) {
      var r = parameters[param](date);
      if (Array.isArray(r)) {
        r = classFormat.call(Koyomi, r[0], r[1]);
      }
      return num ? convertFormatNumber(r, num * 1) : r;
    } else {
      return x;
    }
  });

  return options ? convertFormatOption(value, options) : value;
}

/**
 * (インスタンスメソッド)
 * フォーマット
 * 日時をパラメータ文字列にそって整形します
 *  フォーマットにオプションを追加する際は>>の後に追加するオプション名を記載します
 *        'Y/MM/DD>>全角'
 * 対応するオプションはconvertFormatOptionで確認
 * @method format
 * @param  {Date|String} date       日時
 * @param  {String}      format     フォーマット     省略時 koyomi.defaultFormat
 * @return {String}      formatted
 */
function instanceFormat (date, format) {
  var koyomi = this;
  date = toDate(date);
  if (!date) {
    return '';
  }

  // カッコ付き変換(0埋め,序数,切り捨てオプション分離)
  format = format || this._defaultFormat;
  if (!~format.indexOf('{')) {
    format = format.replace(MUSH_INSTANCE, function (x, p, n) {
      return '{' + p + (n ? '>' + n : '' ) + '}';
    });
  }

  // 短縮,元年,漢数字,漢字,全角オプション分離
  var options = null;
  var oIdx = format.indexOf('>>');
  if (0 < oIdx) {
    options = format.substring(oIdx);
    format = format.substring(0, oIdx);
  }

  // 変換
  var value = format.replace(REG_PLACE, function (x, param, num){
    if (param in PARAMS_INSTANCE) {
      var r = PARAMS_INSTANCE[param](date, koyomi);
      if (Array.isArray(r)) {
        r = koyomi.format(r[0], r[1]);
      }
      return num ? convertFormatNumber(r, num * 1) : r;
    } else {
      return x;
    }
  });

  return options ? convertFormatOption(value, options) : value;
}

/**
 * 0埋め、序数、切り捨てを処理する
 * @method convertFormatNumber
 * @param  {Number|String} value
 * @param  {Number}        num
 * @return {String}        value
 */
function convertFormatNumber (value, num) {
  // 数値
  if (typeof value === 'number') {
    // 序数
    if (num === 0) {
      return suji(value, '序数');
    }
    // 0埋め
    value = value + '';
    return value.length < num ? ('000000000' + value).slice(-num) : value;
  }
  // 文字列の切り捨て
  return num && num < value.length ? value.substring(0, num) : value;
}

/**
 * オプションを処理する
 * @method convertFormatOption
 * @param  {String} value
 * @param  {String} options オプション
 *                           短縮  : 0分・0秒を省略
 *                           元年  : 1年の表示のみ元年
 *                           漢数字: 元年 & 位あり漢字表記
 *                           漢字  : 元年 & 位なし漢字表記
 *                           全角  : 全角数字に変換
 * @return {String} value
 */
function convertFormatOption (value, options) {

  // 8時0分0秒 -> 8時
  if (~options.indexOf('短縮')) {
    value = value.replace(/(\D)0秒/, function (m, D) {return D;});
    if (!~value.indexOf('秒')) {
      value = value.replace(/(\D)0分/, function (m, D) {return D;});
    }
  }

  // 平成1年 -> 平成元年
  if (~options.indexOf('元年')) {
    value = value.replace(/(\D)1年/, function (m, D) {return D + '元年';});
  }

  // 以下は排他
  // 2000年12月23日 -> 二千年十二月二十三日
  if (~options.indexOf('漢数字')) {
    value = value.replace(/(\D)1年/, function (m, D) {return D + '元年';});
    value = value.replace(/\d+/g, function (m) {return suji(m * 1, '漢数字');});
  
  // 2000年12月23日 -> 二〇〇〇年一二月二三日
  } else if (~options.indexOf('漢字')) {
    value = value.replace(/(\D)1年/, function (m, D) {return D + '元年';});
    value = value.replace(/\d+/g, function (m) {return suji(m * 1, '漢字');});
    
  // 2000年12月23日 -> ２０００年１２月２３日
  } else if (~options.indexOf('全角')) {
    value = value.replace(/\d+/g, function (m) {return suji(m * 1, '全角');});
    
  }

  return value;
}

/**
 * パラメータ文字列検出用の定数を更新
 * @method defineMush
 * @param  {Object}   Koyomi
 * @return {Boolean}
 */
function defineMush (Koyomi) {
  // 定数設定
  PARAMS_CLASS = Koyomi.parameters;
  PARAMS_INSTANCE = Koyomi.prototype.parameters;
  MUSH_CLASS = new RegExp('(' + Object.keys(PARAMS_CLASS)
                                .sort(function(x, y){return y.length - x.length;})
                                .join('|') + ')(?:>(\\d))?', 'g');
  MUSH_INSTANCE = new RegExp('(' + Object.keys(PARAMS_INSTANCE)
                                .sort(function(x, y){return y.length - x.length;})
                                .join('|') + ')(?:>(\\d))?', 'g');
  return true;
}

