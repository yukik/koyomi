//営業日キャッシュの消去
var koyomi = require('../..').create();
var biz = koyomi.biz.bind(koyomi);
var reset = koyomi.resetBizCache.bind(koyomi);
var eq = require('assert').deepEqual;
var D = require('../../date-extra');

koyomi.startMonth     = 1;
koyomi.startWeek      = '日';
koyomi.regularHoliday = '土,日';
koyomi.seasonHoliday  = '12/29-1/4';
koyomi.openOnHoliday  = false;

var cache = {
  '2015': 19 + 19 + 22 + 21 + 18 + 22 + 22 + 21 + 19 + 21 + 19 + 19,
  '2015-1' : 19,
  '2015-2' : 19,
  '2015-3' : 22,
  '2015-4' : 21,
  '2015-5' : 18,
  '2015-6' : 22,
  '2015-7' : 22,
  '2015-8' : 21,
  '2015-9' : 19,
  '2015-10': 21,
  '2015-11': 19,
  '2015-12': 19
};

eq(biz(2015, 'y'), cache['2015']);
eq(koyomi.bizCache, cache);

reset(D(2015,1,1));
eq(koyomi.bizCache, {
  '2015-2' : 19,
  '2015-3' : 22,
  '2015-4' : 21,
  '2015-5' : 18,
  '2015-6' : 22,
  '2015-7' : 22,
  '2015-8' : 21,
  '2015-9' : 19,
  '2015-10': 21,
  '2015-11': 19,
  '2015-12': 19
});

biz(2015, 'y');
eq(koyomi.bizCache, cache);

reset();
eq(koyomi.bizCache, {});

biz(2015, 'y');
reset('year');
eq(koyomi.bizCache, {
  '2015-1' : 19,
  '2015-2' : 19,
  '2015-3' : 22,
  '2015-4' : 21,
  '2015-5' : 18,
  '2015-6' : 22,
  '2015-7' : 22,
  '2015-8' : 21,
  '2015-9' : 19,
  '2015-10': 21,
  '2015-11': 19,
  '2015-12': 19
});

