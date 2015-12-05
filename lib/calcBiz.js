/**
 * *********************************************************
 *                       営業日計算
 * *********************************************************
 */
module.exports = {
  addBiz       : addBiz,
  biz          : biz,
  passBiz      : passBiz,
  remainBiz    : remainBiz,
  resetBizCache: resetBizCache
};

/**
 * dependencies
 */
var TERM     = require('./config').TERM;
var countBiz = require('./utils/countBiz');
var suji     = require('./utils/suji');
var YYYYMM   = /^(\d{1,4})[-\/\.年]?(?:(\d{1,2})月?)?$/;

/**
 * alias
 */
var A_DAY = 86400000;
var MAX   = 365;       //調査最大日数
var countFromTo = countBiz.countFromTo;
var countTerm   = countBiz.countTerm;

/**
 * 営業日の算出
 *
 * 適用事例:納品日を表示したい等
 *
 * 営業日を計算します
 * 時間部分の値は変化しません
 * 一年先(前)に見つからなかった場合はnullを返します
 *
 * 営業日のルールは以下のとおり
 *
 * 加算する日数に1以上の場合は、翌営業日からカウントして算出します
 * 加算する日数が0の場合は、dataが営業日であればdateを、そうでない場合は翌営業日を返します
 * 加算する日数が-1以下の場合は、さかのぼって算出します
 *
 * その際includeがtrueの場合、dateもカウントの対象に含みます
 * 加算する日数が0の場合はincludeは無視されます
 *
 * @method addBiz
 * @param  {DATE}     date
 * @param  {Number}   days     加算する日数
 * @param  {Boolean}  include  初日を含む
 */
function addBiz(date, days, include) {
  date = this.toDate(date);
  if (!date) {
    return null;
  }

  var time = days < 0 ? -A_DAY : A_DAY;
  var countDown = days < 0 ? -1 : 1;

  // 0の場合の補正  +1営業日で前日からにすると同じ
  if (days === 0) {
    days = 1;
    date.setTime(date - A_DAY);
  }

  if (include && this.isOpen(date)) {
    days -= countDown;
  }

  // 最大調査日数
  var max = MAX;

  // 以下営業日の計算
  while(days) {
    date.setTime(+date + time);
    if (this.isOpen(date)) {
      days -= countDown;
    }
    if (--max < 0) {
      return null;
    }
  }
  return date;
}

/**
 * 営業日数を返します
 *
 * 第二引数に指定した値で３つの動作を切り替えます
 *
 * 指定しなかった場合
 *     第一引数に、2015年や2015-3などの年度もしくは年度+月を指定して
 *     その期間の営業日数を返します
 *
 * 日時を指定した場合
 *     二つの日付の間の営業日数を返します
 *
 * 期間('year', 'month'等)を指定した場合
 *     第一引数が含まれる期間の開始日から終了日の営業日数を返す
 *
 * @method biz
 * @param  {DATE/DATE}   from/date/yyyymm
 * @param  {DATE/String} to  /term/-
 * @return {Number}      days
 */
function biz (val1, val2) {
  if (val2) {
    var term = TERM[val2];
    return term ? countTerm(this, val1, term) : countFromTo(this, val1, val2);

  } else if (typeof val1 === 'number') {
    return countTerm(this, new Date(val1, this.startMonth-1, 1), 'y');

  } else if (typeof val1 === 'string') {
    val1 = suji(val1);
    var matches = val1.match(YYYYMM);
    if (!matches) {
      return null;
    } else if (matches[2]) {
      return countTerm(this, new Date(+matches[1], +matches[2]-1, 1), 'm');
    } else {
      return countTerm(this, new Date(+matches[1], this.startMonth-1, 1), 'y');
    }

  } else {
    return null;
  }
}

/**
 * 指定した日が含まれる期間の開始から経過した営業日数
 * @method passBiz
 * @param  {DATE}   date
 * @param  {String} term
 * @return {Number} days
 */
function passBiz (date, term) {
  date = this.toDate(date);
  if (!date) {
    return null;
  }
  var from = this.toDate(this.from(date, term));
  return from ? countFromTo(this, from, date) : null;
}

/**
 * 指定した日が含まれる期間の残りの営業日数
 * @method remainBiz
 * @param  {DATE}   date
 * @return {Number} date
 */
function remainBiz (date, term) {
  date = this.toDate(date);
  if (!date) {
    return null;
  }
  var to = this.toDate(this.to(date, term));
  return to ? countFromTo(this, date, to) : null;
}

/**
 * キャッシュを削除
 * (ドキュメントには記載されていません)
 * @method resetBizCache
 * @param  {DATE/String} date/'year'
 * @return {Boolean}     success
 */
function resetBizCache (date) {
  // 全キャッシュ削除
  if (!date) {
    this.bizCache = {};
    return true;
  }

  var cache = this.bizCache;

  // 年度キャッシュを全削除
  if (date === 'year') {
    Object.keys(cache).forEach(x=>{if(x.indexOf('-')===-1){delete cache[x];}});
    return true;
  }

  date = this.toDate(date);
  if (!date) {
    return false;
  }

  // 個別の日が含まれるキャッシュを削除
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  // 月キャッシュの削除
  delete cache[year + '-' + month];
  // 年度キャッシュの削除
  if (month < this.startMonth) {
    delete cache[year - 1];
  } else {
    delete cache[year];
  }

  return true;
}