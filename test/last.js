// 末日
var Koyomi = require(global.minify ? '../lib/minify' : '..');
var last = Koyomi.last;
var eq = require('assert').equal;
function test(actual, expected) {
  eq(actual ? actual.toString() : null, expected ? new Date(expected).toString() : null);
}


test(last('2015-1-1'), '2015-1-31');
test(last('2015-1-10'), '2015-1-31');
test(last('2015-2-1'), '2015-2-28');
test(last('2016-2-1'), '2016-2-29');