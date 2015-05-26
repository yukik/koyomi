/**
 * *********************************************************
 *              イベント・カレンダーデータ
 * *********************************************************
 *
 * カレンダーを簡単に作成するためのデータを取得できます
 * UI部分は持ちませんので別途作成してください
 * また、日毎にイベントデータを追加することもできます
 * 
 */
module.exports = function (Koyomi) {

  Koyomi.initialize.push(function (koyomi, config) {
    // 週の始まり
    koyomi.startWeek = config.startWeek || CONFIG.START_WEEK;
    // カレンダーデータを6週分取得
    koyomi.six = 'six' in config ? config.six : CONFIG.SIX;
  });

  Koyomi.prototype.getEvents = getEvents;
  Koyomi.prototype.addEvent = addEvent;
  Koyomi.prototype.removeEvent = removeEvent;
  Koyomi.prototype.getCalendarData = getCalendarData;
  Koyomi.prototype.getWeekNumber = getWeekNumberInstance;
};

/**
 * dependencies
 */
var CONFIG        = require('./config');
var A_DAY         = require('./const').A_DAY;
var getWeekIndex  = require('./fx/getWeekIndex');
var getWeekNumber = require('./fx/getWeekNumber');

/**
 * イベントを取得
 * @method getEvents
 * @param  {Date|String} date
 * @return {Array}       events
 */
function getEvents (date) {
  var info = this.getDayInfo(date);
  return info ? info.events : [];
}

/**
 * イベントを設定
 * @method addEvent
 * @param  {Date|String} date
 * @param  {Array}       value
 * @return {Number}      index
 */
function addEvent (date, value) {
  var info = this.getDayInfo(date, true);
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
 * @param  {Date|String} date
 * @param  {Number}      index    省略時にすべてのイベント削除
 * @return {Boolean}     removed
 */
function removeEvent (date, index) {
  var info = this.getDayInfo(date);
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
* 開始曜日を指定するとゴースト日を追加します
*
* ゴースト日とは、
*   1日以前を日を週のはじめまで埋めるための日データと
*   末日以後の日を週の終わりまで埋めるための日データの２つを表します
*   カレンダーでは通常、薄いグレーなど影を薄くするため造語として
*   ゴースト日と命名しました
* 
* dataの各要素のプロパティ
*   som    : 月のはじめ (start of month)
*   eom    : 月の終わり (end of month)
*   year   : 年
*   month  : 月
*   day    : 日
*   week   : 曜日 0:日->6:土
*   opened : 営業日ならtrue
*   closed : 休業理由(祝日、休業日、定休日) 休業でないなら空文字
*   holiday: 祝日名、祝日ではない場合は空文字
*   events : イベント
* 以下はstartWeek=null時は出力されません
*   sow    : 週のはじめ (start of week)   
*   eow    : 週の終わり (end of week)
*   ghost  : ゴースト日はtrue
*   block  : 月ブロックのキー '2015/01'
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
* @param  {String}  startWeek 開始曜日
*                                既定値 プロパティのstartWeek
*                                null以外では、ゴースト日のデータと、sow/eow
*                                /ghost/blockのプロパティが追加されます
* @param  {Boolean} six       6週取得
*                                6週分までゴースト日を追加します
*                                既定値 プロパティのsix
* @return {Array}   data 
*/
function getCalendarData (range, startWeek, six) {
  var koyomi = this;
  var year;
  var month;
  var endYear;
  var endMonth;

  if (range instanceof Date) {
    year = range.getFullYear();
    month = range.getMonth() + 1;
    endYear = year;
    endMonth = month;
  } else if (typeof range === 'number' || /^\d{1,4}$/.test(range)) {
    // 年を指定
    year = range * 1;
    month = 1;
    endYear = range * 1;
    endMonth = 12;
  } else if (typeof range === 'string') {
    // 範囲を指定
    var REG_RANGE = /^(\d{1,4})\D+(\d{1,2})(?:\D+(\d{1,4})\D+(\d{1,2}))?$/;
    var m = range.match(REG_RANGE);
    if (m) {
      year = m[1] * 1;
      month = m[2] * 1;
      endYear =  (m[3] || m[1]) * 1;
      endMonth = (m[4] || m[2]) * 1;
    } else {
      return null;
    }
  } else {
    // 既定値 年度を取得
    var nendo = this.getNendo();
    year = nendo.from.getFullYear();
    month = nendo.from.getMonth() + 1;
    endYear = nendo.to.getFullYear();
    endMonth = nendo.to.getMonth() + 1;
  }

  // 週のはじめと終わりのインデックス
  var sw = startWeek === undefined ? getWeekIndex(koyomi.startWeek) : // 既定値
           startWeek === null ? null : getWeekIndex(startWeek);
  var ew = sw === null ? null : sw === 0 ? 6 : sw - 1;

  // 6週取得
  six = six !== undefined ? six : koyomi.six;

  // 戻り値
  var data = [];

  var weekNumber = 1;
  var weekNumberPlus;

  // 月データ処理のループ
  while(year*100 + month <= endYear * 100 + endMonth) {

    // 月データの範囲   day: 開始日, endDay: 終了日
    var day = new Date(year, month - 1, 1);
    var week = day.getDay();
    if (sw !== null) {
      day = new Date(year, month - 1, sw - week - (sw <= week ? -1 : 6));
    }
    var endDay = new Date(year, month, 0);
    if (six && sw !== null) {
      endDay = new Date(day.getTime() + A_DAY * 41);
    } else if (sw !== null) {
      var endWeek = endDay.getDay();
      endDay = new Date(year, month, sw - endWeek + (sw <= endWeek ? 6 : -1));
    }

    var som = true;
    weekNumberPlus = 0;

    // 日データ処理のループ
    while(true) {
      var r = koyomi.format(day, '{Y}|{M}|{D}|{W}|{e}|{FF}').split('|');
      var item = {
        som    : som,      // whileに入った直後だけtrue
        eom    : false,    // whileを抜ける直前だけtrue
        year   : r[0] * 1,
        month  : r[1] * 1,
        day    : r[2] * 1,
        week   : r[3] * 1,
        opened : !r[4],
        closed : r[4],
        holiday: r[5]
      };
      som = false;

      var info = koyomi.getDayInfo(day);
      item.events = info ? info.events : [];

      // 週の始まりが指定されている時のみ設定
      if (sw !== null) {
        item.sow = sw === r[3] * 1;
        item.eow = ew === r[3] * 1;
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
      }
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
 * 週番号を取得
 * ３つの引数を渡した場合は、年月日を渡したものと判定します
 * @method getWeekNumberInstance
 * @param  {Date|String|Number}  date/year
 * @param  {Number}              month    1月 -> 1
 * @param  {Number}              day
 * @return {Number}              weekNumber
 */
function getWeekNumberInstance (date) {
  if (arguments.length === 3) {
    date = new Date(arguments[0], arguments[1] - 1, arguments[2]);
  }
  return getWeekNumber(date, this.startWeek, this.startMonth);
}
