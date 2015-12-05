// 週番号の取得

var koyomi = require('../..').create();
var get = koyomi.getWeekNumber.bind(koyomi);
var eq = require('assert').deepEqual;

koyomi.startMonth = 1;
koyomi.startWeek = '日';

eq(get('2015-1-1'),  1);

// さらに詳細なテストはutils/get-week-number.jsで