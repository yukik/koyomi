/**
 * *********************************************************
 *                          年度
 * *********************************************************
 */
module.exports = function (Koyomi) {

  // 初期化
  Koyomi.initialize.push(function (koyomi, config) {
    // 開始月
    Object.defineProperty(koyomi, '_startMonth', {value: null, writable:true});
    koyomi.startMonth = config.startMonth || START_MONTH;
  });

  /**
   * 年度の開始月
   * @property {Number} startMonth
   */
  Object.defineProperty(Koyomi.prototype, 'startMonth', {
    enumarable: true,
    get: function () { return this._startMonth; },
    set: function (value) {
      this._startMonth = value;
      this.resetEigyobiCache();
    }
  });

  Koyomi.prototype.getNendo        = getNendo;
  Koyomi.prototype.formatNendo     = formatNendo;
  Koyomi.prototype.nendoDays       = nendoDays;
  Koyomi.prototype.passNendoDays   = passNendoDays;
  Koyomi.prototype.remainNendoDays = remainNendoDays;
  Koyomi.prototype.separate        = separate;
};

/**
 * dependencies
 */
var START_MONTH = require('./config').START_MONTH;
var toDate = require('./fx/toDate');

/**
 * 年度の開始と終了の日時を取得する
 * @method getNendo
 * @param  {String|Date} date 含まれる日時 省略時は new Date()
 * @return {Object}      
 */
function getNendo (date) {
  date = date ? toDate(date) : new Date();
  if (!date) {
    return null;
  }

  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var fm = this.startMonth;
  var tm = fm === 1 ? 12 : fm - 1;
  var fy = month < fm ? year - 1 : year;
  var ty = fm === 1 ? fy : fy + 1;

  var from = new Date(fy, fm - 1, 1,  0,  0,  0,   0);
  var to   = new Date(ty, tm,     0, 23, 59, 59, 999);

  return {from: from, to: to};
}

/**
 * 年度を表す表記を返します
 * @method formatNendo
 * @param  {Date|String} date       含まれる日時  既定値 new Date()
 * @param  {String}      fromFormat 開始年月のフォーマット 既定値 'Y/M'
 * @param  {String}      toFormat   終了年月のフォーマット 既定値 '-Y/M'
 *                                   (ただし、fromFormatが設定時の規定値はnull)
 * @param  {Boolean}     reverse    結合順を逆にする  規定値 false
 * @return {String}      formatted
 */
function formatNendo (date, fromFormat, toFormat, reverse) {
  var nendo = this.getNendo(date || new Date());

  var unsetFrom = arguments.length <= 1;
  var unsetTo = arguments.length <= 2;

  fromFormat = unsetFrom ? '{Y}/{M}' : fromFormat;
  toFormat = unsetTo ? (unsetFrom ? '-{Y}/{M}' : null) : toFormat;

  var from = fromFormat ? this.format(nendo.from, fromFormat) : '';
  var to = toFormat ? this.format(nendo.to, toFormat) : '';

  return reverse ? to + from : from + to;
}


/**
 * 年度の総日数
 * @method nendoDays
 * @param  {Date|String}   date
 * @return {Number}        days
 */
function nendoDays (date) {
  date = toDate(date);
  if (!date) {
    return null;
  }
  var range = this.getNendo(date);
  return this.diffDays(range.from, range.to) + 1;
}

/**
 * 年度の経過日数
 * @method passNendoDays
 * @param  {Date|String}   date
 * @return {Number}        days
 */
function passNendoDays (date) {
  date = toDate(date);
  if (!date) {
    return null;
  }
  var range = this.getNendo(date);
  return this.diffDays(range.from, date) + 1;
}

/**
 * 年度の残日数
 * @method remainNendoDays
 * @param  {Date|String}   date
 * @return {Number}        days
 */
function remainNendoDays (date) {
  date = toDate(date);
  if (!date) {
    return null;
  }
  var range = this.getNendo(date);
  return this.diffDays(date, range.to) + 1;
}

