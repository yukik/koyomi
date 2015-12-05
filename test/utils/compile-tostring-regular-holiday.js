// 週インデックス
var compile  = require('../../lib/utils/compileRegularHoliday');
var toString = require('../../lib/utils/toStringRegularHoliday');
var eq = require('assert').deepEqual;

// 曜日
eq(compile('日'), {week: {'0': true}, day: {}, xweek: {}});
eq(toString({week: {'0': true}, day: {}, xweek: {}}), '日');
eq(compile('Mon'), {week: {'1': true}, day: {}, xweek: {}});
eq(compile('tue'), {week: {'2': true}, day: {}, xweek: {}});
eq(compile('wednesday'), {week: {'3': true}, day: {}, xweek: {}});
eq(compile('THURSDAY'), {week: {'4': true}, day: {}, xweek: {}});
eq(toString({week: {'4': true}, day: {}, xweek: {}}), '木');
eq(compile('土  ,   日'), {week: {'6': true, '0': true}, day: {}, xweek: {}});
eq(compile('月, 火, 休'), {week: {'1': true, '2': true}, day: {}, xweek: {}});
eq(toString({week: {'1': true, '2': true}, day: {}, xweek: {}}), '月, 火');

// 日
eq(compile('20'), {week: {}, day: {'20':true}, xweek: {}});
eq(toString({week: {}, day: {'20':true}, xweek: {}}), '20');

eq(compile('10,20'), {week: {}, day: {'10':true, '20':true}, xweek: {}});
eq(toString({week: {}, day: {'10':true,'20':true}, xweek: {}}), '10, 20');

// 第x week曜日
eq(compile('2水'), {week: {}, day: {}, xweek: {'2-3':true}});
eq(compile('4木,6木'), {week: {}, day: {}, xweek: {'4-4':true, '5-4':true}});
eq(toString({week: {}, day: {}, xweek: {'4-4':true, '5-4':true}}), '4木, 5木');

// 混合
eq(compile('土,日,2水,20'), {week: {'0':true, '6':true}, day: {'20':true}, xweek: {'2-3':true}});
eq(toString({week: {'6':true, '0':true}, day: {'20':true}, xweek: {'2-3':true}}), '日, 土, 20, 2水');

// 関数
function d(date) {
  return date.getDate() !== 1;
}
eq(compile(d), d);
eq(toString(d), d);




