// 祝日休業判別
var koyomi = require('../..').create();
var isClose = koyomi.isHolidayClose.bind(koyomi);
var eq = require('assert').equal;

eq(isClose('2014-12-26') , false);
eq(isClose('2014-12-27') , false);
eq(isClose('2014-12-28') , false);
eq(isClose('2014-12-29') , false);
eq(isClose('2014-12-30') , false);
eq(isClose('2014-12-31') , false);
eq(isClose('2015-1-1')   , true);
eq(isClose('2015-1-2')   , false);
eq(isClose('2015-1-3')   , false);
eq(isClose('2015-1-4')   , false);
eq(isClose('2015-1-5')   , false);
eq(isClose('2015-1-6')   , false);

eq(isClose('2015-5-1') , false);
eq(isClose('2015-5-2') , false);
eq(isClose('2015-5-3') , true);
eq(isClose('2015-5-4') , true);
eq(isClose('2015-5-5') , true);
eq(isClose('2015-5-6') , true);
eq(isClose('2015-5-7') , false);
eq(isClose('2015-5-8') , false);
eq(isClose('2015-5-9') , false);
eq(isClose('2015-5-10'), false);
eq(isClose('2015-5-11'), false);

koyomi.openOnHoliday = true;

eq(isClose('2014-12-26') , false);
eq(isClose('2014-12-27') , false);
eq(isClose('2014-12-28') , false);
eq(isClose('2014-12-29') , false);
eq(isClose('2014-12-30') , false);
eq(isClose('2014-12-31') , false);
eq(isClose('2015-1-1')   , false);
eq(isClose('2015-1-2')   , false);
eq(isClose('2015-1-3')   , false);
eq(isClose('2015-1-4')   , false);
eq(isClose('2015-1-5')   , false);
eq(isClose('2015-1-6')   , false);

eq(isClose('2015-5-1') , false);
eq(isClose('2015-5-2') , false);
eq(isClose('2015-5-3') , false);
eq(isClose('2015-5-4') , false);
eq(isClose('2015-5-5') , false);
eq(isClose('2015-5-6') , false);
eq(isClose('2015-5-7') , false);
eq(isClose('2015-5-8') , false);
eq(isClose('2015-5-9') , false);
eq(isClose('2015-5-10'), false);
eq(isClose('2015-5-11'), false);
