/**
 * *********************************************************
 *       (ユーティリティ関数) 定休日のコンパイル
 * *********************************************************
 */
module.exports = compileRegularHoliday;

/**
 * dependencies
 */
var getWeekIndex = require('./getWeekIndex');

/**
 * alias
 */
var REG_NUM = /^\d{1,2}$/;
var REG_NUMYOBI = /^(\d)(.+)$/;

// 配列->マップオブジェクト
var makeMap = v => v.reduce((x, y) => (x[y] = true, x), {});


/**
 * 定休日をコンパイルします
 * @param  {String} value
 * @return {Object} regular
 */
function compileRegularHoliday(value) {
  if (typeof value === 'function') {
    return value;

  } else if (typeof value === 'string') {
    return stringToRegularHolidays(value);

  } else if (typeof value === 'number' &&  1 <= value && value <= 31) {
    var regular = {week: {}, day: {}, xweek:{}};
    regular.day[value] = true;
    return regular;

  } else {
    return {week: {}, day: {}, xweek:{}};

  }
}

/**
 * 定休日オブジェクトの作成
 * '土, 日, 20, 30, 2火, 3火' ->
 *   {
 *     week : {'0': true, '6': true},
 *     day  : {'20': true, '30': true},
 *     xweek: {'2-2': true, '3-2': true}
 *   }
 * @method stringToRegularHolidays
 * @param  {String} value
 * @return {Object} RegularHolidays
 */
function stringToRegularHolidays (value) {
  var regular = {};
  value = value.split(',').map(x => x.trim());

  // 曜日
  regular.week = makeMap(getWeekIndex(value) || []);

  // 日
  var day = value.map(x => REG_NUM.test(x) ? x * 1 : 0)
                 .filter(x => 1 <= x && x <= 31);
  regular.day = makeMap(day);

  // 第nw曜日
  var xweek = value.map(x => {
    var m = x.match(REG_NUMYOBI);
    if (m) {
      var n = +m[1];
      n = 5 < n ? 5 : n;
      var w = getWeekIndex(m[2]);
      if (1 <= n && w !== null) {
        return n + '-' + w;
      }
    }
    return null;
  }).filter(x => x);
  regular.xweek = makeMap(xweek);
  return regular;
}