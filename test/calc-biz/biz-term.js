// 営業日数
var koyomi = require('../..').create();
var biz = koyomi.biz.bind(koyomi);
var eq = require('assert').equal;
require('../../date-extra.js');

koyomi.startMonth     = 1;
koyomi.startWeek      = '日';
koyomi.regularHoliday = '土,日';
koyomi.seasonHoliday  = '12/29-1/4';
koyomi.openOnHoliday  = false;

eq(biz(2015, 'y'), 19 + 19 + 22 + 21 + 18 + 22 + 22 + 21 + 19 + 21 + 19 + 19);
eq(biz('2015-01', 'm'), 19);
eq(biz('2015-1-13', 'w'), 4);
eq(biz('2015-1-13', 'd'), 1);