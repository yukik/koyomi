// 第x w曜日 計算
var get = require('../../lib/utils/getXDay');
var eq = require('assert').deepEqual;
var D = require('../../date-extra.js');

var SUN = 0;
var MON = 1;
var TUE = 2;
var WED = 3;
var THU = 4;
var FRI = 5;
var SAT = 6;

eq(get(2015, 1, 1, MON), D(2015, 1,  5));
eq(get(2015, 1, 2, MON), D(2015, 1, 12));
eq(get(2015, 1, 3, MON), D(2015, 1, 19));
eq(get(2015, 1, 4, MON), D(2015, 1, 26));
eq(get(2015, 1, 1, SAT), D(2015, 1,  3));
eq(get(2015, 1, 4, SAT), D(2015, 1, 24));
eq(get(2015, 1, 5, SUN), D(2015, 1, 25));
eq(get(2015, 1, 5, MON), D(2015, 1, 26));
eq(get(2015, 1, 5, TUE), D(2015, 1, 27));
eq(get(2015, 1, 5, WED), D(2015, 1, 28));
eq(get(2015, 1, 5, THU), D(2015, 1, 29));
eq(get(2015, 1, 5, FRI), D(2015, 1, 30));
eq(get(2015, 1, 5, SAT), D(2015, 1, 31));
eq(get(2015, 5, 4, SUN), D(2015, 5, 24));
eq(get(2015, 5, 5, SUN), D(2015, 5, 31));
eq(get(2015, 5, 5, MON), D(2015, 5, 25));
eq(get(2015, 5, 5, TUE), D(2015, 5, 26));
eq(get(2015, 5, 5, WED), D(2015, 5, 27));
eq(get(2015, 5, 5, THU), D(2015, 5, 28));
eq(get(2015, 5, 5, FRI), D(2015, 5, 29));
eq(get(2015, 5, 5, SAT), D(2015, 5, 30));
