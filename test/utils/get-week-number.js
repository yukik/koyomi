// 週番号の取得
var get = require('../../lib/utils/getWeekNumber');
var eq = require('assert').equal;
var D = require('../../date-extra.js');

var SUN = 0;
var MON = 1;
var THU = 4;


eq(get(D(2015, 1, 1), SUN, 1), 1);

eq(get(D(2015, 4, 1), SUN, 4), 1);
eq(get(D(2015, 4, 2), SUN, 4), 1);
eq(get(D(2015, 4, 3), SUN, 4), 1);
eq(get(D(2015, 4, 4), SUN, 4), 1);
eq(get(D(2015, 4, 5), SUN, 4), 2);

eq(get(D(2015, 6, 1), THU, 4), 10);
eq(get(D(2015, 6, 2), THU, 4), 10);
eq(get(D(2015, 6, 3), THU, 4), 10);
eq(get(D(2015, 6, 4), THU, 4), 11);
eq(get(D(2015, 6, 5), THU, 4), 11);

eq(get(D(2015, 4, 1), MON, 4), 1);
eq(get(D(2015, 4, 1), MON, 4), 1);

eq(get(D(2015, 4, 1), SUN, 4), 1);
eq(get(D(2015, 4, 2), SUN, 4), 1);
eq(get(D(2015, 4, 3), SUN, 4), 1);
eq(get(D(2015, 4, 4), SUN, 4), 1);
eq(get(D(2015, 4, 5), SUN, 4), 2);

eq(get(D(2015, 6, 1), THU, 4), 10);
eq(get(D(2015, 6, 2), THU, 4), 10);
eq(get(D(2015, 6, 3), THU, 4), 10);
eq(get(D(2015, 6, 4), THU, 4), 11);
eq(get(D(2015, 6, 5), THU, 4), 11);