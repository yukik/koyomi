// 経過日数
var koyomi = require('../..').create();
var pass = koyomi.passDays.bind(koyomi);
var eq = require('assert').equal;

koyomi.startMonth = 1;
eq(pass('2015-3-14', 'y'), 31 + 28 + 14);

koyomi.startMonth = 4;
eq(pass('2015-6-20', 'y'), 30 + 31 + 20);


eq(pass('2015-6-20', 'm'), 20);

koyomi.startWeek = '日';
eq(pass('2015-6-18', 'w'), 5);



