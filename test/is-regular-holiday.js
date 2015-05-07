
// 定休日判別
var Koyomi = require(global.minify ? '../lib/minify' : '..');
var koyomi = new Koyomi();
var regular = koyomi.isRegularHoliday.bind(koyomi);
var test = require('assert').equal;


test(regular('2014-12-26') , false);
test(regular('2014-12-27') , true);
test(regular('2014-12-28') , true);
test(regular('2014-12-29') , false);
test(regular('2014-12-30') , false);
test(regular('2014-12-31') , false);
test(regular('2015-1-1')   , false);
test(regular('2015-1-2')   , false);
test(regular('2015-1-3')   , true);
test(regular('2015-1-4')   , true);
test(regular('2015-1-5')   , false);
test(regular('2015-1-6')   , false);

test(regular('2015-5-1') , false);
test(regular('2015-5-2') , true);
test(regular('2015-5-3') , true);
test(regular('2015-5-4') , false);
test(regular('2015-5-5') , false);
test(regular('2015-5-6') , false);
test(regular('2015-5-7') , false);
test(regular('2015-5-8') , false);
test(regular('2015-5-9') , true);
test(regular('2015-5-10'), true);
test(regular('2015-5-11'), false);

koyomi.regularHoliday = '';
test(regular('2015-5-1') , false);
test(regular('2015-5-2') , false);
test(regular('2015-5-3') , false);
test(regular('2015-5-4') , false);
test(regular('2015-5-5') , false);
test(regular('2015-5-6') , false);
test(regular('2015-5-7') , false);

koyomi.regularHoliday = '木';
test(regular('2015-5-1') , false);
test(regular('2015-5-2') , false);
test(regular('2015-5-3') , false);
test(regular('2015-5-4') , false);
test(regular('2015-5-5') , false);
test(regular('2015-5-6') , false);
test(regular('2015-5-7') , true);
test(regular('2015-5-8') , false);
test(regular('2015-5-9') , false);
test(regular('2015-5-10'), false);
test(regular('2015-5-11'), false);

koyomi.regularHoliday = null;
test(regular('2015-5-1') , false);
test(regular('2015-5-2') , false);
test(regular('2015-5-3') , false);
test(regular('2015-5-4') , false);
test(regular('2015-5-5') , false);
test(regular('2015-5-6') , false);
test(regular('2015-5-7') , false);

koyomi.regularHoliday = '3,6,9';
test(regular('2015-5-1') , false);
test(regular('2015-5-2') , false);
test(regular('2015-5-3') , true);
test(regular('2015-5-4') , false);
test(regular('2015-5-5') , false);
test(regular('2015-5-6') , true);
test(regular('2015-5-7') , false);
test(regular('2015-5-8') , false);
test(regular('2015-5-9') , true);
test(regular('2015-5-10'), false);
test(regular('2015-5-11'), false);

koyomi.regularHoliday = '1木,3木';
test(regular('2015-5-1') , false);
test(regular('2015-5-2') , false);
test(regular('2015-5-3') , false);
test(regular('2015-5-4') , false);
test(regular('2015-5-5') , false);
test(regular('2015-5-6') , false);
test(regular('2015-5-7') , true);
test(regular('2015-5-8') , false);
test(regular('2015-5-14'), false);
test(regular('2015-5-15'), false);
test(regular('2015-5-21'), true);

koyomi.regularHoliday = function (d) {return d.getDate() % 10 === 0;};
test(regular('2015-5-1') , false);
test(regular('2015-5-2') , false);
test(regular('2015-5-10'), true);
test(regular('2015-5-11'), false);
test(regular('2015-5-20'), true);
test(regular('2015-5-21'), false);
test(regular('2015-5-30'), true);





