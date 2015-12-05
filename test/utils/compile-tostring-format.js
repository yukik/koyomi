// フォーマットのコンパイル
var format   = require('../../lib/utils/compileFormat');
var toString = require('../../lib/utils/toStringFormat');
var eq = require('assert').deepEqual;

eq(format('A'), {v: [{p:'A'}]});
eq(toString({v: [{p:'A'}]}), '{A}');

eq(format('YYYY年MM月DD日(W>1)>>漢数字'), {v : [{p:'YYYY'}, '年', {p:'MM'}, '月', {p:'DD'}, '日(', {p:'W', o:1}, ')'], o: {kansuji: true}});
eq(toString({v : [{p:'YYYY'}, '年', {p:'MM'}, '月', {p:'DD'}, '日(', {p:'W', o:1}, ')'], o: {kansuji: true}}), '{YYYY}年{MM}月{DD}日({W>1})>>漢数字');

