// フォーマット
var koyomi = require('../..').create();
var format = koyomi.format.bind(koyomi);
var eq = require('assert').equal;

// 祝日
// FF F ff f

eq(format('2015-1-1', 'FF'), '元日');
eq(format('2015-1-1', 'F') , '元日');
eq(format('2015-1-1', 'ff'), '祝日');
eq(format('2015-1-1', 'f') , '祝日');

eq(format('2015-1-5', 'FF'), '月曜日');
eq(format('2015-1-5', 'F') , '');
eq(format('2015-1-5', 'ff'), '月曜日');
eq(format('2015-1-5', 'f') , '');



