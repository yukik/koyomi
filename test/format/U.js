//フォーマット
var Koyomi = require('../..');
var format = Koyomi.format.bind(Koyomi);
var eq = require('assert').equal;

// 月 - 総日数、経過日数、残日数
// UU U u
eq(format(20150101, 'UU') , '31');
eq(format(20150101, 'U')  ,  '1');
eq(format(20150102, 'u')  , '30');
