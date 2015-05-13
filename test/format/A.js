// フォーマット
var Koyomi = require('../..');
var format = Koyomi.format.bind(Koyomi);
var eq = require('assert').equal;

// 午前午後
// AA, A, Aj

eq(format('2015-1-1', 'AA'), 'AM');
eq(format('2015-1-1', 'A' ), 'am');
eq(format('2015-1-1', 'Aj'), '午前');

eq(format('2015-1-1 12:00', 'AA'), 'PM');
eq(format('2015-1-1 12:00', 'A' ), 'pm');
eq(format('2015-1-1 12:00', 'Aj'), '午後');

eq(format('2015-1-1 12:00', 'AA'), 'PM');
eq(format('2015-1-1 12:00', 'A' ), 'pm');
eq(format('2015-1-1 12:00', 'Aj'), '午後');

eq(format('23:59:59', 'AA'), 'PM');
eq(format('23:59:59', 'A' ), 'pm');
eq(format('23:59:59', 'Aj'), '午後');

eq(format('0:00:00', 'AA'), 'AM');
eq(format('0:00:00', 'A' ), 'am');
eq(format('0:00:00', 'Aj'), '午前');

eq(format('11:59:59', 'AA'), 'AM');
eq(format('11:59:59', 'A' ), 'am');
eq(format('11:59:59', 'Aj'), '午前');

eq(format('12:00', 'AA'), 'PM');
eq(format('12:00', 'A' ), 'pm');
eq(format('12:00', 'Aj'), '午後');


