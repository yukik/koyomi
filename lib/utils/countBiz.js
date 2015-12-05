/**
 * *********************************************************
 *          (ユーティリティ関数) 営業日数の算出
 * *********************************************************
 */

module.exports = {
  countFromTo: countFromTo,
  countTerm  : countTerm
};

/**
 * alias
 */
var A_DAY = 86400000;

/**
 * 二つの日付の間の営業日数を返します
 * @param  {Object} koyomi
 * @param  {DATE}   from
 * @param  {DATE}   to
 * @return {Number} days
 */
function countFromTo(koyomi, from, to) {
  var blocks = koyomi.separate(from, to);
  if (!blocks) {
    return null;
  }
  var days = 0;
  days += blocks.days.reduce((x, d) => koyomi.isOpen(d) ? x + 1 : x, 0);
  days += blocks.months.reduce((x, d) => x + countMonth(koyomi, d), 0);
  days += blocks.years.reduce((x, d) => x + countYear(koyomi, d), 0);
  return days;
}

/**
 * 指定日が含まれる期間の開始日から終了日の営業日数を返す
 * @param  {Object} koyomi
 * @param  {DATE}   date
 * @param  {String} term   year/month/weekのいずれか
 * @return {Number} days
 */
function countTerm (koyomi, date, term) {
  date = koyomi.toDate(date);
  if (!date) {
    return null;
  }
  switch(term) {
  case 'y':
    return countYear(koyomi, koyomi.from(date, 'y'));
  case 'm':
    return countMonth(koyomi, koyomi.from(date, 'm'));
  case 'w':
    return countDays(koyomi, koyomi.from(date, 'w'), 7);
  default:
    return koyomi.isOpen(date) ? 1 : 0;
  }
}

/**
 * 指定年度の営業日数を返します
 * キャッシュが存在するなら、キャッシュから返し
 * 存在しない場合は、計算後にキャッシュします
 * @param  {Object} koyomi
 * @param  {Date}   firstDay
 * @return {Number} days
 */
function countYear(koyomi, firstDay) {
  var cache = koyomi.bizCache;
  var key = firstDay.getFullYear();
  if (key in cache) {
    return cache[key];
  }
  var days = 0;
  var length = 12;
  while(length--) {
    var y = firstDay.getFullYear();
    var m = firstDay.getMonth();
    days += countMonth(koyomi, firstDay);
    firstDay = new Date(y, m + 1, 1);
  }
  cache[key] = days;
  return days;
}

/**
 * 月の営業日数を返します
 * キャッシュが存在するなら、キャッシュから返し
 * 存在しない場合は、計算後にキャッシュします
 * @param  {Object} koyomi
 * @param  {Date}   firstDay
 * @return {Number} days
 */
function countMonth(koyomi, firstDay) {
  var cache = koyomi.bizCache;
  var key = firstDay.getFullYear() + '-' + (firstDay.getMonth() + 1);
  if (key in cache) {
    return cache[key];
  }
  var length = new Date(firstDay.getFullYear(), firstDay.getMonth()+1, 0).getDate();
  var days = countDays(koyomi, firstDay, length);
  cache[key] = days;
  return days;
}

/**
 * 指定した日から数日後までのうちの営業日数を返します
 * @param  {Object} koyomi
 * @param  {Date}   firstDay 初日
 * @param  {Number} length   初日を含む調査日数
 * @return {Number} days
 */
function countDays (koyomi, firstDay, length) {
  var days = 0;
  var d = firstDay;
  while(length--){
    if (koyomi.isOpen(d)) {
      days++;
    }
    d.setTime(d.getTime() + A_DAY);
  }
  return days;
}

