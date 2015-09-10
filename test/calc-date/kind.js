// 口語表現
var Koyomi = require('../..');
var kind = Koyomi.kind;
var eq = require('assert').equal;

eq(kind(new Date()), 'たった今');
eq(kind('2:00', '1:55'), '5分後');


// TODO: テストの充実