// 営業判別
var koyomi = require('../..').create();
var isOpen = koyomi.isOpen.bind(koyomi);
var test = require('assert').equal;

koyomi.regularHoliday = '土,日';
koyomi.seasonHoliday = '12/29-1/3';
koyomi.openOnHoliday = false;

test(isOpen('2015-1-1'), false);
test(isOpen('2015-1-2'), false);
test(isOpen('2015-1-4'), false);
test(isOpen('2015-1-5'), true);
test(isOpen('2015-5-1'), true);
test(isOpen('2015-5-2'), false);