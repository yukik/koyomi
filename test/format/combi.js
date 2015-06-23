// フォーマット
var Koyomi = require('../..');
var koyomi = new Koyomi();
var format = koyomi.format.bind(koyomi);
var eq = require('assert').equal;

// 混合
eq(format('2015-4-10', 'YMMDD'), '20150410');
eq(format('2015-4-10', 'GGGggg'), '2675平成H');


eq(Koyomi.format('1989-1-7', 'WAREKI'), Koyomi.format('1989-1-7', 'GGN年M月D日>>漢数字'));
eq(Koyomi.format('1989-1-7', 'wareki'), Koyomi.format('1989-1-7', 'ggn年M月D日>>漢数字'));
