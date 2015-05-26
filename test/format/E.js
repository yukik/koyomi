// フォーマット
var Koyomi = require('../..');
var koyomi = new Koyomi();
var format = koyomi.format.bind(koyomi);
var eq = require('assert').equal;

// 営業日・休業日
// Ew E e


eq(format('2015-1-1', 'Ew'), '休業日');
eq(format('2015-1-1', 'E' ), '休業日');

eq(format('2015-1-5', 'Ew'), '月曜日');
eq(format('2015-1-5', 'E' ), '営業日');

eq(format('2015-1-1', 'e'), '祝日');
eq(format('2015-1-2', 'e'), '休業日');
eq(format('2015-1-3', 'e'), '休業日');
eq(format('2015-1-4', 'e'), '定休日');
eq(format('2015-1-5', 'e'), '');

koyomi.regularHoliday = '月';
eq(format('2015-1-5', 'e'), '定休日');

koyomi.holidayOpened = true;
eq(format('2015-5-3', 'e'), '');
