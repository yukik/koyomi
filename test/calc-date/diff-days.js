// 日差
var Koyomi = require('../..');
var diff = Koyomi.diffDays;
var eq = require('assert').equal;


eq(diff('2015-1-1', '2015-1-1'), 0);
eq(diff('2015-1-1', '2015-1-2'), 1);
eq(diff('2015-1-2', '2015-1-1'), -1);
eq(diff('2015-1-1', '2016-1-1'), 365);

