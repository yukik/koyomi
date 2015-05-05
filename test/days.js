// 日計算
var Koyomi = require(global.minify ? '../lib/minify' : '..');
var days = Koyomi.days;
var eq = require('assert').equal;


eq(days('2015-1-1', '2015-1-1'), 0);
eq(days('2015-1-1', '2015-1-2'), 1);
eq(days('2015-1-2', '2015-1-1'), -1);
eq(days('2015-1-1', '2016-1-1'), 365);

