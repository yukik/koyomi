// フォーマット
var Koyomi = require('../..');
var format = Koyomi.format.bind(Koyomi);
var eq = require('assert').equal;

// 祝日
// FFw FF Fw F

eq(format('2015-1-1', 'FFw'), '元日');
eq(format('2015-1-1', 'FF') , '元日');
eq(format('2015-1-1', 'Fw') , '祝日');
eq(format('2015-1-1', 'F')  , '祝日');

eq(format('2015-1-5', 'FFw'), '月曜日');
eq(format('2015-1-5', 'FF') , '');
eq(format('2015-1-5', 'Fw') , '月曜日');
eq(format('2015-1-5', 'F')  , '');



