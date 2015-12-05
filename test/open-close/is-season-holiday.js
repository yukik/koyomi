// 年末年始・お盆の休み判別
var koyomi = require('../..').create();
var season = koyomi.isSeasonHoliday.bind(koyomi);
var eq = require('assert').equal;

koyomi.seasonHoliday = '年末年始のお休み 12/29-1/3';

eq(season('2014-12-26') , false);
eq(season('2014-12-27') , false);
eq(season('2014-12-28') , false);
eq(season('2014-12-29') , '年末年始のお休み');
eq(season('2014-12-30') , '年末年始のお休み');
eq(season('2014-12-31') , '年末年始のお休み');
eq(season('2015-1-1')   , '年末年始のお休み');
eq(season('2015-1-2')   , '年末年始のお休み');
eq(season('2015-1-3')   , '年末年始のお休み');
eq(season('2015-1-4')   , false);
eq(season('2015-1-5')   , false);
eq(season('2015-1-6')   , false);

eq(season('2015-5-1') , false);
eq(season('2015-5-2') , false);
eq(season('2015-5-3') , false);
eq(season('2015-5-4') , false);
eq(season('2015-5-5') , false);
eq(season('2015-5-6') , false);
eq(season('2015-5-7') , false);
eq(season('2015-5-8') , false);
eq(season('2015-5-9') , false);
eq(season('2015-5-10'), false);
eq(season('2015-5-11'), false);

koyomi.seasonHoliday = '12/30-1/2, 8/16-8/18';
eq(season('2014-12-28') , false);
eq(season('2014-12-29') , false);
eq(season('2014-12-30') , '休業期間');
eq(season('2014-12-31') , '休業期間');
eq(season('2015-1-1')   , '休業期間');
eq(season('2015-1-2')   , '休業期間');
eq(season('2015-1-3')   , false);
eq(season('2015-1-4')   , false);
eq(season('2015-1-5')   , false);

eq(season('2015-8-14') , false);
eq(season('2015-8-15') , false);
eq(season('2015-8-16') , '休業期間');
eq(season('2015-8-17') , '休業期間');
eq(season('2015-8-18') , '休業期間');
eq(season('2015-8-19') , false);
eq(season('2015-8-20') , false);

koyomi.seasonHoliday = '';
eq(season('2014-12-28') , false);
eq(season('2014-12-29') , false);
eq(season('2014-12-30') , false);
eq(season('2014-12-31') , false);
eq(season('2015-1-1')   , false);
eq(season('2015-1-2')   , false);
eq(season('2015-1-3')   , false);
eq(season('2015-1-4')   , false);
eq(season('2015-1-5')   , false);


koyomi.seasonHoliday = '8/8-8/7';   // 同月での範囲不正はnullと同じ
eq(season('2014-12-28') , false);
eq(season('2014-12-29') , false);
eq(season('2014-12-30') , false);
eq(season('2014-12-31') , false);
eq(season('2015-1-1')   , false);
eq(season('2015-1-2')   , false);
eq(season('2015-1-3')   , false);
eq(season('2015-1-4')   , false);
eq(season('2015-1-5')   , false);

koyomi.seasonHoliday = function (d) {return d.getFullYear() === 2015 && d.getMonth() === 8-1 ? '休業期間' : false;};
eq(season('2015-1-1')   , false);
eq(season('2015-1-2')   , false);
eq(season('2015-1-3')   , false);
eq(season('2015-1-4')   , false);
eq(season('2015-1-5')   , false);
eq(season('2015-8-14') , '休業期間');
eq(season('2015-8-15') , '休業期間');
eq(season('2015-8-16') , '休業期間');
eq(season('2015-8-17') , '休業期間');
eq(season('2015-8-18') , '休業期間');
eq(season('2015-8-19') , '休業期間');
eq(season('2015-8-20') , '休業期間');





