// フォーマット
var koyomi = require('../..').create();
var format = koyomi.format.bind(koyomi);
var eq = require('assert').equal;

// 午前午後
// AA, aa, A

eq(format('2015-1-1', 'AA'), 'AM');
eq(format('2015-1-1', 'aa'), 'am');
eq(format('2015-1-1', 'A' ), '午前');

eq(format('2015-1-1 12:00', 'AA'), 'PM');
eq(format('2015-1-1 12:00', 'aa'), 'pm');
eq(format('2015-1-1 12:00', 'A' ), '午後');

eq(format('2015-1-1 12:00', 'AA'), 'PM');
eq(format('2015-1-1 12:00', 'aa'), 'pm');
eq(format('2015-1-1 12:00', 'A' ), '午後');

eq(format('23:59:59', 'AA'), 'PM');
eq(format('23:59:59', 'aa'), 'pm');
eq(format('23:59:59', 'A' ), '午後');

eq(format('0:00:00', 'AA'), 'AM');
eq(format('0:00:00', 'aa'), 'am');
eq(format('0:00:00', 'A' ), '午前');

eq(format('11:59:59', 'AA'), 'AM');
eq(format('11:59:59', 'aa'), 'am');
eq(format('11:59:59', 'A' ), '午前');

eq(format('12:00', 'AA'), 'PM');
eq(format('12:00', 'aa'), 'pm');
eq(format('12:00', 'A' ), '午後');


