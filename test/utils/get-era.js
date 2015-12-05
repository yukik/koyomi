// 年号取得
var get = require('../../lib/utils/getEra');
var eq = require('assert').deepEqual;
var D = require('../../date-extra.js');

var heisei  = {N: '平成', n: 'H', y: 1989, d: D(1989,  1,  8)};
var showa   = {N: '昭和', n: 'S', y: 1926, d: D(1926, 12, 25)};
var taisho  = {N: '大正', n: 'T', y: 1912, d: D(1912,  7, 30)};
var meiji   = {N: '明治', n: 'M', y: 1868, d: D(1868,  1, 25)};
var seireki = {N: '西暦', n: '' , y:    1, d: new Date(-62135629200000)}; // D(1,1,1)

eq(get(D(2015,  5,  5)      ), heisei);
eq(get(D(1989,  1,  1)      ), heisei);
eq(get(D(1989,  1,  1), true), showa);
eq(get(D(1926,  1,  1)      ), showa);
eq(get(D(1926,  1,  1), true), taisho);
eq(get(D(1926, 12, 26)      ), showa);
eq(get(D(1926, 12, 26), true), showa);
eq(get(D(1868,  1,  1)      ), seireki);
eq(get(D(1872, 12, 31)      ), seireki);
eq(get(D(1873,  1,  1)      ), meiji);

