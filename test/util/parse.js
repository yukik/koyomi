// 口語を日時に

var koyomi = require('../..').create();
var parse = koyomi.parse.bind(koyomi);
var eq = require('assert').deepEqual;
var D = require('../../date-extra.js');

var now = new Date();
var y = now.getFullYear();
var m = now.getMonth() + 1;
var d = now.getDate();

koyomi.startMonth = 1;
koyomi.startWeek = '日';
koyomi.regularHoliday = null;
koyomi.seasonHoliday = null;
koyomi.openOnHoliday = true;

// 口語
eq(parse('今日'), D(y, m, d));
// さらに詳細なテストはutils/parse.jsで

// 営業日
eq(parse('３営業日'), D(y, m, d+3));
// さらに詳細なテストはcalc-biz/add-biz.jsで

// toDatetimeに委譲
eq(parse('２０１５年１０月８日 ８時１５分'), D(2015, 10, 8, 8, 15));
// さらに詳細なテストはutils/to-datetime.jsで