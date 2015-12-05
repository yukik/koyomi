// フォーマット
var koyomi = require('../..').create();
var format = koyomi.format.bind(koyomi);
var eq = require('assert').equal;
var D = require('../../date-extra.js');

var today = new Date();
var y = today.getFullYear();
var m = today.getMonth() + 1;
var d = today.getDate();

// 年齢
// O

eq(format(today, 'O'), '0');

eq(format(D(y - 1, m, d), 'O'), '1');

eq(format(D(y - 10, m, d + 1), 'O'),  '9');
eq(format(D(y - 10, m, d    ), 'O'), '10');
eq(format(D(y - 10, m, d - 1), 'O'), '10');

