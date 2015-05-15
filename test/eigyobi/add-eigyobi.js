
// 営業日計算
var Koyomi = require('../..');
var koyomi = new Koyomi();
var d = require('../../lib/fx/toDate');
var add = koyomi.addEigyobi.bind(koyomi);
var eq = require('assert').equal;
function test(actual, expected) {
  eq(actual ? actual.toString() : null, expected ? d(expected).toString() : null);
}

test(add('2015-5-1', 0), '2015-5-1');
test(add('2015-5-2', 0),  20150507);
test(add('2015-5-3', 0), '2015-5-7');
test(add('2015-5-4', 0), '2015-5-7');
test(add('2015-5-5', 0), '2015-5-7');
test(add('2015-5-6', 0), '2015-5-7');
test(add('2015-5-7', 0), '2015-5-7');
test(add('2015-5-1', 1), '2015-5-7');
test(add('2015-5-2', 1), '2015-5-7');
test(add('2015-5-3', 1), '2015-5-7');
test(add('2015-5-4', 1), '2015-5-7');
test(add('2015-5-5', 1), '2015-5-7');
test(add('2015-5-6', 1), '2015-5-7');
test(add('2015-5-7', 1), '2015-5-8');

// include
test(add('2015-5-1', 1, true), '2015-5-1');
test(add('2015-5-2', 1, true), '2015-5-7');
test(add('2015-5-6', 1, true), '2015-5-7');
test(add('2015-5-7', 1, true), '2015-5-7');
test(add('2015-5-1', 1, false), '2015-5-7');
test(add('2015-5-2', 1, false), '2015-5-7');
test(add('2015-5-6', 1, false), '2015-5-7');
test(add('2015-5-7', 1, false), '2015-5-8');

// 年中無休
koyomi.regularHoliday = '';
koyomi.seasonHoliday = '';
koyomi.holidayOpened = true;
test(add('2015-1-1', 1), '2015-1-2');
test(add('2015-1-2', 1), '2015-1-3');
test(add('2015-1-3', 1), '2015-1-4');
test(add('2015-1-4', 1), '2015-1-5');
test(add('2015-1-11', 1), '2015-1-12');
koyomi.holidayOpened = false;        // 既定に戻す
koyomi.seasonHoliday = '12/29-1/3';  // 既定に戻す
koyomi.holidayOpened = false;        // 既定に戻す

// season
koyomi.seasonHoliday = '12/29-12/31';
test(add('2015-1-1', 1), '2015-1-2');
koyomi.seasonHoliday = '12/20-1/20';
test(add('2015-1-1', 1), '2015-1-21');
koyomi.seasonHoliday = '1/1-1/5';
test(add('2015-1-1', 1), '2015-1-6');
koyomi.seasonHoliday = '12/29-1/6, 1/8';
test(add('2015-1-1', 1), '2015-1-7');
koyomi.seasonHoliday = '1/1-12/31';
test(add('2015-1-1', 1), null); // 全休
koyomi.seasonHoliday = '12/29-1/3';    // 既定に戻す

// regular
koyomi.regularHoliday = '土,日';
test(add('2015-2-13', 1), '2015-2-16');
koyomi.regularHoliday = '';
test(add('2015-2-13', 1), '2015-2-14');
koyomi.regularHoliday = '木';
test(add('2015-2-9', 1), '2015-2-10');
test(add('2015-2-10', 1), '2015-2-13');
test(add('2015-2-13', 1), '2015-2-14');
koyomi.regularHoliday = '月,火,水,木,金,土,日';
test(add('2015-2-13', 1), null);
koyomi.regularHoliday = '5,15,25';
test(add('2015-2-4', 1), '2015-2-6');
test(add('2015-2-6', 1), '2015-2-7');
koyomi.regularHoliday = '2火,3火';
test(add('2015-2-9', 1), '2015-2-12');
test(add('2015-2-16', 1), '2015-2-18');
koyomi.regularHoliday = function (t) {
  // 毎月 10日, 20日, 30日は定休日
  return t.getDate() % 10 === 0;
};
test(add('2015-2-8', 1), '2015-2-9');
test(add('2015-2-9', 1), '2015-2-12');
test(add('2015-2-10', 1), '2015-2-12');
test(add('2015-2-19', 1), '2015-2-21');
test(add('2015-4-28', 1), '2015-5-1');
koyomi.regularHoliday = '月,10,2火';  // 混合
test(add('2015-2-6', 1), '2015-2-7');
test(add('2015-2-8', 1), '2015-2-12');
koyomi.regularHoliday = '土,日';       // 既定の戻す

// holidays
koyomi.holidayOpened = true;
test(add('2015-2-10', 1), '2015-2-11');
koyomi.holidayOpened = false;
test(add('2015-2-10', 1), '2015-2-12');



