// 秒計算
var Koyomi = require(global.minify ? '../lib/minify' : '..');
var seconds = Koyomi.seconds;
var eq = require('assert').equal;


eq(seconds('2015-1-1','2015-1-1'), 0);
eq(seconds('2015-1-1','2015-1-2'), 86400);
eq(seconds('0:00','1:00'), 3600);
eq(seconds('6時','7時'), 3600);
eq(seconds('6時30分','7時30分'), 3600);
eq(seconds('6時30分5秒','7時30分10秒'), 3605);