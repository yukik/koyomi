// 日時取得
var koyomi = require('../..').create();
var to = koyomi.toDatetime.bind(koyomi);
var eq = require('assert').deepEqual;
var D = require('../../date-extra.js');

koyomi.startMonth = 1;
koyomi.startWeek = '日';

eq(to('２０１５年１０月８日 ８時１５分'), D(2015, 10, 8, 8, 15));
// さらに詳細なテストはutils/to-datetime.jsで