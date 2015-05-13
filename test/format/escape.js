// フォーマット
var Koyomi = require('../..');
var format = Koyomi.format.bind(Koyomi);
var eq = require('assert').equal;

eq(format('2015-4-10', '{YYYY}/{MM}/{DD} updated'), '2015/04/10 updated');
eq(format('2015-4-10', 'YYYY{MM}DD'), 'YYYY04DD');

eq(format('2015-4-10', '{M}'), '4');
eq(format('2015-4-10', '{M>2}'), '04');