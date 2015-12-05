// フォーマット
var koyomi = require('../..').create();
var format = koyomi.format.bind(koyomi);
var eq = require('assert').equal;

// 分 II, I

eq(format('2015-1-1', 'II'), '00');
eq(format('2015-1-1',  'I'),  '0');
eq(format('00:09:10', 'II'), '09');
eq(format('00:09:10',  'I'),  '9');
eq(format('00:12:56', 'II'), '12');
eq(format('00:12:56',  'I'), '12');