/**
 * 期間をブロックごとに分割(年度、月、日)します
 *   (時以下は切り捨てられます)
 *
 * 期間は次のプロパティ名で設定されます
 * passDays以外は開始日と
 * 対象のブロックが存在しない場合は、
 *
 *   例えば from:2015-01-18  to:2017-07-20 の場合は次のようになります
 * 
 *           14日          2か月          2年         3か月        20日
 *     |--remainDays--|--fromMonths--|---nendo---|--toMonths--|--passDays--|
 * 2015-01-18     2015-01-31         |           |            |            |
 *                2015-02-01     2015-03-31      |            |            |
 *                               2015-04-01  2017-03-31       |            |
 *                                           2017-04-01   2017-06-30       |
 *                                                        2017-07-01   2017-07-20
 *
 * (注意)
 *  同年同月でfromとtoが月初でも月末でもない場合は上記のどのブロックにも当てはまらないため、
 *  daysというプロパティをひとつだけも持つオブジェクトが返されます
 *  
 * @method separate
 * @param  {Date|String} from
 * @param  {Date|String} to
 * @return {Object}      {
 *                         days      : {from: from, to: to},
 *                       }
 *                       もしくは
 *                       {
 *                         remainDays:  from,
 *                         fromMonths: {date: date, times: times},
 *                         nendo     : {date: date, times: times},
 *                         toMonths  : {date: date, times: times},
 *                         passDays  :  to
 *                       }
 */
function separate (from, to) {
  from = toDate(from, true);
  to = toDate(to, true);
  if (!from || !to || to.getTime() < from.getTime()) {
    return null;
  }

  // 結果
  var terms = {};
  // 年度の開始月・終了月
  var sm = this.startMonth;
  // 期間年月日
  var fy = from.getFullYear();
  var fm = from.getMonth() + 1;
  var fd = from.getDate();
  var ty = to.getFullYear();
  var tm = to.getMonth() + 1;
  var td = to.getDate();
  var tl = new Date(ty, tm, 0).getDate(); // to last date

  // 同月内
  if (fy === ty && fm === tm) {

    if (fd === 1 && td === tl) {         // まるまる1か月
      terms.fromMonths = {date: from, times: 1};

    } else if (fd === 1) {               // 月初からtoまで
      terms.passDays = to;

    } else if (td === tl) {              // fromから月末まで
      terms.remainDays = from;

    } else {
      terms.days = {from: from, to: to}; // 途中から途中まで

    }
    return terms;
  }

  // remainDays (月末までの追加)
  if (fd !== 1) {
    terms.remainDays = from;
    from = this.add(this.start(from, '月'), '1ヶ月');
    fy = from.getFullYear();
    fm = from.getMonth() + 1;
  }

  // passDays (月初からの追加)
  if (td !== new Date(to.getFullYear(), to.getMonth() + 1, 0).getDate()) {
    terms.passDays = to;
    to = this.add(this.start(to, '月'), '-1日');
    ty = to.getFullYear();
    tm = to.getMonth() + 1;
  }

  var fym = fy*12 + fm - sm;
  var tym = ty*12 + tm - sm + 1;

  // fromMonths (年度前の数月)
  var fmtimes = 12 - fym % 12;
  if (fmtimes < 12 && fym + fmtimes <= tym) {
    terms.fromMonths = {date: new Date(fy, fm - 1, 1), times: fmtimes};
    fym += fmtimes;
  }

  // toMonths (年度後の数月)
  var tmtimes = tym % 12;
  if (tmtimes && fym <= tym - tmtimes) {
    terms.toMonths = {date: new Date(ty, tm - tmtimes, 1), times: tmtimes};
    tym -= tmtimes;
  }

  // nendo 年度
  var nendoTimes = (tym - fym) /12;
  if (nendoTimes) {
    terms.nendo = {date: toDate([fym/12, sm, 1]), times: nendoTimes};
  }

  return terms;
}


