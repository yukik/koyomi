// フォーマット
var Koyomi = require('../..');
var format = Koyomi.format.bind(Koyomi);
var eq = require('assert').equal;

// 年
// YYYY YY

eq(format('2015-1-1', 'YYYY'), '2015');
eq(format('2015-1-1', 'YY'), '15');


eq(format('2015-1-1', 'YYYY>9'), '000002015');


