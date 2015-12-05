// 定休日判別
var koyomi = require('../..').create();
var regular = koyomi.isRegularHoliday.bind(koyomi);
var eq = require('assert').equal;


eq(regular('2014-12-26') , false);
eq(regular('2014-12-27') , true);
eq(regular('2014-12-28') , true);
eq(regular('2014-12-29') , false);
eq(regular('2014-12-30') , false);
eq(regular('2014-12-31') , false);
eq(regular('2015-1-1')   , false);
eq(regular('2015-1-2')   , false);
eq(regular('2015-1-3')   , true);
eq(regular('2015-1-4')   , true);
eq(regular('2015-1-5')   , false);
eq(regular('2015-1-6')   , false);

eq(regular('2015-5-1') , false);
eq(regular('2015-5-2') , true);
eq(regular('2015-5-3') , true);
eq(regular('2015-5-4') , false);
eq(regular('2015-5-5') , false);
eq(regular('2015-5-6') , false);
eq(regular('2015-5-7') , false);
eq(regular('2015-5-8') , false);
eq(regular('2015-5-9') , true);
eq(regular('2015-5-10'), true);
eq(regular('2015-5-11'), false);

koyomi.regularHoliday = '';
eq(regular('2015-5-1') , false);
eq(regular('2015-5-2') , false);
eq(regular('2015-5-3') , false);
eq(regular('2015-5-4') , false);
eq(regular('2015-5-5') , false);
eq(regular('2015-5-6') , false);
eq(regular('2015-5-7') , false);

koyomi.regularHoliday = '木';
eq(regular('2015-5-1') , false);
eq(regular('2015-5-2') , false);
eq(regular('2015-5-3') , false);
eq(regular('2015-5-4') , false);
eq(regular('2015-5-5') , false);
eq(regular('2015-5-6') , false);
eq(regular('2015-5-7') , true);
eq(regular('2015-5-8') , false);
eq(regular('2015-5-9') , false);
eq(regular('2015-5-10'), false);
eq(regular('2015-5-11'), false);

koyomi.regularHoliday = null;
eq(regular('2015-5-1') , false);
eq(regular('2015-5-2') , false);
eq(regular('2015-5-3') , false);
eq(regular('2015-5-4') , false);
eq(regular('2015-5-5') , false);
eq(regular('2015-5-6') , false);
eq(regular('2015-5-7') , false);

koyomi.regularHoliday = '3,6,9';
eq(regular('2015-5-1') , false);
eq(regular('2015-5-2') , false);
eq(regular('2015-5-3') , true);
eq(regular('2015-5-4') , false);
eq(regular('2015-5-5') , false);
eq(regular('2015-5-6') , true);
eq(regular('2015-5-7') , false);
eq(regular('2015-5-8') , false);
eq(regular('2015-5-9') , true);
eq(regular('2015-5-10'), false);
eq(regular('2015-5-11'), false);

koyomi.regularHoliday = '1木,3木';
eq(regular('2015-5-1') , false);
eq(regular('2015-5-2') , false);
eq(regular('2015-5-3') , false);
eq(regular('2015-5-4') , false);
eq(regular('2015-5-5') , false);
eq(regular('2015-5-6') , false);
eq(regular('2015-5-7') , true);
eq(regular('2015-5-8') , false);
eq(regular('2015-5-14'), false);
eq(regular('2015-5-15'), false);
eq(regular('2015-5-21'), true);

koyomi.regularHoliday = function (d) {return d.getDate() % 10 === 0;};
eq(regular('2015-5-1') , false);
eq(regular('2015-5-2') , false);
eq(regular('2015-5-10'), true);
eq(regular('2015-5-11'), false);
eq(regular('2015-5-20'), true);
eq(regular('2015-5-21'), false);
eq(regular('2015-5-30'), true);





