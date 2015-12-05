// 営業日数
var koyomi = require('../..').create();
var biz = koyomi.biz.bind(koyomi);
var eq = require('assert').equal;

koyomi.startMonth = 1;
koyomi.startWeek = '日';
koyomi.regularHoliday ='土,日';
koyomi.seasonHoliday  = '12/29-1/4';
koyomi.openOnHoliday  = false;

eq(biz(2015)     , 19 + 19 + 22 + 21 + 18 + 22 + 22 + 21 + 19 + 21 + 19 + 19);
eq(biz('2015')   , 19 + 19 + 22 + 21 + 18 + 22 + 22 + 21 + 19 + 21 + 19 + 19);

eq(biz('2015-01'), 19);
eq(biz('2015-02'), 19);
eq(biz('2015-03'), 22);
eq(biz('2015-04'), 21);
eq(biz('2015-05'), 18);
eq(biz('2015-06'), 22);
eq(biz('2015-07'), 22);
eq(biz('2015-08'), 21);
eq(biz('2015-09'), 19);
eq(biz('2015-10'), 21);
eq(biz('2015-11'), 19);
eq(biz('2015-12'), 19);

eq(biz('2015年1月'), 19);
eq(biz('２０１５年１月'), 19);
eq(biz('平成二十七年一月'), null);




