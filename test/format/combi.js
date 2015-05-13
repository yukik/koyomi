// フォーマット
var Koyomi = require('../..');
var koyomi = new Koyomi();
var format = koyomi.format.bind(koyomi);
var eq = require('assert').equal;

// 混合
eq(format('2015-4-10', 'YYYYMMDD'), '20150410');
eq(format('2015-4-10', 'GGGggg'), '平成H平成H');
