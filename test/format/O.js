// フォーマット
var Koyomi = require('../..');
var format = Koyomi.format.bind(Koyomi);
var eq = require('assert').equal;

var today = new Date();
var y = today.getFullYear();
var m = today.getMonth();
var d = today.getDate();

// 年齢
// O

eq(format(today, 'O'), '0');

eq(format(new Date(y - 1, m, d), 'O'), '1');

eq(format(new Date(y - 10, m, d + 1), 'O'),  '9');
eq(format(new Date(y - 10, m, d    ), 'O'), '10');
eq(format(new Date(y - 10, m, d - 1), 'O'), '10');

