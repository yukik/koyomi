// 1日
var Koyomi = require(global.minify ? '../lib/minify' : '..');
var first = Koyomi.first;
var eq = require('assert').equal;
function test(actual, expected) {
  eq(actual ? actual.toString() : null, expected ? new Date(expected).toString() : null);
}


test(first('2015-1-20'), '2015-1-1');
test(first('2015-1-31'), '2015-1-1');
test(first('2015-2-28'), '2015-2-1');
test(first('2016-2-1'), '2016-2-1');