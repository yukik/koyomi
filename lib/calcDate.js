/**
 * *********************************************************
 *                       日時の計算
 * *********************************************************
 */
module.exports = {
  add       : add,
  isLeap    : isLeap,
  getRange  : getRange,
  from      : from,
  to        : to,
  diff      : diff,
  days      : days,
  passDays  : passDays,
  remainDays: remainDays,
  separate  : separate,
  getAge    : getAge,
  kind      : kind
};

/**
 * dependencies
 */
var CONFIG = require('./config');
var separateFn = require('./utils/separate');
var addTerm = require('./utils/addTerm');
var suji = require('./utils/suji');

/*eslint no-irregular-whitespace:0*/

/**
 * alias
 */
var A_WEEK   = 604800000;
var A_DAY    =  86400000;
var A_HOUR   =   3600000;
var A_MINUTE =     60000;
var A_SECOND =      1000;
var REG_ADD  = /[ 　,、]/g;
var REG_ADD2 = /([-+]?\d+)([^-+0-9]+)?/ig;
var YYYYMM   = /^(\d{1,4})[-\/\.年](?:(\d{1,2})月?)?$/;
var TERM     = CONFIG.TERM;
var MARGIN   = CONFIG.KIND_MARGIN;
var POINTS   = [
  [      60, '分'  ],
  [    3600, '時間'],
  [   86400, '日'  ],
  [ 2629800, 'ヶ月'], // 86400 * 365.25 / 12
  [31557600, '年'  ]  // 86400 * 365.25
];
POINTS.forEach(p => p.push(p[0] - p[0] * MARGIN));

/**
 * 日時の計算
 *
 *  加算(減算)することができる単位は、年、ケ月、週、日、時間、分、秒です
 *  各単位で使用できる記述は定数TANIで確認してください
 *
 * 年・月のみ指定して、日以下を指定しない場合、次のルールを適用します
 *
 * 民法第143条 暦による期間の計算
 * 週、月又は年の初めから期間を起算しないときは、その期間は、最後の週、月又は年において
 * その起算日に応当する日の前日に満了する。ただし、月又は年によって期間を定めた場合にお
 * いて、最後の月に応当する日がないときは、その月の末日に満了する。
 *
 * @method add
 * @param  {DATE}   date
 * @param  {String} value
 * @return {Date}   date
 */
function add (date, value) {
  date = this.toDatetime(date);
  if (!date) {
    return null;
  }
  value = suji(value);

  var chr = value.slice(-1);
  var sign = 1;
  if (chr === '前') {
    sign = -1;
    value = value.slice(0, value.length-1);
  } else if (chr === '後'){
    value = value.slice(0, value.length-1);
  }

  var val = {};
  var replaced = value.replace(REG_ADD, '').replace(REG_ADD2, (m, v, t) => {
    var term = TERM[t.toLowerCase()];

    if (term === 'w') {
      val.d = v*sign*7 + (val.d || 0);
      return '';
    } else if (term) {
      val[term] = v*sign + (val[term] || 0);
      return '';
    } else {
      return m;
    }
  });

  // 処理できない単位あり
  if (replaced.length) {
    return null;
  }

  return addTerm(date, val);
}

/**
 * うるう年判定
 * 数字を指定した場合は年をそれ以外は年度内の日付を指定したとします
 * @method isLeap
 * @param  {Number/DATE}  year/date
 * @return {Boolean}      isLeap
 */
function isLeap (date) {
  var year;
  if (typeof date === 'number') {
    year = date;
  } else {
    date = this.toDate(date);
    year = date.getFullYear();
  }
  return new Date(year, 1, 29).getDate() === 29;
}

/**
 * 指定した単位の範囲で最初と最後の日時を返します
 * yyyymmは2015、2015-1、2015年、2015年10月の形式で指定します
 * 年のみを指定した場合はtermはy、月まで指定した場合はtermはmが既定値になります
 *
 * @method getRange
 * @param  {String|DATE} yyyymm|date   既定値:現在の日時
 * @param  {String}      term          既定値:yyyymm時はyまたはm, それ以外はd
 * @return {Object}      fromTo
 */
