//フォーマット
var Koyomi = require('../..');
var format = Koyomi.format.bind(Koyomi);
var eq = require('assert').equal;

// 秒
// ss s
eq(format('2015-01-01 00:00:00', 'ss'), '00');
eq(format('2015-01-01 00:00:01', 'ss'), '01');
eq(format('2015-01-01 00:00:10', 'ss'), '10');

eq(format('2015-01-01 00:00:00', 's'),  '0');
eq(format('2015-01-01 00:00:01', 's'),  '1');
eq(format('2015-01-01 00:00:10', 's'), '10');