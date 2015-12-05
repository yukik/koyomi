// 指定した位の加減

var add = require('../../lib/utils/addTerm');
var eq = require('assert').deepEqual;
var D = require('../../date-extra.js');

eq(add(D(2015, 10, 8), {d: 1}) , D(2015, 10, 9));

eq(add(D(2015, 1, 31), {m:  1}), D(2015, 2, 28));
eq(add(D(2015, 2, 28), {m: -1}), D(2015, 1, 28));
