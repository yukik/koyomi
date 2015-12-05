// 営業日計算
var koyomi = require('../..').create();
var D = require('../../date-extra.js');

koyomi.regularHoliday ='土,日';
koyomi.seasonHoliday  = '12/29-1/4';
koyomi.openOnHoliday  = false;

/*
     2015/4/27 - 2015/5/10

      月 火 水 木 金 土 日
    4/27 28 29 30  1  2  3
            祝       休 祝
    5/ 4  5  6  7  8  9 10
      祝 祝 祝       休 休
*/

var add = koyomi.addBiz.bind(koyomi);
var eq = require('assert').deepEqual;

eq(add('2015-5-1', 0), D(2015, 5, 1));
eq(add('2015-5-2', 0), D(2015, 5, 7));
eq(add('2015-5-3', 0), D(2015, 5, 7));
eq(add('2015-5-4', 0), D(2015, 5, 7));
eq(add('2015-5-5', 0), D(2015, 5, 7));
eq(add('2015-5-6', 0), D(2015, 5, 7));
eq(add('2015-5-7', 0), D(2015, 5, 7));
eq(add('2015-5-1', 1), D(2015, 5, 7));
eq(add('2015-5-2', 1), D(2015, 5, 7));
eq(add('2015-5-3', 1), D(2015, 5, 7));
eq(add('2015-5-4', 1), D(2015, 5, 7));
eq(add('2015-5-5', 1), D(2015, 5, 7));
eq(add('2015-5-6', 1), D(2015, 5, 7));
eq(add('2015-5-7', 1), D(2015, 5, 8));

// include
eq(add('2015-5-1', 1, true), D(2015, 5, 1));
eq(add('2015-5-2', 1, true), D(2015, 5, 7));
eq(add('2015-5-6', 1, true), D(2015, 5, 7));
eq(add('2015-5-7', 1, true), D(2015, 5, 7));
eq(add('2015-5-1', 1, false), D(2015, 5, 7));
eq(add('2015-5-2', 1, false), D(2015, 5, 7));
eq(add('2015-5-6', 1, false), D(2015, 5, 7));
eq(add('2015-5-7', 1, false), D(2015, 5, 8));

// 年中無休
koyomi.regularHoliday = '';
koyomi.seasonHoliday = '';
koyomi.openOnHoliday = true;
eq(add('2015-5-2' , 1), D(2015, 5, 3));
eq(add('2015-5-3' , 1, true), D(2015, 5, 3));

koyomi.regularHoliday ='土,日';      // 既定に戻す
koyomi.seasonHoliday  = '12/29-1/4'; // 既定に戻す
koyomi.openOnHoliday  = false;       // 既定に戻す


// season
koyomi.seasonHoliday = '12/29-12/31';
eq(add('2015-1-1', 1), D(2015, 1, 2));
koyomi.seasonHoliday = '12/20-1/20';
eq(add('2015-1-1', 1), D(2015, 1, 21));
koyomi.seasonHoliday = '1/1-1/5';
eq(add('2015-1-1', 1), D(2015, 1, 6));
koyomi.seasonHoliday = '12/29-1/6, 1/8';
eq(add('2015-1-1', 1), D(2015, 1, 7));
koyomi.seasonHoliday = '1/1-12/31';
eq(add('2015-1-1', 1), null); // 全休
koyomi.seasonHoliday = '12/29-1/3';    // 既定に戻す

// regular
koyomi.regularHoliday = '土,日';
eq(add('2015-2-13', 1), D(2015, 2, 16));
koyomi.regularHoliday = '';
eq(add('2015-2-13', 1), D(2015, 2, 14));
koyomi.regularHoliday = '木';
eq(add('2015-2-9' , 1), D(2015, 2, 10));
eq(add('2015-2-10', 1), D(2015, 2, 13));
eq(add('2015-2-13', 1), D(2015, 2, 14));
koyomi.regularHoliday = '月,火,水,木,金,土,日';
eq(add('2015-2-13', 1), null);
koyomi.regularHoliday = '5,15,25';
eq(add('2015-2-4' , 1), D(2015, 2, 6));
eq(add('2015-2-6' , 1), D(2015, 2, 7));
koyomi.regularHoliday = '2火,3火';
eq(add('2015-2-9' , 1), D(2015, 2, 12));
eq(add('2015-2-16', 1), D(2015, 2, 18));
koyomi.regularHoliday = function (t) {
  // 毎月 10日, 20日, 30日は定休日
  return t.getDate() % 10 === 0;
};
eq(add('2015-2-8' , 1), D(2015, 2, 9));
eq(add('2015-2-9' , 1), D(2015, 2, 12));
eq(add('2015-2-10', 1), D(2015, 2, 12));
eq(add('2015-2-19', 1), D(2015, 2, 21));
eq(add('2015-4-28', 1), D(2015, 5, 1));
koyomi.regularHoliday = '月,10,2火';  // 混合
eq(add('2015-2-6' , 1), D(2015, 2, 7));
eq(add('2015-2-8' , 1), D(2015, 2, 12));
koyomi.regularHoliday = '土,日';      // 既定に戻す

// holidays
koyomi.openOnHoliday = true;
eq(add('2015-2-10', 1), D(2015, 2, 11));
koyomi.openOnHoliday = false;
eq(add('2015-2-10', 1), D(2015, 2, 12));



