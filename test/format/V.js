//フォーマット
var Koyomi = require('../..');
var koyomi = new Koyomi();
var format = koyomi.format.bind(koyomi);
var eq = require('assert').equal;

// 上半期、下半期
// VV V Vx
eq(format(20150101, 'VV'), 'first half');
eq(format(20150201, 'VV'), 'first half');
eq(format(20150301, 'VV'), 'first half');
eq(format(20150401, 'VV'), 'first half');
eq(format(20150501, 'VV'), 'first half');
eq(format(20150601, 'VV'), 'first half');
eq(format(20150701, 'VV'), 'second half');
eq(format(20150801, 'VV'), 'second half');
eq(format(20150901, 'VV'), 'second half');
eq(format(20151001, 'VV'), 'second half');
eq(format(20151101, 'VV'), 'second half');
eq(format(20151201, 'VV'), 'second half');


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

eq(format(20150101, 'Vx'), '上半期');
eq(format(20150201, 'Vx'), '上半期');
eq(format(20150301, 'Vx'), '上半期');
eq(format(20150401, 'Vx'), '上半期');
eq(format(20150501, 'Vx'), '上半期');
eq(format(20150601, 'Vx'), '上半期');
eq(format(20150701, 'Vx'), '下半期');
eq(format(20150801, 'Vx'), '下半期');
eq(format(20150901, 'Vx'), '下半期');
eq(format(20151001, 'Vx'), '下半期');
eq(format(20151101, 'Vx'), '下半期');
eq(format(20151201, 'Vx'), '下半期');


koyomi.startMonth = 4;

eq(format(20150101, 'Vx'), '下半期');
eq(format(20150201, 'Vx'), '下半期');
eq(format(20150301, 'Vx'), '下半期');
eq(format(20150401, 'Vx'), '上半期');
eq(format(20150501, 'Vx'), '上半期');
eq(format(20150601, 'Vx'), '上半期');
eq(format(20150701, 'Vx'), '上半期');
eq(format(20150801, 'Vx'), '上半期');
eq(format(20150901, 'Vx'), '上半期');
eq(format(20151001, 'Vx'), '下半期');
eq(format(20151101, 'Vx'), '下半期');
eq(format(20151201, 'Vx'), '下半期');


koyomi.startMonth = 7;

eq(format(20150101, 'Vx'), '下半期');
eq(format(20150201, 'Vx'), '下半期');
eq(format(20150301, 'Vx'), '下半期');
eq(format(20150401, 'Vx'), '下半期');
eq(format(20150501, 'Vx'), '下半期');
eq(format(20150601, 'Vx'), '下半期');
eq(format(20150701, 'Vx'), '上半期');
eq(format(20150801, 'Vx'), '上半期');
eq(format(20150901, 'Vx'), '上半期');
eq(format(20151001, 'Vx'), '上半期');
eq(format(20151101, 'Vx'), '上半期');
eq(format(20151201, 'Vx'), '上半期');


koyomi.startMonth = 9;

eq(format(20150101, 'Vx'), '上半期');
eq(format(20150201, 'Vx'), '上半期');
eq(format(20150301, 'Vx'), '下半期');
eq(format(20150401, 'Vx'), '下半期');
eq(format(20150501, 'Vx'), '下半期');
eq(format(20150601, 'Vx'), '下半期');
eq(format(20150701, 'Vx'), '下半期');
eq(format(20150801, 'Vx'), '下半期');
eq(format(20150901, 'Vx'), '上半期');
eq(format(20151001, 'Vx'), '上半期');
eq(format(20151101, 'Vx'), '上半期');
eq(format(20151201, 'Vx'), '上半期');













