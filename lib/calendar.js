
/**
 * dependencies
 */
var getWeekIndex  = require('./utils/getWeekIndex');
var getDayInfo    = require('./utils/getDayInfo');
var formatArray   = require('./utils/formatArray');

/**
 * alias
 */
var A_DAY     = 86400000;
var REG_RANGE = /^(\d{1,4})\D+(\d{1,2})(?:\D+(\d{1,4})\D+(\d{1,2}))?$/;
var DATE_INFO = 'Y,M,D,w,e,F'.split(',').map(x => {return {p:x};});

/**
 * *********************************************************
 *              イベント・カレンダーデータ
 * *********************************************************
 *
 * カレンダーを簡単に作成するためのデータを取得できます
 * UI部分は持ちませんので別途作成してください
 * また、日毎にイベントデータを追加することもできます
 */
module.exports = {
  getEvents      : getEvents,
  addEvent       : addEvent,
  removeEvent    : removeEvent,
  getCalendarData: getCalendarData
};

/**
 * イベントを取得
 * @method getEvents
 * @param  {DATE}  date
 * @return {Array} events
 */
function getEvents (date) {
  date = this.toDate(date);
  if (!date) {
    return null;
  }
  var info = getDayInfo(this.dayInfo, date);
  return info ? info.events : [];
}

/**
 * イベントを設定
 * @method addEvent
 * @param  {DATE} date
 * @param  {Array}       value
 * @return {Number}      index
 */
function addEvent (date, value) {
  date = this.toDate(date);
  if (!date) {
    return null;
  }
  var info = getDayInfo(this.dayInfo, date, true);
  if (!info) {
    return null;
  }
  var events = info.events;
  events.push(value);
  return events.length - 1;
}

/**
 * イベントを削除
 * @method removeEvent
 * @param  {DATE} date
 * @param  {Number}      index    省略時にすべてのイベント削除
 * @return {Boolean}     removed
 */
function removeEvent (date, index) {
  date = this.toDate(date);
  if (!date) {
    return false;
  }
  var info = getDayInfo(this.dayInfo, date);
  if (!info) {
    return false;
  }
  var events = info.events;
  if (arguments.length === 1) {
    events.splice(0, events.length);
    return true;
  }
  if (events.length <= index) {
    return false;
  }
  events.splice(index,1);
  return true;
}

