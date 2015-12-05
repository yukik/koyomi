// 経過日数
var koyomi = require('../..').create();
var remain = koyomi.remainDays.bind(koyomi);
var eq = require('assert').equal;

koyomi.startMonth = 1;
eq(remain('2015-10-14', 'y'), 18 + 30 + 31);

koyomi.startMonth = 4;
eq(remain('2015-1-20', 'y'), 12 + 28 + 31);


eq(remain('2015-6-20', 'm'), 11);


koyomi.startWeek = '日';
eq(remain('2015-6-18', 'w'), 3);
