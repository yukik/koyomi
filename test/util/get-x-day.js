// 第x w曜日 計算

var koyomi = require('../..').create();
var get = koyomi.getXDay.bind(koyomi);
var eq = require('assert').deepEqual;
var D = require('../../date-extra.js');

eq(get(1, '月', '2015-1-1'), D(2015, 1, 5));

// さらに詳細なテストはutils/get-x-day.jsで