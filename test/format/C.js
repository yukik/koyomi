// フォーマット
var koyomi = require('../..').create();
var format = koyomi.format.bind(koyomi);
var eq = require('assert').equal;

// 年 - 総日数、経過日数、残日数
// CCC CC C
koyomi.startMonth = 4;

eq(format(20150401, 'CCC'), '366');
eq(format(20150401, 'CC') ,   '1');
eq(format(20150402, 'C')  , '365');

// 月 - 総日数、経過日数、残日数
// ccc cc c
eq(format(20150101, 'ccc') , '31');
eq(format(20150101, 'cc')  ,  '1');
eq(format(20150102, 'c')  , '30');
