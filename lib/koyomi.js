/*
 * @license
 * Koyomi v0.5.1
 * Copyright(c) 2015 Yuki Kurata <yuki.kurata@gmail.com>
 * MIT Licensed
 */

/**
 * dependencies
 */
var CONFIG                 = require('./config');
var compileFormat          = require('./utils/compileFormat');
var toStringFormat         = require('./utils/toStringFormat');
var compileRegularHoliday  = require('./utils/compileRegularHoliday');
var toStringRegularHoliday = require('./utils/toStringRegularHoliday');
var compileSeasonHoliday   = require('./utils/compileSeasonHoliday');
var toStringSeasonHoliday  = require('./utils/toStringSeasonHoliday');
var getWeekIndex           = require('./utils/getWeekIndex');


/**
 * *********************************************************
 *                    暦オブジェクト
 * *********************************************************
 *
 * 日本の年号、祝日、営業日に対応した日時計算を行うオブジェクトです
 *
 *                     *****注意*****
 * 引数の型がDATEである場合は、引数はkoyomi.toDatetime/toDateで変換されることを表します
 * そのため同関数でDateオブジェクトに変換できる全ての型をサポートします
 *
 */
var koyomi = {

  /**
   * 年度の開始月
   */
  get startMonth(){return this._startMonth;},
  set startMonth(v){
    if (v === (v | 0) && this._startMonth !== v && 1 <= v && v <= 12) {
      this.resetBizCache('year');
      this._startMonth = v;
    }
  },

  /**
   * 週の開始曜日
   */
  get startWeek(){return CONFIG.JWEEK[this._startWeek];},
  set startWeek(v){
    var w = getWeekIndex(v);
    if (typeof w === 'number') {
      this._startWeek = w;
    }
  },

  /**
   * defaultFormat
   * format関数で第二引数を省略した場合に設定される既定のフォーマット
   */
  get defaultFormat(){
    return toStringFormat(this._defaultFormat);
  },
  set defaultFormat(v){
    if (typeof v === 'string') {
      this._defaultFormat = compileFormat(v);
    }
  },

  /**
   * regularHoliday
   * 定休日の定義
   * '土,日'、'10,20'、'2火,3火'、 '土,日,2火,30'、
   * 曜日、日、第nw曜日を指定することができます。混合も可能
   * 固定値の代わりにDateを受け取りBoolean(休みかどうか)を
   * 返す関数を定義することもできます
   */
  get regularHoliday(){
    return toStringRegularHoliday(this._regularHoliday);
  },
  set regularHoliday(v){
    this.resetBizCache();
    this._regularHoliday = compileRegularHoliday(v);
  },

  /**
   * 年末年始・お盆休みの定義
   * '12/28-1/4, 8/13-8/15'のように指定します
   * 固定値の代わりにDateを受け取りBoolean(休みかどうか)を
   * 返す関数を定義することもできます
   */
  get seasonHoliday(){
    return toStringSeasonHoliday(this._seasonHoliday);
  },
  set seasonHoliday(v){
    this.resetBizCache();
    this._seasonHoliday = compileSeasonHoliday(v);
  },

  /**
   * 祝日に営業するか
   * true/falseを設定
   */
  get openOnHoliday(){return this._openOnHoliday;},
  set openOnHoliday(v){
    this.resetBizCache();
    this._openOnHoliday = v;
  },

  /**
   * 日の個別データ
   * 次のプロパティを持ちます
   *
   *  open: 営業日に設定されている場合にtrue
   *  close: 休業日に設定されている場合にtrue
   *  events: イベント(配列)
   */
  days: {},

  /**
   * 営業日計算結果をキャッシュ
   * 次のプロパティが更新された場合はすべてのキャッシュが破棄されます
   * regularHoliday, seasonHoliday, holidayOpened,
   * 次のプロパティが更新された場合は年度のキャッシュがすべて破棄されます
   * startMonth
   * 次のメソッドが実行された場合は、指定した日が含まれる月と年度のキャッシュが破棄されます
   * open, close, reset
   */
  bizCache: {}
};

// ミックスイン
var mixin = source => Object.keys(source).forEach(k => koyomi[k] = source[k]);

/**
 * {Date}    add ({DATE} date, {String} value)
 * {Boolean} isLeap ({DATE} date)
 * {Object}  getRange({DATE} date, {String} term)
 * {Date}    from ({DATE} date, {String} term)
 * {Date}    to ({DATE} date, {String} term)
 * {Number}  diff({DATE} from, {DATE} to, {String} term)
 * {Number}  days({String} yyyymm)
 * {Number}  days({DATE} date, {String} term)
 * {Number}  days({DATE} from, {DATE} to)
 * {Number}  passDays({DATE} date, {String} term)
 * {Number}  remainDays({DATE} date, {String} term)
 * {Object}  separate({DATE} from, {DATE} to)
 * {Number}  getAge({DATE} birthday, {DATE} when)
 * {String}  kind ({DATE} date, {DATE} compareTo)
 */
