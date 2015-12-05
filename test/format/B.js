// フォーマット
var koyomi = require('../..').create();
var format = koyomi.format.bind(koyomi);
var eq = require('assert').equal;

koyomi.startMonth = 1;

// 営業日数(年)
// BBB, BB, B
eq(format(201501,  'BBB'), '242');
eq(format(201601,  'BBB'), '243');
eq(format(20150101, 'BB'),   '0');
eq(format(20150101,  'B'), '242');
eq(format(20151231,  'B'),   '0');

// 営業日数(月)
// bbb, bb, b
eq(format(20150101, 'bbb'), '19');
eq(format(20150301, 'bbb'), '22');
eq(format(20150101,  'bb'),  '0');
eq(format(20150101,   'b'), '19');



