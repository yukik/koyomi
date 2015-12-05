// 期間
var koyomi = require('../..').create();
var days = koyomi.days.bind(koyomi);
var eq = require('assert').equal;

// (yyyymm)
koyomi.startMonth = 1;
eq(days(1999)    , 365);
eq(days(2000)    , 366);
eq(days('2000年'), 366);

koyomi.startMonth = 4;
eq(days(1999)    , 366);
eq(days(2000)    , 365);
eq(days('2000年'), 365);


eq(days(200008)     ,  31);
eq(days('2000-08')  ,  31);
eq(days('2000-8')   ,  31);
eq(days('2000年8月'),  31);


// (date, term)
koyomi.startMonth = 1;
eq(days(1999    , 'y'), 365);
eq(days(2000    , 'y'), 366);
eq(days('2000年', 'y'), 366);

koyomi.startMonth = 4;
eq(days(1999    , 'y'), 366);
eq(days(2000    , 'y'), 365);
eq(days('2000年', 'y'), 365);

eq(days(200008     , 'm'),  31);
eq(days('2000-08'  , 'm'),  31);
eq(days('2000-8'   , 'm'),  31);
eq(days('2000年8月', 'm'),  31);

// (from, to)
eq(days('2015-1-1'  , '2015-1-15') , 15);
eq(days('2015-1-1'  , '2015-12-31'), 365);
eq(days('2015-10-10', '2016-1-15') , 22 + 30 + 31 + 15);


