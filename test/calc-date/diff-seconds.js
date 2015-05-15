// 秒差
var Koyomi = require('../..');
var diff = Koyomi.diffSeconds;
var eq = require('assert').equal;

eq(diff(new Date('2015-01-01 00:00:00.000'), new Date('2015-01-01 00:00:10.000')), 10);
eq(diff(new Date('2015-01-01 00:00:00.000'), new Date('2015-01-01 00:00:00.000')), 0);
eq(diff(new Date('2015-01-01 00:00:00.999'), new Date('2015-01-01 00:00:00.000')), 0);

eq(diff('2015-1-1','2015-1-1'), 0);
eq(diff('2015-1-1','2015-1-2'), 86400);
eq(diff('0:00','1:00'), 3600);
eq(diff('6時','7時'), 3600);
eq(diff('6時30分','7時30分'), 3600);
eq(diff('6時30分5秒','7時30分10秒'), 3605);



