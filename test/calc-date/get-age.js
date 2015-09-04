// 年齢計算
var Koyomi = require('../..');
var get = Koyomi.getAge;
var eq = require('assert').equal;

eq(get('1974-2-18', '2015-9-4'), 41);
eq(get('1974-2-18'), get('1974-2-18', new Date()));