/**
* カレンダーデータ
*
* カレンダーを作成しやすい元データを提供します
* ゴースト日が自動的に追加されます
*
* ゴースト日とは、
*   1日以前を日を週のはじめまで埋めるための日データと
*   末日以後の日を週の終わりまで埋めるための日データを表します
*   カレンダーでは通常、薄いグレーなど影を薄くするため造語として
*   ゴースト日と命名しました
*
* dataの各要素のプロパティ
*   som       : 月のはじめ (start of month)
*   eom       : 月の終わり (end of month)
*   year      : 年
*   month     : 月
*   day       : 日
*   week      : 曜日 0:日->6:土
*   open      : 営業日ならtrue
*   close     : 休業理由(祝日、休業日、定休日) 休業でないなら空文字
*   holiday   : 祝日名、祝日ではない場合は空文字
*   events    : イベント
*   sow       : 週のはじめ (start of week)
*   eow       : 週の終わり (end of week)
*   ghost     : ゴースト日はtrue
*   block     : 月ブロックのキー '2015/01'
*   weekNumber: 週番号
*
* @method getCalendarData
* @param  { Date    range     期間
*          |Number               new Date(), 2015, '2015/4', '2015/4-2016/3'
*          |String}              Dateオブジェクトの場合は含まれる月
*                                数字の場合は指定年
*                                文字列の場合は'Y/M'の場合は1か月分
*                                'Y/M-Y/M'の場合は範囲
*                                既定値 プロパティの`startMonth`に設定された
*                                       月から、本日が含まれる年度の期間
* @return {Array}   data
*/
function getCalendarData (range) {
  range = getRange(this, range);
  var days = this.dayInfo;

  var year = range.year;
  var month = range.month;
  var endYear = range.endYear;
  var endMonth = range.endMonth;

  // 週のはじめと終わりのインデックス
  var sw = getWeekIndex(this.startWeek);
  var ew = sw === 0 ? 6 : sw - 1;

  // 戻り値
  var data = [];

  var weekNumber = 1;
  var weekNumberPlus;

  // 月データ処理のループ
  while(year * 100 + month <= endYear * 100 + endMonth) {

    // 月データの範囲   day: 開始日, endDay: 終了日
    var beginDay = new Date(year, month - 1, 1);
    var week = beginDay.getDay();
    var day = new Date(year, month - 1, sw - week - (sw <= week ? -1 : 6));
    var endDay = new Date(year, month, 0);
    endDay = new Date(day.getTime() + A_DAY * 41);

    var som = true;
    weekNumberPlus = 0;

    // 日データ処理のループ
    while(true) {
      var r = formatArray(this, day, DATE_INFO); // Y,M,D,w,e,F
      var item = {
        som    : som,      // whileに入った直後だけtrue
        eom    : false,    // whileを抜ける直前だけtrue
        year   : r[0],
        month  : r[1],
        day    : r[2],
        week   : r[3],
        open   : !r[4],
        close  : r[4],
        holiday: r[5]
      };
      item.sow = sw === item.week;
      item.eow = ew === item.week;
      som = false;

      var info = getDayInfo(days, day);
      item.events = info ? info.events : [];
      item.ghost = item.month !== month;
      item.block = year + '/' + ('0' + month).slice(-2);
      if (item.sow) {
        if (!item.ghost) {
          weekNumber++;
        } else if (!item.som) {
          weekNumberPlus++;
        }
      }
      item.weekNumber = weekNumber + weekNumberPlus;

      data.push(item);
      if (day.getTime() === endDay.getTime()) {
        item.eom = true;
        break;
      }
      day.setTime(day.getTime() + A_DAY);
    }

    month = 12 <= month ? 1 : month + 1;
    year = month === 1 ? year + 1 : year;
  }
  return data;
}

/**
 * rangeに次のものを指定した場合に範囲は次の通り
 *
 *  未指定
 *    本日の会計年度の開始から終了
 *
 *  Dateオブジェクト
 *    その日を含む月
 *
 *  1から4桁の数字(文字列でも可)
 *    年を指定したとして年度の開始から終了まで
 *
 *  文字列
 *    Y/M-Y/Mの形式で範囲を指定します
 *
 *
 *
 *
 * @param  {Object}             koyomi
 * @param  {Date|Number|String} range
 * @return {Object}             range
 */
function getRange(koyomi, range) {

  if (!range) {
    return dateToFyRange(koyomi);
  }

  // その日を含む月
  if (range instanceof Date) {
    return {
      year    : range.getFullYear(),
      month   : range.getMonth() + 1,
      endYear : range.getFullYear(),
      endMonth: range.getMonth() + 1
    };
  }

  // 年度指定
  if (typeof range === 'number' || /^\d{1,4}$/.test(range)) {
    return dateToFyRange(koyomi, range + '-' + koyomi.startMonth + '-1');
  }

  // Y/M-Y/Mの形式
  if (typeof range === 'string') {
    var m = range.match(REG_RANGE);
    if (m) {
      return {
        year    : +m[1],
        month   : +m[2],
        endYear : +m[3] || +m[1],
        endMonth: +m[4] || +m[2]
      };
    }
  }

  // 既定値
  return dateToFyRange(koyomi);
}

/**
 *
 * @param  {Object} koyomi
 * @param  {String} date
 * @return {Object} range
 */
function dateToFyRange(koyomi, date) {
  // 既定値 年度を取得
  var fy = koyomi.getRange(date || new Date(), 'y');
  var year = fy.from.getFullYear();
  var month = fy.from.getMonth() + 1;
  var endYear = fy.to.getFullYear();
  var endMonth = fy.to.getMonth() + 1;
  return {year, month, endYear, endMonth};
}

