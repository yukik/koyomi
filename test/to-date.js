
// Dateオブジェクト変換

var Koyomi = require(global.minify ? '../lib/minify' : '..');
var toDate = Koyomi.toDate.bind(Koyomi);
var eq = require('assert').deepEqual;
var notEq = require('assert').notDeepEqual;

eq(toDate(new Date('2015-5-1')), new Date('2015-5-1 00:00:00.000'));
eq(toDate([2015,5,1]), new Date('2015-5-1 00:00:00.000'));
eq(toDate('2015-5-1'), new Date('2015-5-1 00:00:00.000'));
eq(toDate('H27-5-1'), new Date('2015-5-1 00:00:00.000'));

// trim
notEq(toDate(new Date('2015-5-1 12:34:56')), new Date('2015-5-1 00:00:00.000'));
eq(toDate(new Date('2015-5-1 12:34:56'), true), new Date('2015-5-1 00:00:00.000'));

var x = new Date();
eq(toDate(x), x);
eq(toDate(x) === x, true);                 // 実体そのまま
eq(toDate(x, false, true), x);
eq(toDate(x, false, true) === x, false);   // 複製を返す

