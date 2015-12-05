// フォーマット
var koyomi = require('../..').create();
var format = koyomi.format.bind(koyomi);
var eq = require('assert').equal;

// 存在しないパラメータ文字列
eq(format('2015-4-10', '{Ymd}'), '{Ymd}');
eq(format('2015-4-10', '{YYYY}{m}{d}'), '2015{m}{d}');

// 和暦入力
eq(format('S50-1-2', 'YMMDD'), '19750102');
eq(format('昭和50年1月2日', 'YMMDD'), '19750102');
