// 週番号の取得
var Koyomi = require('..');
var koyomi = new Koyomi();
var get = koyomi.getWeekNumber.bind(koyomi);
var eq = require('assert').equal;


eq(get('2015-1-1'), 1);

koyomi.startMonth = 4;

eq(get('2015-4-1' ), 1);
eq(get( 2015,4,1  ), 1);
eq(get('2015-3-31'), parseInt(365/7, 10) + 1);

koyomi.startWeek = '日';
eq(get('2015-4-1'), 1);
eq(get('2015-4-2'), 1);
eq(get('2015-4-3'), 1);
eq(get('2015-4-4'), 1);
eq(get('2015-4-5'), 2);
eq(get(2015, 4, 1), 1);
eq(get(2015, 4, 2), 1);
eq(get(2015, 4, 3), 1);
eq(get(2015, 4, 4), 1);
eq(get(2015, 4, 5), 2);


koyomi.startWeek = '木';
eq(get('2015-6-1'), 10);
eq(get('2015-6-2'), 10);
eq(get('2015-6-3'), 10);
eq(get('2015-6-4'), 11);
eq(get('2015-6-5'), 11);