function getRange (date, term) {
  var matches;
  if (!term && typeof date === 'number') {
    term = ('' + date).length < 5 ? 'y' : 'm';
    date = this.toDate(date);
  } else if (!term && typeof date === 'string' && (matches = date.match(YYYYMM))) {
    if (matches[2]) {
      term = 'm';
      date = new Date(+matches[1], matches[2] - 1, 1);
    } else {
      term = 'y';
      date = new Date(+matches[1], this.startMonth - 1, 1);
    }
  } else {
    date = date ? this.toDatetime(date) : new Date();
    if (!date) {
      return null;
    }
  }
  term = (term || 'd').toLowerCase();

  var from, to;
  var sm = this.startMonth;
  var sw = this._startWeek;
  var y  = date.getFullYear();
  var m  = date.getMonth();
  var d  = date.getDate();
  var h  = date.getHours();
  var i  = date.getMinutes();
  var s  = date.getSeconds();
  var w  = date.getDay();

  switch(TERM[term]) {
  case 'y':
    var mx = (m - (sm - 1) + 12) % 12; // 年始めの月との差
    from = new Date(y    , m - mx, 1,  0,  0,  0,   0);
    to   = new Date(y + 1, m - mx, 0, 23, 59, 59, 999);
    break;
  case 'm':
    from = new Date(y, m    , 1,  0,  0,  0,   0);
    to   = new Date(y, m + 1, 0, 23, 59, 59, 999);
    break;
  case 'w':
    var dx = (w - sw + 7) % 7;  // 週初めとの日差
    from = new Date(y, m, d - dx    ,  0,  0,  0,   0);
    to   = new Date(y, m, d - dx + 6, 23, 59, 59, 999);
    break;
  case 'd':
    from = new Date(y, m, d,  0,  0,  0,   0);
    to   = new Date(y, m, d, 23, 59, 59, 999);
    break;
  case 'h':
    from = new Date(y, m, d, h,  0,  0,   0);
    to   = new Date(y, m, d, h, 59, 59, 999);
    break;
  case 'i':
    from = new Date(y, m, d, h, i,  0,   0);
    to   = new Date(y, m, d, h, i, 59, 999);
    break;
  case 's':
    from = new Date(y, m, d, h, i, s,   0);
    to   = new Date(y, m, d, h, i, s, 999);
    break;
  case 'ms':
    from = new Date(date.getTime());
    to   = new Date(date.getTime());
    break;
  default:
    return null;
  }

  return {from, to};
}

/**
 * 指定した単位の範囲で最初の日時を返します
 * @method from
 * @param  {DATE}   date
 * @param  {String} term
 * @return {Date}   date
 */
function from (date, term) {
  if (!term) {
    return null;
  }
  var se = this.getRange(date, term);
  return se ? se.from : null;
}

/**
 * 指定した単位の範囲で最後の日時を返します
 * @method to
 * @param  {DATE} date
 * @param  {String}      term
 * @return {Date}        date
 */
function to (date, term) {
  if (!term) {
    return null;
  }
  var se = this.getRange(date, term);
  return se ? se.to : null;
}


/**
 * 二つの日時の指定した単位での差を返す
 * 年・月・週・日は時以降を切り捨てて計算します
 *
 * ひと年は、同じ日にちを超えるごとに一ヶ年とします
 * そのため、単純に365日経過したら一ヶ年ではありません
 *
 * ひと月は、日の部分が超えるごとに一ヶ月とします
 * そのため、単純に30や31日経過したら一ヶ月ではありません
 *
 * @param  {DATE}   from
 * @param  {DATE}   to
 * @param  {String} term 既定値:day
 * @return {Number}
 */
function diff (from, to, term) {
  term = (term || 'day').toLowerCase();
  var t, f;
  switch(TERM[term]) {
  case 'y':
    return this.getAge(from, to);
  case 'm':
    f = this.toDate(from);
    t = this.toDate(to);
    if (!(f && t)) {
      return null;
    }
    return (t.getFullYear() - f.getFullYear()) * 12 + t.getMonth() - f.getMonth() -
      (t.getDate() < f.getDate() ? 0 : 1);
  case 'w':
    f = this.toDate(from);
    t = this.toDate(to);
    return f && t ? parseInt((t - f) / A_WEEK, 10) : null;
  case 'd':
    f = this.toDate(from);
    t = this.toDate(to);
    return f && t ? (t - f) / A_DAY : null;
  case 'h':
    f = this.toDatetime(from);
    t = this.toDatetime(to);
    return f && t ? parseInt((t - f) / A_HOUR, 10) : null;
  case 'i':
    f = this.toDatetime(from);
    t = this.toDatetime(to);
    return f && t ? parseInt((t - f) / A_MINUTE, 10) : null;
  case 's':
    f = this.toDatetime(from);
    t = this.toDatetime(to);
    return f && t ? parseInt((t - f) / A_SECOND, 10) : null;
  case 'ms':
    f = this.toDatetime(from);
    t = this.toDatetime(to);
    return f && t ? t - f : null;
  default:
    return null;
  }
}

