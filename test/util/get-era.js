// 年号取得
var koyomi = require('../..').create();
var get = koyomi.getEra.bind(koyomi);
var eq = require('assert').deepEqual;
var D = require('../../date-extra.js');

var reiwa   = {N: '令和', n: 'R', y: 2019, d: D(2019,  5,  1)};
var heisei  = {N: '平成', n: 'H', y: 1989, d: D(1989,  1,  8)};
var showa   = {N: '昭和', n: 'S', y: 1926, d: D(1926, 12, 25)};

eq(get('2019-5-1', true), reiwa);
eq(get('1989-1-1'      ), heisei);
eq(get('1989-1-1', true), showa);

// さらに詳細なテストはutils/get-era.jsで