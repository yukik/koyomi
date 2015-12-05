var koyomi = require('../..').create();
var eq = require('assert').deepEqual;

koyomi.startMonth = 2;      eq(koyomi.startMonth, 2);
koyomi.startMonth = 3.14;   eq(koyomi.startMonth, 2);
koyomi.startMonth = null;   eq(koyomi.startMonth, 2);
koyomi.startMonth = 0;      eq(koyomi.startMonth, 2);
koyomi.startMonth = 13;     eq(koyomi.startMonth, 2);

koyomi.startWeek = '水';    eq(koyomi.startWeek, '水');
koyomi.startWeek = 'thu';   eq(koyomi.startWeek, '木');
koyomi.startWeek = '月,火'; eq(koyomi.startWeek, '木');
koyomi.startWeek = null;    eq(koyomi.startWeek, '木');

koyomi.defaultFormat = 'Y/M/D H:II';   eq(koyomi.defaultFormat, '{Y}/{M}/{D} {H}:{II}');
koyomi.defaultFormat = null;           eq(koyomi.defaultFormat, '{Y}/{M}/{D} {H}:{II}');

koyomi.regularHoliday = '土,日';       eq(koyomi.regularHoliday, '日, 土');
koyomi.regularHoliday = '10,20';       eq(koyomi.regularHoliday, '10, 20');
koyomi.regularHoliday = null;          eq(koyomi.regularHoliday, null);

koyomi.seasonHoliday = '12/30-1/2';    eq(koyomi.seasonHoliday, '休業期間 1/1, 1/2, 12/30, 12/31');
koyomi.seasonHoliday = '年末年始の休み12/30-1/2'; eq(koyomi.seasonHoliday, '年末年始の休み 1/1, 1/2, 12/30, 12/31');
koyomi.seasonHoliday = null;  eq(koyomi.seasonHoliday, null);

