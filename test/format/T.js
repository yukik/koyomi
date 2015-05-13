//フォーマット
var Koyomi = require('../..');
var koyomi = new Koyomi();
var format = koyomi.format.bind(koyomi);
var eq = require('assert').equal;

// 年、年度 - 総日数、経過日数、残日数
// TT T t TTx Tx tx
koyomi.startMonth = 4;

eq(format(20150101, 'TT') , '365');
eq(format(20150101, 'T')  ,   '1');
eq(format(20150102, 't')  , '364');

eq(format(20150401, 'TTx'), '366');
eq(format(20150401, 'Tx') ,   '1');
eq(format(20150402, 'tx') , '365');

