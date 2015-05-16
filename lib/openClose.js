/**
 * *********************************************************
 *                    営業・休業判定
 * *********************************************************
 */
module.exports = function (Koyomi) {

  // 初期化時
  Koyomi.initialize.push(function (koyomi, config) {

    // 定休日
    Object.defineProperty(koyomi, '_regularHoliday', {value: null, writable:true});
    Object.defineProperty(koyomi, '_regularHolidayInput', {value: null, writable:true});
    koyomi.regularHoliday = config.regularHoliday || CONFIG.REGULAR_HOLIDAY;

    // 年末年始・お盆等の休業日
    Object.defineProperty(koyomi, '_seasonHoliday', {value: null, writable:true});
    Object.defineProperty(koyomi, '_seasonHolidayInput', {value: null, writable:true});
    koyomi.seasonHoliday = config.seasonHoliday || CONFIG.SEASON_HOLIDAY;

    // 祝日営業
    Object.defineProperty(koyomi, '_holidayOpened', {value: null, writable:true});
    this.holidayOpened = config.holidayOpened || CONFIG.HOLIDAY_OPENED;
  });

  /**
   * 定休日の定義
   * '土,日'、'10,20'、'2火,3火'、 '土,日,2火,30'、
   * 曜日、日、第nw曜日を指定することができます。混合も可能
   * 固定値の代わりにDateを受け取りBoolean(休みかどうか)を
   * 返す関数を定義することもできます
   * 内部で使用されるの_regularHolidayです
   * @property {String|Function} regularHoliday
   */
  Object.defineProperty(Koyomi.prototype, 'regularHoliday', {
    enumarable: true,
    get: function () { return this._regularHolidayInput;},
    set: function (value) {
      this._regularHolidayInput = value;
      this.resetEigyobiCache();
      if (typeof value === 'function') {
        this._regularHoliday = value.bind(this);
      } else if (typeof value === 'string') {
        this._regularHoliday = stringToRegularHolidays(value);
      } else if (typeof value === 'number' &&  1 <= value && value <= 31) {
        this._regularHoliday = {day: [value]};
      } else {
        this._regularHoliday = {};
      }
    }
  });

  /**
   * 年末年始・お盆休みの定義
   * 固定値の代わりにDateを受け取りBoolean(休みかどうか)を
   * 返す関数を定義することもできます
   * @property {String|Function} seasonHoliday
   */
  Object.defineProperty(Koyomi.prototype, 'seasonHoliday', {
    enumarable: true,
    get: function () { return this._seasonHolidayInput; },
    set: function (value) {
      this._seasonHolidayInput = value;
      this.resetEigyobiCache();
      if (typeof value === 'function') {
        this._seasonHoliday = value.bind(this);
      } else if (typeof value === 'string') {
        value = getDateArray(value);
        this._seasonHoliday = value.length ? value : null;
      } else {
        this._seasonHoliday = null;
      }
    }
  });

  /**
   * 祝日を営業日にするか
   * @property {Boolean} holidayOpened
   */
  Object.defineProperty(Koyomi.prototype, 'holidayOpened', {
    enumarable: true,
    get: function () { return this._holidayOpened; },
    set: function (value) {
      this._holidayOpened = value;
      this.resetEigyobiCache();
    }
  });

  Koyomi.prototype.open             = open;
  Koyomi.prototype.close            = close;
  Koyomi.prototype.reset            = reset;
  Koyomi.prototype.isOpened         = isOpened;
  Koyomi.prototype.forcedOpenClose  = forcedOpenClose;
  Koyomi.prototype.forcedOpen       = forcedOpen;
  Koyomi.prototype.forcedClose      = forcedClose;
  Koyomi.prototype.isRegularHoliday = isRegularHoliday;
  Koyomi.prototype.isSeasonHoliday  = isSeasonHoliday;
  Koyomi.prototype.isHolidayClosed  = isHolidayClosed;
};

/**
 * dependencies
 */
var CONFIG       = require('./config');
var toDate       = require('./fx/toDate');
var getWeekIndex = require('./fx/getWeekIndex');
var getDateArray = require('./fx/getDateArray');

/**
 * 指定日を営業日に強制します
 * @method open
 * @param  {Date|String} date
 * @return {Boolean}     success
 */
function open (date) {
  date = toDate(date);
  var info = this.getDayInfo(date, true);
  if (!info) {
    return false;
  }
  info.opened = true;
  this.resetEigyobiCache(date);
  return true;
}

/**
 * 指定日を休業日に強制します
 * @method close
 * @param  {Date|String} date
 * @return {Boolean}     success
 */
function close (date) {
  date = toDate(date);
  var info = this.getDayInfo(date, true);
  if (!info) {
    return false;
  }
  info.opened = false;
  this.resetEigyobiCache(date);
  return true;
}

/**
 * 指定日の営業・休業を暦通りにリセットします
 * @method reset
 * @param  {Date|String} date
 * @return {Boolean}     success
 */
function reset (date) {
  date = toDate(date);
  var info = this.getDayInfo(date);
  if (!info) {
    return false;
  }
  delete info.opened;
  this.resetEigyobiCache(date);
  return true;
}

