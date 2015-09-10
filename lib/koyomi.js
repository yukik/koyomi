/*
 * @license
 * Koyomi v0.3.9
 * Copyright(c) 2015 Yuki Kurata <yuki.kurata@gmail.com>
 * MIT Licensed
 */

/**
 * *********************************************************
 *               コンストラクタ・プロパティ
 * *********************************************************
 * 
 * 日本の年号、祝日、営業日に対応した日時計算クラスです
 * 
 * ※がついたメソッドはAPIで公開しないものです(仕様が今後変わる可能性あり)
 * 
 * @class Koyomi
 * @param  {Object} config
 *                   {String}           defaultFormat  既定フォーマット
 *                   {Boolean}          holidayOpened  祝日営業
 *                   {String|Function}  regularHoliday 定休日
 *                   {String|Function}  seasonHoliday  年末年始・お盆等の休業日
 *                   {Number}           startMonth     年の始まり
 *                   {String}           startWeek      週の始まり
 *                   {Boolean}          six            6週取得[カレンダデータ]
 */
function Koyomi (config) {
  var koyomi = this;
  koyomi.Koyomi = Koyomi;
  config = config || {};
  Koyomi.initialize.forEach(function(x){x(koyomi, config);});
}

Koyomi.initialize = [];

/**
 * Class
 *   [properties]
 *     {Object} parameters
 * Instance
 *   [properties]
 *     {Object} parameters
 */
require('./parameters')(Koyomi);

/**
 * Class
 *   [method]
 *     {String}  format ({Date|String} date, {String} format)
 *     {String}  convertFormatOption ({String} value, {String} options) ※
 *     {String}  convertFormatNumber ({Number|String} value, {String} Number) ※
 *     {Boolean} defineMush ({Function} Koyomi) ※
 * Instance
 *   [properties]
 *     {String} defalutFormat
 *   [method]
 *     {String}  format ({Date|String} date, {String} format)
 */
require('./format')(Koyomi);

/**
 * Class & Instance
 *   [method]
 *     {String}  kind ({Date|String} date, {Date|String} compareTo)
 */
require('./kind')(Koyomi);

/**
 * Class & Instance
 *   [method]
 *     {Date|String} add ({Date|String} date, {String} value)
 *     {Boolean}     isLeap ({Number|Date|String} year|date)
 *     {Date|String} start ({Date|String} date)
 *     {Date|String} end ({Date|String} date)
 *     {Number}      diffDays ({Date|String} from, {Date|String}) to)
 *     {Number}      diffMinutes ({Date|String} from, {Date|String}) to)
 *     {Number}      diffSeconds ({Date|String} from, {Date|String}) to)
 *     {Number}      yearDays ({Date|String} date)
 *     {Number}      monthDays({Date|String} date)
 *     {Number}      passYearDays({Date|String} date)
 *     {Number}      passDays({Date|String} date)
 *     {Number}      remainDays({Date|String} date)
 *     {Number}      remainDays({Date|String} date)
 */
require('./calcDate')(Koyomi);

/**
 * Instance
 *   [method]
 *     {Date|String} addEigyobi ({Date|String} date, {Number} days, {Boolean} include)
 *     {Date|String} toEigyobi ({Date|String}) date, {Number} days, {Boolean} include)
 *     {Number}      countEigyobi ({Date|String}) from, {Date|String}) to)
 *     {Number}      nendoEigyobi ({Date|String} date)
 *     {Number}      monthEigyobi ({Date|String} date)
 *     {Number}      passNendoEigyobi ({Date|String} date)
 *     {Number}      passEigyobi ({Date|String} date)
 *     {Number}      remainNendoEigyobi ({Date|String} date)
 *     {Number}      remainEigyobi ({Date|String} date)
 *     {Boolean}     resetEigyobiCache ({Date|String} date)  ※
 */
require('./calcEigyobi')(Koyomi);

/**
 * Instance
 *   [properties]
 *     {Object} daysInfo
 *   [method]
 *     {Object} getDayInfo ({Date|String} date, {Boolean} create) ※
 */
require('./dayInfo')(Koyomi);

/**
 * Instance
 *   [properties]
 *     {String|Function}  regularHoliday
 *     {String|Function}  seasonHoliday
 *     {String}           holidayOpened
 *   [method]
 *     {Boolean} open ({Date|String} date)
 *     {Boolean} close ({Date|String} date)
 *     {Boolean} reset ({Date|String} date)
 *     {Boolean} isOpened ({Date|String} date)
 *     {Boolean} forcedOpenClose ({Date|String} date) ※
 *     {Boolean} forcedOpen ({Date|String} date)
 *     {Boolean} forcedClose ({Date|String} date)
 *     {Boolean} isRegularHoliday ({Date|String} date)
 *     {Boolean} isSeasonHoliday ({Date|String} date)
 *     {Boolean} isHolidayClosed ({Date|String} date)
 */
require('./openClose')(Koyomi);

/**
 * Class & instance
 *   [method]
 *     {String} getHolidayName ({Date|String} date)
 *     {Object} getHolidays ({Number} year)
 */
require('./holiday')(Koyomi);

/**
 * Instance
 *   [properties]
 *     {Number} startMonth
 *   [method]
 *     {Object} getNendo ({Date|String} date)
 *     {String} formatNendo ({Date|String} date, {String} fromFormat, {String} toFormat, {Boolean} reverse)
 *     {Number} nendoDays ({Date|String} date)
 *     {Number} passNendoDays ({Date|String} date)
 *     {Number} remainNendoDays ({Date|String} date)
 *     {Object} separate ({Date|String} from, {Date|String} to) ※
 */
require('./nendo')(Koyomi);

/**
 * Instance
 *   [properties]
 *     {String}  startWeek
 *     {Boolean} six
 *   [method]
 *     {Array}  getEvents ({Date|String} date)
 *     {Number} addEvent ({Date|String} date, {String} value)
 *     {Array}  removeEvent ({Date|String} date, {Number} index)
 *     {Array}  getCalendarData ({Number|String} range, {String} startWeek, {Boolean} six)
 *     {Number} getWeekNumber ({Date|String|Number}  date/year, {Number} month, {Number} day)
 */
require('./calendar')(Koyomi);

// {Date} toDate({Date|String|Array|Number|Object} date, {Boolean} trim)
Koyomi.toDate = require('./fx/toDate');

// {Number|Array} getWeekIndex ({String|Array|Number} week)
Koyomi.getWeekIndex = require('./fx/getWeekIndex');

// {Array} getDateArray ({String} value)
Koyomi.getDateArray = require('./fx/getDateArray');

// {Number} getXDay ({Number} year, {Number} month, {Number} x, {String} week)
Koyomi.getXDay = require('./fx/getXDay');

// {Object} getNengo ({Date|String} date, {Boolean} daily, {Object} nengo)
Koyomi.getNengo = require('./fx/getNengo');

// {Number} getWeekNumber ({Date} date, {String} week, {Number} month)
Koyomi.getWeekNumber = require('./fx/getWeekNumber');

// {Number} getISOWeekNumber ({Date} date)
Koyomi.getISOWeekNumber = require('./fx/getISOWeekNumber');

// {String} suji ({Number} num, {String} type)
Koyomi.suji = require('./fx/suji');

// node export
module.exports = Koyomi;

// クライアント用
if (typeof window === 'object') {
  window.Koyomi = Koyomi;
}