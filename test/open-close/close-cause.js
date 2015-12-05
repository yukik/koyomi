// 休業判別
var koyomi = require('../..').create();
var cause = koyomi.closeCause.bind(koyomi);
var close = koyomi.close.bind(koyomi);
var eq = require('assert').equal;


koyomi.regularHoliday = '土,日';
koyomi.seasonHoliday = '年末年始のお休み 12/29-1/3';
koyomi.openOnHoliday = false;


eq(cause('2015-1-1'), '年末年始のお休み');

close('2015-10-10');
eq(cause('2015-10-10'), '臨時休業');

close('2015-1-1');
eq(cause('2015-1-1'), '臨時休業');


eq(cause('2015-1-4'), '定休日');
