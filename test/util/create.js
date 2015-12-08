var koyomi = require('../..');
var as = require('assert');

var init = {
  startMonth    : koyomi.startMonth,
  startWeek     : koyomi.startWeek,
  regularHoliday: koyomi.regularHoliday,
  seasonHoliday : koyomi.seasonHoliday,
  openOnHoliday : koyomi.openOnHoliday
};

koyomi.startMonth     = 10;
koyomi.startWeek      = '木';
koyomi.regularHoliday = '3水,4水';
koyomi.seasonHoliday  = '7/1-7/4';
koyomi.openOnHoliday  = true;

var original = {
  startMonth    : koyomi.startMonth,
  startWeek     : koyomi.startWeek,
  regularHoliday: koyomi.regularHoliday,
  seasonHoliday : koyomi.seasonHoliday,
  openOnHoliday : koyomi.openOnHoliday
};

var created = koyomi.create();

as(koyomi !== created);

as(created.startMonth     === init.startMonth);
as(created.startWeek      === init.startWeek);
as(created.regularHoliday === init.regularHoliday);
as(created.seasonHoliday  === init.seasonHoliday);
as(created.openOnHoliday  === init.openOnHoliday);

created.startMonth     = 8;
created.startWeek      = '火';
created.regularHoliday = '10,20,30';
created.seasonHoliday  = '11/5-11/10';
created.openOnHoliday  = false;

as(koyomi.startMonth     === original.startMonth);
as(koyomi.startWeek      === original.startWeek);
as(koyomi.regularHoliday === original.regularHoliday);
as(koyomi.seasonHoliday  === original.seasonHoliday);
as(koyomi.openOnHoliday  === original.openOnHoliday);

created.openOnHoliday  = true;
as(created.startMonth     !== init.startMonth);
as(created.startWeek      !== init.startWeek);
as(created.regularHoliday !== init.regularHoliday);
as(created.seasonHoliday  !== init.seasonHoliday);
as(created.openOnHoliday  !== init.openOnHoliday);



