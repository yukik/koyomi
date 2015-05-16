// フォーマット
var Koyomi = require('../..');
var koyomi = new Koyomi();
var format = koyomi.format.bind(koyomi);
var eq = require('assert').equal;

// 営業日数(年)
// BB, B, b
eq(format(201501,  'BB'), '242');
eq(format(201601,  'BB'), '243');
eq(format(20150101, 'B'), '0');
eq(format(20150101, 'b'), '242');
eq(format(20151231, 'b'), '0');



