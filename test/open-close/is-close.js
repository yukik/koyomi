// 個別営業・休業設定

var koyomi = require('../..').create();
var open = koyomi.open.bind(koyomi);
var close = koyomi.close.bind(koyomi);
var reset = koyomi.reset.bind(koyomi);
var isOpen = koyomi.isOpen.bind(koyomi);
var isClose = koyomi.isClose.bind(koyomi);
var eq = require('assert').deepEqual;

koyomi.regularHoliday = '土,日';
koyomi.seasonHoliday = '12/29-1/3';
koyomi.openOnHoliday = false;

eq(open('2015-5-1'), true);
eq(isOpen('2015-5-1'), true);
eq(isClose('2015-5-1'), false);

eq(close('2015-5-1'), true);
eq(isOpen('2015-5-1'), false);
eq(isClose('2015-5-1'), true);

eq(reset('2015-5-1'), true);
eq(isOpen('2015-5-1'), true);
eq(isClose('2015-5-1'), false);

