// ISO週番号の取得

var koyomi = require('../..').create();
var get = koyomi.getISOWeekNumber.bind(koyomi);
var eq = require('assert').deepEqual;

eq(get('2015-1-1'),  1);

// さらに詳細なテストはutils/get-iso-week-number.jsで