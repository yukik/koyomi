// フォーマット
var Koyomi = require('../..');
var eq = require('assert').equal;

// WAREKI wareki

eq(Koyomi.format('2015-4-10', 'WAREKI'), '平成二十七年四月十日');
eq(Koyomi.format('2015-4-10', 'wareki'), '平成二十七年四月十日');

eq(Koyomi.format('1989-1-7', 'WAREKI'), '平成元年一月七日');
eq(Koyomi.format('1989-1-7', 'wareki'), '昭和六十四年一月七日');


var koyomi = new Koyomi();

eq(koyomi.format('2015-4-10', 'WAREKI'), '平成二十七年四月十日');
eq(koyomi.format('2015-4-10', 'wareki'), '平成二十七年四月十日');

eq(koyomi.format('1989-1-7', 'WAREKI'), '平成元年一月七日');
eq(koyomi.format('1989-1-7', 'wareki'), '昭和六十四年一月七日');
