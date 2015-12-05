// フォーマット
var koyomi = require('../..').create();
var format = koyomi.format.bind(koyomi);
var eq = require('assert').equal;

// 秒
// SS S
eq(format('2015-01-01 00:00:00', 'SS'), '00');
eq(format('2015-01-01 00:00:01', 'SS'), '01');
eq(format('2015-01-01 00:00:10', 'SS'), '10');

eq(format('2015-01-01 00:00:00', 'S'),  '0');
eq(format('2015-01-01 00:00:01', 'S'),  '1');
eq(format('2015-01-01 00:00:10', 'S'), '10');