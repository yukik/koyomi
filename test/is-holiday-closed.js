
// 祝日休業判別
var Koyomi = require(global.minify ? '../lib/minify' : '..');
var koyomi = new Koyomi();
var isClosed = koyomi.isHolidayClosed.bind(koyomi);
var test = require('assert').equal;

test(isClosed('2014-12-26') , false);
test(isClosed('2014-12-27') , false);
test(isClosed('2014-12-28') , false);
test(isClosed('2014-12-29') , false);
test(isClosed('2014-12-30') , false);
test(isClosed('2014-12-31') , false);
test(isClosed('2015-1-1')   , true);
test(isClosed('2015-1-2')   , false);
test(isClosed('2015-1-3')   , false);
test(isClosed('2015-1-4')   , false);
test(isClosed('2015-1-5')   , false);
test(isClosed('2015-1-6')   , false);

test(isClosed('2015-5-1') , false);
test(isClosed('2015-5-2') , false);
test(isClosed('2015-5-3') , true);
test(isClosed('2015-5-4') , true);
test(isClosed('2015-5-5') , true);
test(isClosed('2015-5-6') , true);
test(isClosed('2015-5-7') , false);
test(isClosed('2015-5-8') , false);
test(isClosed('2015-5-9') , false);
test(isClosed('2015-5-10'), false);
test(isClosed('2015-5-11'), false);

koyomi.holidayOpened = true;

test(isClosed('2014-12-26') , false);
test(isClosed('2014-12-27') , false);
test(isClosed('2014-12-28') , false);
test(isClosed('2014-12-29') , false);
test(isClosed('2014-12-30') , false);
test(isClosed('2014-12-31') , false);
test(isClosed('2015-1-1')   , false);
test(isClosed('2015-1-2')   , false);
test(isClosed('2015-1-3')   , false);
test(isClosed('2015-1-4')   , false);
test(isClosed('2015-1-5')   , false);
test(isClosed('2015-1-6')   , false);

test(isClosed('2015-5-1') , false);
test(isClosed('2015-5-2') , false);
test(isClosed('2015-5-3') , false);
test(isClosed('2015-5-4') , false);
test(isClosed('2015-5-5') , false);
test(isClosed('2015-5-6') , false);
test(isClosed('2015-5-7') , false);
test(isClosed('2015-5-8') , false);
test(isClosed('2015-5-9') , false);
test(isClosed('2015-5-10'), false);
test(isClosed('2015-5-11'), false);
