// フォーマット
var Koyomi = require('../..');
var format = Koyomi.format.bind(Koyomi);
var eq = require('assert').equal;

// 年
// YYYY Y y

eq(format('2015-1-1', 'YYYY'), '2015');
eq(format('2015-1-1', 'Y'   ), '2015');
eq(format('2015-1-1', 'y'   ),   '15');


eq(format('980-1-1', 'YYYY'), '0980');
eq(format('980-1-1', 'Y'   ),  '980');
eq(format('980-1-1', 'y'   ),   '80');

eq(format('2015-1-1', 'Y>9'), '000002015');


