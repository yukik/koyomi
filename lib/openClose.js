/**
 * dependencies
 */
var A_WEEK     = 86400000 * 7;
var getDayInfo = require('./utils/getDayInfo');

/**
 * *********************************************************
 *                    営業・休業
 * *********************************************************
 */
module.exports = {
  open            : open,
  close           : close,
  reset           : reset,
  isOpen          : isOpen,
  isClose         : isClose,
  isSetOpen       : isSetOpen,
  isSetClose      : isSetClose,
  isRegularHoliday: isRegularHoliday,
  isSeasonHoliday : isSeasonHoliday,
  isHolidayClose  : isHolidayClose,
  closeCause      : closeCause
};

/**
 * 指定日を営業日に設定します（休日設定を無視します）
 * @method open
 * @param  {DATE}    date
 * @return {Boolean} success
 */
function open (date) {
  date = this.toDate(date);
  if (!date) {
    return false;
  }
  var info = getDayInfo(this.dayInfo, date, true);
  if (!info.open) {
    info.open = true;
    delete info.close;
    this.resetBizCache(date);
  }
  return true;
}

/**
 * 指定日を休業日に設定します（休日設定を無視します）
 * @method close
 * @param  {DATE}    date
 * @return {Boolean} success
 */
function close (date) {
  date = this.toDate(date);
  if (!date) {
    return false;
  }
  var info = getDayInfo(this.dayInfo, date, true);
  if (!info.close) {
    delete info.open;
    info.close = true;
    this.resetBizCache(date);
  }
  return true;
}

/**
 * 臨時営業・臨時休業の設定を取り消します
 * @method reset
 * @param  {DATE}    date
 * @return {Boolean} success
 */
function reset (date) {
  date = this.toDate(date);
  if (!date) {
    return false;
  }
  var info = getDayInfo(this.dayInfo, date);
  if (info && (info.open || info.close)) {
    delete info.open;
    delete info.close;
    this.resetBizCache(date);
    return true;
  } else {
    return false;
  }
}

/**
 * 営業日判定
 *
 *  営業日のチェックは次の４つを確認します
 *
 *    1, 臨時営業・臨時休業
 *    2, 年末年始・お盆の休み
 *    3, 定休日
 *    4, 祝日での休業
 *
 * @method isOpen
 * @param  {Date}    date
 * @return {Boolean} isOpen
 */
function isOpen (date) {
  date = this.toDate(date);
  if (!date) {
    return null;
  }

  // 臨時営業・臨時休業
  var info = getDayInfo(this.dayInfo, date);
  if (info) {
    if (info.open) {
      return true;
    } else if (info.close) {
      return false;
    }
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
  if (this.isHolidayClose(date)) {
    return false;
  }

  return true;
}

/**
 * 休業日判定
 * 判定方法は、isOpenを参照
 * @method isClose
 * @param  {DATE}    date
 * @return {Boolean} isClose
 */
function isClose (date) {
  date = this.toDate(date);
  if (!date) {
    return null;
  }
  return !this.isOpen(date);
}

/**
 * 臨時営業に設定されているか
 * @method isSetOpen
 * @param  {DATE}    date
 * @return {Boolean} isOpen
 */
function isSetOpen (date) {
  date = this.toDate(date);
  if (!date) {
    return null;
  }
  var info = getDayInfo(this.dayInfo, date);
  return info && info.open || false;
}

/**
 * 臨時休業に設定されているか
 * @method isSetClose
 * @param  {DATE}    date
 * @return {Boolean} isClose
 */
function isSetClose (date) {
  date = this.toDate(date);
  if (!date) {
    return null;
  }
  var info = getDayInfo(this.dayInfo, date);
  return info && info.close || false;
}

/**
 * 定休日判定
 * @method isRegularHoliday
 * @param  {DATE}    date
 * @return {Boolean} isClose
 */
function isRegularHoliday (date) {
  date = this.toDate(date);
  if (!date) {
    return null;
  }

  var regular = this._regularHoliday;

  if (typeof regular === 'object') {
    var w = date.getDay();

    // 週
    if (regular.week[w]) {
      return true;
    }

    // 日
    if (regular.day[date.getDate()]) {
      return true;
    }

    // 第ny曜日
    var n = parseInt((date.getDate() + 6) / 7, 10);
    if (regular.xweek[n + '-' + w]) {
      return true;
    } else if (regular.xweek['5-' + w]) {
      var nextW = new Date(date.getTime() + A_WEEK);
      if (nextW.getMonth() !== date.getMonth()) {
        return true;
      }
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
 * @param  {DATE}    date
 * @return {Boolean} isClose
 *
 */
function isSeasonHoliday (date) {
  date = this.toDate(date);
  if (!date) {
    return false;
  }

  var season = this._seasonHoliday;

  if (!season) {
    return false;

  } else if (typeof season === 'function') {
    return season(date);

  } else {
    var key = (date.getMonth() + 1) * 100 + date.getDate() * 1;
    return season[key] || false;
  }
}

/**
 * 祝日休み判定
 * @method isHolidayClose
 * @param  {DATE}    date
 * @return {Boolean} isClose
 */
function isHolidayClose (date) {
  if (this.openOnHoliday) {
    return false;
  }
  return this.getHolidayName(date) !== null;
}

/**
 * 休業の事由
 *
 * 次の優先順位で判別し、以下の文字列を返します
 *
 *  1. closeで設定
 *      addEventで追加された最初の文字列
 *      存在しない場合は'臨時休業'
 *
 *  2. 年末年始・お盆休み
 *      設定時の事由もしくは'休業期間'と返す
 *
 *  3. 定休日
 *      '定休日'と返す
 *
 *  4. 祝日休み判定
 *      祝日名を返す
 *
 * @param  {DATE}   date
 * @return {String} cause
 */
function closeCause (date) {
  date = this.toDate(date);
  if (!date) {
    return null;
  }
  var info = getDayInfo(this.dayInfo, date);
  if (info && info.open) {
    return '';
  }
  if (info && info.close) {
    return info.events[0] || '臨時休業';
  }
  var cause = this.isSeasonHoliday(date);
  if (cause) {
    return cause;
  }
  if (this.isRegularHoliday(date)) {
    return '定休日';
  }
  if (this.isHolidayClose(date)) {
    return this.getHolidayName(date);
  }
  return '';
}






