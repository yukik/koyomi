// フォーマット
var koyomi = require('../..').create();
var format = koyomi.format.bind(koyomi);
var eq = require('assert').equal;

// WAREKI wareki

eq(format('2015-4-10', 'WAREKI'), '平成二十七年四月十日');
eq(format('2015-4-10', 'wareki'), '平成二十七年四月十日');

eq(format('1989-1-7', 'WAREKI'), '平成元年一月七日');
eq(format('1989-1-7', 'wareki'), '昭和六十四年一月七日');

// BIZ3
koyomi.regularHoliday = '土,日';
koyomi.seasonHoliday = null;
koyomi.openOnHoliday = false;

eq(format('2015-4-24', 'BIZ3'), '2015-04-30');