/**
 * 営業日判定
 *
 *  営業日のチェックは次の３つを確認します
 *
 *    1, 年末年始・お盆の休み
 *    2, 定休日（土日休み、5・15・25日休み、第2・3火曜休み等）
 *    3, 祝日 (holidayOpend===false時のみ)
 * 
 * @method isOpened
 * @param  {Date}    date
 * @return {Boolean} opened
 */
function isOpened (date) {
  date = toDate(date);

  // 強制設定
  var opened = this.forcedOpenClose(date);
  if (opened !== null) {
    return opened;
  }

  // 定休日判定
  if (this.isRegularHoliday(date)) {
    return false;
  }

  // 年末年始・お盆等の休みの判定
  if (this.isSeasonHoliday(date)) {
    return false;
  }

  // 祝日判定
  if (this.isHolidayClosed(date)) {
    return false;
  }

  return true;
}

/**
 * 営業日・休業日が強制的に設定されているか
 * @method forcedOpenClose
 * @param  {Date|String}    date
 * @return {Boolean}        result
 *                             されていない null
 *                             営業日設定   true
 *                             休業日設定   false
 */
function forcedOpenClose (date) {
  var info = this.getDayInfo(date);
  if (!info || !('opened' in info)) {
    return null;
  }
  return info.opened;
}

/**
 * openメソッドにより強制的に営業日に設定されているかどうかの判定
 * @method forcedOpen
 * @param  {Date|String}   date
 * @return {Boolean}       isOpened
 */
function forcedOpen (date) {
  var info = this.getDayInfo(date);
  return info && info.opened;
}

/**
 * closeメソッドにより強制的に休業日に設定されているかどうかの判定
 * @method forcedClose
 * @param  {Date|String}   date
 * @return {Boolean}       isClosed
 */
function forcedClose (date) {
  var info = this.getDayInfo(date);
  return info && info.opened === false;
}

/**
 * 定休日判定
 * @method isRegularHoliday
 * @param  {Date|String}         date
 * @return {Boolean}        closed
 */
function isRegularHoliday (date) {
  date = toDate(date);
  if (!date) {
    return null;
  }

  var regular = this._regularHoliday;

  if (!regular) {
    return false;
  }

  if (typeof regular === 'object') {

    // 週
    var week = regular.week;
    if (week && ~week.indexOf(date.getDay())) {
      return true;
    }

    // 日
    var day = regular.day;
    if (day && ~day.indexOf(date.getDate())) {
      return true;
    }

    // 第ny曜日
    var xweek = regular.xweek;
    if (xweek && xweek.some(function(x) {
      return  date.getDay() === x[1] &&
              parseInt((date.getDate() + 6) / 7, 10)  === x[0];
    })) {
      return true;
    }

    return false;
  }

  if (typeof regular === 'function') {
    return regular(date);
  }

  return false;
}

/**
 * 年末年始・お盆の休日判定
 * @method isSeasonHoliday
 * @param  {Date|String}        date
 * @return {Boolean}            closed
 */
function isSeasonHoliday (date) {
  date = toDate(date);

  var season = this._seasonHoliday;

  if (!season) {
    return false;
  }

  if (Array.isArray(season)) {
    var key = (date.getMonth() + 1) * 100 + date.getDate() * 1;
    return season.indexOf(key) !== -1;
  }

  if (typeof season === 'function') {
    return season(date);
  }

  return false;
}

/**
 * 祝日休み判定
 * @method isHolidayClosed
 * @param  {Date|String}   date
 * @return {Boolean}       closed
 */
function isHolidayClosed (date) {
  if (this.holidayOpened) {
    return false;
  }
  return this.Koyomi.getHolidayName(date) !== null;
}

/**
 * 定休日オブジェクトの作成
 * '土, 日, 20, 30, 2火, 3火' ->
 *   {
 *     week: [6, 0],
 *     day: [20, 30],
 *     xweek: [[2, 2], [3, 2]]
 *   }
 * @method stringToRegularHolidays
 * @param  {String}                value
 * @return {Object}                RegularHolidays
 */
function stringToRegularHolidays (value) {
  var regular = {};
  value = value.split(',').map(function(x){return x.trim();});

  // 曜日
  var week = getWeekIndex(value);
  if (week) {
    regular.week = week;
  }

  // 日
  var REG_NUM = /^\d{1,2}$/;
  var day = value.map(function(x) {
    return REG_NUM.test(x) ? x * 1 : 0;
  }).filter(function (x){ return 1 <= x && x <= 31;});
  if (day.length) {
    regular.day = day;
  }

  // 第nw曜日
  var REG_NUMYOBI = /^(\d)(.+)$/;
  var xweek = value.map(function(x) {
    var m = x.match(REG_NUMYOBI);
    if (m) {
      var n = m[1] * 1;
      var w = getWeekIndex(m[2]);
      if (1 <= n && n <= 6 && w !== null) {
        return [n, w];
      }
    }
    return null;
  }).filter(function (x){ return x;});
  if (xweek.length) {
    regular.xweek = xweek;
  }

  return regular;
}
