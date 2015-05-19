// フォーマット
var Koyomi = require('../..');
var koyomi = new Koyomi();
var format = koyomi.format.bind(koyomi);
var eq = require('assert').equal;

// 営業日・休業日
// Ew E
eq(format('2015-1-1', 'Ew'), '休業日');
eq(format('2015-1-1', 'E' ), '休業日');

eq(format('2015-1-5', 'Ew'), '月曜日');
eq(format('2015-1-5', 'E' ), '営業日');




