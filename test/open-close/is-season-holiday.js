
// 定休日判別
var Koyomi = require('../..');
var koyomi = new Koyomi();
var season = koyomi.isSeasonHoliday.bind(koyomi);
var test = require('assert').equal;


test(season('2014-12-26') , false);
test(season('2014-12-27') , false);
test(season('2014-12-28') , false);
test(season('2014-12-29') , true);
test(season('2014-12-30') , true);
test(season('2014-12-31') , true);
test(season('2015-1-1')   , true);
test(season('2015-1-2')   , true);
test(season('2015-1-3')   , true);
test(season('2015-1-4')   , false);
test(season('2015-1-5')   , false);
test(season('2015-1-6')   , false);

test(season('2015-5-1') , false);
test(season('2015-5-2') , false);
test(season('2015-5-3') , false);
test(season('2015-5-4') , false);
test(season('2015-5-5') , false);
test(season('2015-5-6') , false);
test(season('2015-5-7') , false);
test(season('2015-5-8') , false);
test(season('2015-5-9') , false);
test(season('2015-5-10'), false);
test(season('2015-5-11'), false);

koyomi.seasonHoliday = '12/30-1/2, 8/16-8/18';
test(season('2014-12-28') , false);
test(season('2014-12-29') , false);
test(season('2014-12-30') , true);
test(season('2014-12-31') , true);
test(season('2015-1-1')   , true);
test(season('2015-1-2')   , true);
test(season('2015-1-3')   , false);
test(season('2015-1-4')   , false);
test(season('2015-1-5')   , false);

test(season('2015-8-14') , false);
test(season('2015-8-15') , false);
test(season('2015-8-16') , true);
test(season('2015-8-17') , true);
test(season('2015-8-18') , true);
test(season('2015-8-19') , false);
test(season('2015-8-20') , false);

koyomi.seasonHoliday = '';
test(season('2014-12-28') , false);
test(season('2014-12-29') , false);
test(season('2014-12-30') , false);
test(season('2014-12-31') , false);
test(season('2015-1-1')   , false);
test(season('2015-1-2')   , false);
test(season('2015-1-3')   , false);
test(season('2015-1-4')   , false);
test(season('2015-1-5')   , false);


koyomi.seasonHoliday = '8/8-8/7';   // 同月での範囲不正はnullと同じ
test(season('2014-12-28') , false);
test(season('2014-12-29') , false);
test(season('2014-12-30') , false);
test(season('2014-12-31') , false);
test(season('2015-1-1')   , false);
test(season('2015-1-2')   , false);
test(season('2015-1-3')   , false);
test(season('2015-1-4')   , false);
test(season('2015-1-5')   , false);

koyomi.seasonHoliday = function (d) {return d.getFullYear() === 2015 && d.getMonth() === 8 - 1;};
test(season('2015-1-1')   , false);
test(season('2015-1-2')   , false);
test(season('2015-1-3')   , false);
test(season('2015-1-4')   , false);
test(season('2015-1-5')   , false);
test(season('2015-8-14') , true);
test(season('2015-8-15') , true);
test(season('2015-8-16') , true);
test(season('2015-8-17') , true);
test(season('2015-8-18') , true);
test(season('2015-8-19') , true);
test(season('2015-8-20') , true);





