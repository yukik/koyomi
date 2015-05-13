// フォーマット
var Koyomi = require('../..');
var koyomi = new Koyomi();
var format = koyomi.format.bind(koyomi);
var eq = require('assert').equal;

// 休日理由
// C

eq(format('2015-1-1', 'C'), '祝日');
eq(format('2015-1-2', 'C'), '休業日');
eq(format('2015-1-3', 'C'), '休業日');
eq(format('2015-1-4', 'C'), '定休日');
eq(format('2015-1-5', 'C'), '');

koyomi.regularHoliday = '月';
eq(format('2015-1-5', 'C'), '定休日');

koyomi.holidayOpened = true;
eq(format('2015-5-3', 'C'), '');

