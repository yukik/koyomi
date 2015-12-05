// 休業判別
var koyomi = require('../..').create();
var open = koyomi.open.bind(koyomi);
var close = koyomi.close.bind(koyomi);
var reset = koyomi.reset.bind(koyomi);
var isSetOpen = koyomi.isSetOpen.bind(koyomi);
var isSetClose = koyomi.isSetClose.bind(koyomi);
var eq = require('assert').deepEqual;

koyomi.openOnHoliday = false;

// open
eq(open('2015-5-6'), true);
eq(koyomi.dayInfo['2015-5-6'], {events:[], open:true});
eq(isSetOpen('2015-5-5'), false);
eq(isSetOpen('2015-5-6'), true);

// close
eq(close('2015-10-14'), true);
eq(koyomi.dayInfo['2015-10-14'], {events:[], close:true});
eq(isSetClose('2015-10-13'), false);
eq(isSetClose('2015-10-14'), true);


eq(koyomi.dayInfo['2015-10-15'], undefined);
eq(open('2015-10-15'), true);
eq(koyomi.dayInfo['2015-10-15'], {events: [], open: true});
eq(close('2015-10-15'), true);
eq(koyomi.dayInfo['2015-10-15'], {events: [], close: true});
eq(reset('2015-10-15'), true);
eq(koyomi.dayInfo['2015-10-15'], {events: []});