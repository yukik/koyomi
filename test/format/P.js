// フォーマット
var Koyomi = require('../..');
var koyomi = new Koyomi();
var format = koyomi.format.bind(koyomi);
var eq = require('assert').equal;

// 営業日数
// PP P p
eq(format(20150101, 'PP'), '19');
eq(format(20150301, 'PP'), '22');
eq(format(20150101, 'P') ,  '0');
eq(format(20150101, 'p'),  '19');



