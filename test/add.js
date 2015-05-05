// 日計算
var Koyomi = require(global.minify ? '../lib/minify' : '..');
var add = Koyomi.add;
var eq = require('assert').equal;
function test(actual, expected) {
  eq(actual ? actual.toString() : null, expected ? new Date(expected).toString() : null);
}

test(add('2015-1-1', '5年'), '2020-1-1');
test(add('2015-1-2', '5日'), '2015-1-7');
test(add('2015-1-31', '1ケ月'), '2015-2-28');
test(add('2015-1-2', '5日'), '2015-1-7');


console.log('todo add test');