mixin(require('./calcDate'));

/**
 * {DATE}    addBiz ({DATE} date, {Number} days, {Boolean} include)
 * {Number}  biz ({String}) yyyymm)
 * {Number}  biz ({DATE}) from, {DATE}) to)
 * {Number}  biz ({DATE}) date, {String}) term)
 * {Number}  passBiz ({DATE} date, {String}) term)
 * {Number}  remainBiz ({DATE} date, {String}) term)
 * {Boolean} resetBizCache ({DATE} date)
 */
mixin(require('./calcBiz'));

/**
 * {Array}  getEvents ({DATE} date)
 * {Number} addEvent ({DATE} date, {String} value)
 * {Array}  removeEvent ({DATE} date, {Number} index)
 * {Array}  getCalendarData ({Number|String} range)
 */
mixin(require('./calendar'));

/**
 *  {String} format ({DATE} date, {String} format)
 *  {String} formatYear ({DATE} date, {String} format, {String} delimiter, {Boolean} reverse)
 *  {Object} compileFormat({String} format)
 */
mixin(require('./format'));

/**
 * {String} getHolidayName ({DATE} date)
 * {Object} getHolidays ({Number} year)
 */
mixin(require('./holiday'));

/**
 * {Boolean} open ({DATE} date)
 * {Boolean} close ({DATE} date)
 * {Boolean} reset ({DATE} date)
 * {Boolean} isOpen ({DATE} date)
 * {Boolean} isClose ({DATE} date)
 * {Boolean} isSetOpen ({DATE} date)
 * {Boolean} isSetClose ({DATE} date)
 * {Boolean} isRegularHoliday ({DATE} date)
 * {Boolean} isSeasonHoliday ({DATE} date)
 * {Boolean} isHolidayClose ({DATE} date)
 * {String}  closeCause({Date} date)
 */
mixin(require('./openClose'));

/**
 * {Date}   parse({String} value)
 * {Date}   toDatetime({Date|String|Array|Number|Object} date)
 * {Date}   toDate({Date|String|Array|Number|Object} date)
 * {Object} getEra ({DATE} date, {Boolean} daily)
 * {Number} getWeekNumber ({DATE} date)
 * {Number} getISOWeekNumber ({DATE} date)
 * {Date}   getXDay ({Number} x, {String} week, {DATE} date)
 */
mixin(require('./util'));

/**
 * 初期設定の暦オブジェクトを作成します
 * @return {Object} koyomi
 */
koyomi.create = function create() {
  return createKoyomi();
};

/**
 * 現在の設定を引き継いだ暦オブジェクトを新たに作成します
 * @return {Object} koyomi
 */
koyomi.clone = function clone() {
  return createKoyomi(this);
};

// ********* createObject **********

function createKoyomi(obj) {
  return Object.create(koyomi,{
    _startMonth: {
      value: obj ? obj._startMonth : CONFIG.START_MONTH,
      writable: true, enumerable: false, configurable: false
    },
    _startWeek: {
      value: obj ? obj._startWeek : getWeekIndex(CONFIG.START_WEEK),
      writable: true, enumerable: false, configurable: false
    },
    _defaultFormat:{
      value: obj ? obj._defaultFormat : compileFormat(CONFIG.FORMAT),
      writable: true, enumerable: false, configurable: false
    },
    _regularHoliday:{
      value: obj ? obj._regularHoliday : compileRegularHoliday(CONFIG.REGULAR_HOLIDAY),
      writable: true, enumerable: false, configurable: false
    },
    _seasonHoliday:{
      value: obj ? obj._seasonHoliday : compileSeasonHoliday(CONFIG.SEASON_HOLIDAY),
      writable: true, enumerable: false, configurable: false
    },
    _openOnHoliday: {
      value: obj ? obj._openOnHoliday : CONFIG.OPEN_ON_HOLIDAY,
      writable: true, enumerable: false, configurable: false
    },
    dayInfo: {
      value: obj ? JSON.parse(JSON.stringify(obj.dayInfo)) :{},
      writable: true, enumerable: false, configurable: false
    },
    bizCache: {
      value: obj ? JSON.parse(JSON.stringify(obj.bizCache)) : {},
      writable: true, enumerable: false, configurable: false
    }
  });
}

// *********  exports **********
module.exports = createKoyomi();

// クライアント用
if (typeof window === 'object') {
  window.koyomi = module.exports;
}