/**
 * 指定した期間の日数を返します
 *
 * 第二引数に指定した値で３つの動作を切り替えます
 *
 * 指定しなかった場合
 *     第一引数に、2015年や2015-3などの年度もしくは年度+月を指定して
 *     その期間の日数を返します
 *     年だけを指定すると年度の期間を計算します
 *     年を指定する場合は二つの引数をきちんと指定してください
 *
 * 日時を指定した場合
 *     二つの日付の間の日数を返します
 *
 * 期間('year', 'month'等)を指定した場合
 *     第一引数が含まれる期間の開始日から終了日の日数を返す
 *
 * @method days
 * @param  {DATE/DATE/String|Number} from/date/yyyymm
 * @param  {DATE/String/-|-}         to  /term/-
 * @return {Number}      days
 */
function days (val1, val2) {
  if (val2) {
    var term = TERM[val2.toLowerCase()];
    if (term) {
      var range = this.getRange(val1, term);
      return range ? this.diff(range.from, range.to, 'd') + 1 : null;
    } else {
      var days = this.diff(val1, val2, 'd');
      return typeof days === 'number' && 0 <= days ? days + 1 : null;
    }
  } else if (typeof val1 === 'number') {
    return this.days(val1, ('' + val1).length < 5 ? 'y' : 'm');
  } else if (typeof val1 === 'string'){
    var matches = val1.match(YYYYMM);
    if (matches) {
      if (matches[2]) {
        return this.days(matches[1] +'-' + matches[2], 'm');
      } else {
        return this.days(matches[1], 'y');
      }
    }
  }
  return null;
}

/**
 * 指定した期間の経過日数を返します
 * @method passDays
 * @param  {DATE}   date
 * @param  {String} term
 * @return {Number} days
 */
function passDays (date, term) {
  var from = this.from(date, term);
  return from ? this.diff(from, date, 'd') + 1 : null;
}

/**
 * 指定した期間の残日数
 * @method remainDays
 * @param  {DATE}   date
 * @param  {String} term  既定値: day
 * @return {Number} days
 */
function remainDays (date, term) {
  var to = this.to(date, term);
  return to ? this.diff(date, to, 'd') + 1 : null;
}

/**
 * 期間をブロックごとに分割(年度、月、日)します
 *
 * @method separate
 * @param  {DATE}   from
 * @param  {DATE}   to
 * @return {Object} {
 *                    days   : [days1..., days2...],
 *                    months : [months1..., months2...],
 *                    years  : [years...]
 *                  }
 */
function separate (from, to) {
  from = this.toDate(from);
  to   = this.toDate(to);
  if (!from || !to) {
    return null;
  }
  return separateFn(from, to, this.startMonth);
}

/**
 * 年齢を返します
 * @method getAge
 * @param  {DATE} birthday
 * @param  {DATE} when
 * @return {Number}      age
 */
function getAge(birthday, when) {
  birthday = this.toDate(birthday);
  when = this.toDate(when || new Date());
  var b = new Date(birthday).setFullYear(2000);
  var w = new Date(when).setFullYear(2000);
  return when.getFullYear() - birthday.getFullYear() - (w >= b ? 0: 1);
}

/**
 * 人間が理解しやすい口語表記にする
 * @method kind
 * @param  {DATE}   date
 * @param  {DATE}   compareTo
 * @return {String}
 */
function kind (date, compareTo) {
  date = this.toDatetime(date);
  compareTo = compareTo ? this.toDatetime(compareTo) : new Date();
  if (!date || !compareTo) {
    return '';
  }
  var diff =  (compareTo - date) / 1000;
  var surfix = 0 < diff ? '前' : '後';
  diff = Math.abs(diff);

  var i = POINTS.length - 1;
  var point;
  for(point = null;point = POINTS[i]; i--) {
    if (point[2] <= diff) {
      var x = parseInt(diff / point[0], 10) + (point[2] <= diff % point[0] ? 1 : 0);
      return x + point[1] + surfix;
    }
  }
  return 'たった今';
}