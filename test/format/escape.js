// フォーマット
var koyomi = require('../..').create();
var format = koyomi.format.bind(koyomi);
var eq = require('assert').equal;

eq(format('2015-4-10', '{Y}/{MM}/{DD} updated'), '2015/04/10 updated');
eq(format('2015-4-10', 'Y{MM}DD'), 'Y04DD');

eq(format('2015-4-10', '{M}'), '4');
eq(format('2015-4-10', '{M>2}'), '04');