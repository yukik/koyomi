
// 年号取得
var Koyomi = require('..');
var get = Koyomi.getNengo.bind(Koyomi);
var eq = require('assert').deepEqual;

var heisei  = {N: '平成', n: 'H', y: 1989, d: new Date('1989-01-08 00:00:00.000')};
var showa   = {N: '昭和', n: 'S', y: 1926, d: new Date('1926-12-25 00:00:00.000')};
var taisho  = {N: '大正', n: 'T', y: 1912, d: new Date('1912-07-30 00:00:00.000')};
var meiji   = {N: '明治', n: 'M', y: 1868, d: new Date('1868-01-25 00:00:00.000')};
var seireki = {N: '西暦', n: '' , y:    1, d: new Date('0001-01-01 00:00:00.000')};


eq(get('2015-5-5'), heisei);
eq(get('1989-1-1'), heisei);
eq(get('1989-1-1', true), showa);
eq(get('1926-1-1'), showa);
eq(get('1926-1-1', true), taisho);
eq(get('1926-12-26'), showa);
eq(get('1926-12-26', true), showa);
eq(get('1868-1-1'), seireki);
eq(get('1872-12-31'), seireki);
eq(get('1873-1-1'), meiji);