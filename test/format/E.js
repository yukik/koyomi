// フォーマット
var koyomi = require('../..').create();
var format = koyomi.format.bind(koyomi);
var eq = require('assert').equal;

// 営業日・休業日
// EE E e


eq(format('2015-1-1', 'EE'), '休業日');
eq(format('2015-1-1', 'E' ), '休業日');

eq(format('2015-1-5', 'EE'), '月曜日');
eq(format('2015-1-5', 'E' ), '営業日');

eq(format('2015-1-1', 'e'), '年末年始のお休み');
eq(format('2015-1-2', 'e'), '年末年始のお休み');
eq(format('2015-1-3', 'e'), '年末年始のお休み');
eq(format('2015-1-4', 'e'), '定休日');
eq(format('2015-1-5', 'e'), '');

koyomi.regularHoliday = '月';
eq(format('2015-1-5', 'e'), '定休日');


eq(format('2015-5-3', 'e'), '憲法記念日');
koyomi.openOnHoliday = true;
eq(format('2015-5-3', 'e'), '');
