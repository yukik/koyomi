/**
 * *********************************************************
 *                    フォーマット
 * *********************************************************
 */

/**
 * dependencies
 */
var compile       = require('./utils/compileFormat');
var formatArray   = require('./utils/formatArray');
var formatOptions = require('./utils/formatOptions');
var PARAMS        = require('./parameters');

/**
 * alias
 */
var DEFAULT_FY_FORMAT = 'Y/M - Y/M';
var DEFAULT_DELIMITER = '-';


module.exports = {
  format       : formatDate,
  formatYear   : formatYear,
  compileFormat: compile,
  parameters   : Object.keys(PARAMS)
};

/**
 * フォーマット
 * 日時をパラメータ文字列にそって整形します
 *
 *  YYYY-MM-DD -> 2015-05-18
 *
 * @method format
 * @param  {DATE}   date       日時
 * @param  {String} format     フォーマット 省略時 koyomi.defaultFormat
 * @return {String} formatted
 */
function formatDate (date, format) {
  date = this.toDatetime(date);
  if (!date) {
    return '';
  }
  var compiled = format ? compile(format) : this._defaultFormat;
  var value = formatArray(this, date, compiled.v).join('');

  // 全体オプションを適用して返す
  return compiled.o ? formatOptions(value, compiled.o) : value;
}

/**
 * 年度を表す表記を返します
 * @method formatYear
 * @param  {DATE}      date       含まれる日時           既定値 new Date()
 * @param  {String}    format     フォーマット           既定値 'Y/M - Y/M'
 * @param  {String}    delimiter  開始と終了を分ける文字 既定値 '-'
 * @param  {Boolean}   reverse    結合順を逆にする       既定値 false
 * @return {String}    formatted
 */
function formatYear (date, format, delimiter, reverse) {
  var range = this.getRange(date || new Date(), 'year');
  format = format || DEFAULT_FY_FORMAT;
  delimiter = delimiter || DEFAULT_DELIMITER;

  var opIdx = format.indexOf('>>');
  var options;
  if (0 < opIdx) {
    options = format.slice(opIdx);
    format = format.slice(0, opIdx);
  } else {
    options = '';
  }
  var splited = delimiter ? format.split(delimiter) : [format];
  if (splited.length === 1) {
    return this.format(reverse ? range.to : range.from, format + options);
  } else if (reverse) {
    return this.format(range.to  , splited[0] + options) + delimiter +
           this.format(range.from, splited[1] + options);
  } else {
    return this.format(range.from, splited[0] + options) + delimiter +
           this.format(range.to  , splited[1] + options);
  }
}