// 指定した位の置き換え

var replace = require('../../lib/utils/replaceTerm');
var eq = require('assert').deepEqual;
var D = require('../../date-extra.js');

eq(replace(D(2015, 10, 8), {d: 1})   , D(2015, 10, 1));
eq(replace(D(2015, 2, 28), {d: 31})  , D(2015, 3, 3));
eq(replace(D(2015, 1, 31), {m: 2})   , D(2015, 2, 28));
eq(replace(D(2016, 2, 29), {y: 2015}), D(2015, 2, 28));


