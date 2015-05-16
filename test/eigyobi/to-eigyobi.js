// 営業日計算(逆引き)
var Koyomi = require('../..');
var koyomi = new Koyomi();
var to = koyomi.toEigyobi.bind(koyomi);
var eq = require('assert').equal;
var d = require('../../lib/fx/toDate');
function test(actual, expected) {
  eq(actual ? actual.toString() : null, expected ? d(expected).toString() : null);
}

// params -> date, days, include

test(to('2015-05-01', 0), '2015-05-01');
test(to('2015-05-02', 0), '2015-05-01');
test(to('2015-05-01', 1), '2015-04-30');
test(to('2015-05-01', 1, true), '2015-05-01');
test(to('2015-05-01', -1), '2015-05-02');

test(to('2014-02-08', 1), '2014-02-06');
test(to('2014-02-09', 1), '2014-02-06');
test(to('2014-02-10', 1), '2014-02-09');
test(to('2014-02-11', 1), '2014-02-09');

test(to('2014-02-08', 1, true), '2014-02-07');
test(to('2014-02-09', 1, true), '2014-02-07');
test(to('2014-02-10', 1, true), '2014-02-10');
test(to('2014-02-11', 1, true), '2014-02-10');

// 年中無休
koyomi.holidayOpened = true;
koyomi.regularHoliday = null;
koyomi.seasonHoliday = null;
test(to('2015-01-01', 1), '2014-12-31');
test(to('2015-01-02', 1), '2015-01-01');
test(to('2015-01-03', 1), '2015-01-02');
test(to('2015-01-04', 1), '2015-01-03');
test(to('2015-01-11', 1), '2015-01-10');
koyomi.holidayOpened =  false;      // 既定値に戻す
koyomi.regularHoliday = '土, 日';   // 既定値に戻す
koyomi.seasonHoliday = '12/29-1/3'; // 既定値に戻す


// season
koyomi.seasonHoliday = null;
test(to('2015-01-01', 1), '2014-12-30');
koyomi.seasonHoliday = '12/29-12/31';
test(to('2015-01-01', 1), '2014-12-25');
koyomi.seasonHoliday = '12/20-1/20';
test(to('2015-01-01', 1), '2014-12-18');
koyomi.seasonHoliday = '1/1-1/5';
test(to('2015-01-01', 1), '2014-12-30');
koyomi.seasonHoliday = '12/29-1/6, 1/8';
test(to('2015-01-01', 1), '2014-12-25');
koyomi.seasonHoliday = '1/1-12/31';
test(to('2015-01-01', 1), null); // 全休
koyomi.seasonHoliday = '12/29-1/3'; // 既定値に戻す

// regular
koyomi.regularHoliday = '土,日';
test(to('2015-02-16', 1), '2015-02-15');
test(to('2015-02-16', 1), '2015-02-15');
// koyomi.regularHoliday = null;
// test(to('2015-02-13', 1), '2015-02-14');
// koyomi.regularHoliday = '木';
// test(to('2015-02-09', 1), '2015-02-10');
// test(to('2015-02-10', 1), '2015-02-13');
// test(to('2015-02-13', 1), '2015-02-14');
// koyomi.regularHoliday = '月,火,水,木,金,土,日'; // 全休
// test(to('2015-02-13', 1), null);



// function checkRegular (t) {
//   // 毎月 10日, 20日, 30日は定休日
//   return t.getDate() % 10 === 0;
// }
// test(to('2015-02-08', 1, null, null, checkRegular), '2015-02-09');
// test(to('2015-02-09', 1, null, null, checkRegular), '2015-02-12');
// test(to('2015-02-19', 1, null, null, checkRegular), '2015-02-21');
// test(to('2015-04-28', 1, null, null, checkRegular), '2015-05-01');

// // holidays
// var holidays = '1/5, 2/10, 3/5-3/10';
// test(to('2015-01-01', 1, null, '', '', holidays), '2015-01-02');
// test(to('2015-01-04', 1, null, '', '', holidays), '2015-01-06');
// test(to('2015-02-08', 2, null, '', '', holidays), '2015-02-11');
// test(to('2015-3-04', 1, null, '', '', holidays), '2015-3-11');
// function checkHolidays (t) {
//   // 東京オリンピックの年は7月が休み
//   return t.getFullYear() === 2020 && t.getMonth() === 6;
// }
// test(to('2020-6-29', 1, null, '', '', checkHolidays), '2020-6-30');
// test(to('2020-7-04', 1, null, '', '', checkHolidays), '2020-8-01');
// test(to('2015-10-10', 1, null, '', '', '1/1-12/31'), null);  // 全休
// test(to('2015-10-10', 1, null, '', '', function(){return true;}), null);  // 全休


