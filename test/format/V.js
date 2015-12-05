// フォーマット
var koyomi = require('../..').create();
var format = koyomi.format.bind(koyomi);
var eq = require('assert').equal;

koyomi.startMonth = 1;

// 上半期、下半期
// VV V
eq(format(20150101, 'V'), '上半期');
eq(format(20150201, 'V'), '上半期');
eq(format(20150301, 'V'), '上半期');
eq(format(20150401, 'V'), '上半期');
eq(format(20150501, 'V'), '上半期');
eq(format(20150601, 'V'), '上半期');
eq(format(20150701, 'V'), '下半期');
eq(format(20150801, 'V'), '下半期');
eq(format(20150901, 'V'), '下半期');
eq(format(20151001, 'V'), '下半期');
eq(format(20151101, 'V'), '下半期');
eq(format(20151201, 'V'), '下半期');


eq(format(20150101, 'V>1'), '上');
eq(format(20150201, 'V>1'), '上');
eq(format(20150301, 'V>1'), '上');
eq(format(20150401, 'V>1'), '上');
eq(format(20150501, 'V>1'), '上');
eq(format(20150601, 'V>1'), '上');
eq(format(20150701, 'V>1'), '下');
eq(format(20150801, 'V>1'), '下');
eq(format(20150901, 'V>1'), '下');
eq(format(20151001, 'V>1'), '下');
eq(format(20151101, 'V>1'), '下');
eq(format(20151201, 'V>1'), '下');


koyomi.startMonth = 4;

eq(format(20150101, 'V'), '下半期');
eq(format(20150201, 'V'), '下半期');
eq(format(20150301, 'V'), '下半期');
eq(format(20150401, 'V'), '上半期');
eq(format(20150501, 'V'), '上半期');
eq(format(20150601, 'V'), '上半期');
eq(format(20150701, 'V'), '上半期');
eq(format(20150801, 'V'), '上半期');
eq(format(20150901, 'V'), '上半期');
eq(format(20151001, 'V'), '下半期');
eq(format(20151101, 'V'), '下半期');
eq(format(20151201, 'V'), '下半期');


koyomi.startMonth = 7;

eq(format(20150101, 'V'), '下半期');
eq(format(20150201, 'V'), '下半期');
eq(format(20150301, 'V'), '下半期');
eq(format(20150401, 'V'), '下半期');
eq(format(20150501, 'V'), '下半期');
eq(format(20150601, 'V'), '下半期');
eq(format(20150701, 'V'), '上半期');
eq(format(20150801, 'V'), '上半期');
eq(format(20150901, 'V'), '上半期');
eq(format(20151001, 'V'), '上半期');
eq(format(20151101, 'V'), '上半期');
eq(format(20151201, 'V'), '上半期');


koyomi.startMonth = 9;

eq(format(20150101, 'V'), '上半期');
eq(format(20150201, 'V'), '上半期');
eq(format(20150301, 'V'), '下半期');
eq(format(20150401, 'V'), '下半期');
eq(format(20150501, 'V'), '下半期');
eq(format(20150601, 'V'), '下半期');
eq(format(20150701, 'V'), '下半期');
eq(format(20150801, 'V'), '下半期');
eq(format(20150901, 'V'), '上半期');
eq(format(20151001, 'V'), '上半期');
eq(format(20151101, 'V'), '上半期');
eq(format(20151201, 'V'), '上半期');













