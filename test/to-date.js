// Dateオブジェクト変換
var Koyomi = require('..');
var toDate = Koyomi.toDate.bind(Koyomi);
var eq = require('assert').deepEqual;
var notEq = require('assert').notDeepEqual;
var d = require('../lib/fx/toDate');

var today = new Date();
var y = today.getFullYear();
var m = today.getMonth();
var d = today.getDate();

eq(toDate('2015-5-1')          , new Date(2015, 4, 1));
eq(toDate(new Date(2015, 4, 1)), new Date(2015, 4, 1));
eq(toDate('H27-5-1')           , new Date(2015, 4, 1));
eq(toDate([2015,5,1])          , new Date(2015, 4, 1));

// trim
notEq(toDate('2015-5-1 12:34:56')      , new Date(2015, 4, 1));
eq   (toDate('2015-5-1 12:34:56', true), new Date(2015, 4, 1));

// 複製テスト
var x = new Date();
eq(toDate(x), x);
eq(toDate(x)        === x, true);  // 参照を返す
eq(toDate(x, false), x);
eq(toDate(x, false) === x, false); // 複製を返す


// 漢数字
eq(toDate('二千十五年十月十二日')  , new Date(2015, 9, 12));

// 漢字
eq(toDate('二〇一五年一〇月一二日'), new Date(2015, 9, 12));

// 全角
eq(toDate('２０１５年１０月１２日'), new Date(2015, 9, 12));

// 和暦
eq(toDate('昭和50年10月10日')      , new Date(1975, 9, 10));
eq(toDate('昭和五十年十月十二日')  , new Date(1975, 9, 12));

// 数字
eq(toDate(2015),             new Date(2015,  0,  1         ));
eq(toDate(201501),           new Date(2015,  0,  1         ));
eq(toDate(201511),           new Date(2015, 10,  1         ));
eq(toDate(20150101),         new Date(2015,  0,  1         ));
eq(toDate(20151123),         new Date(2015, 10, 23         ));
eq(toDate(2015112301),       new Date(2015, 10, 23, 1, 0, 0));
eq(toDate(201511230101),     new Date(2015, 10, 23, 1, 1, 0));
eq(toDate(20151123010101),   new Date(2015, 10, 23, 1, 1, 1));

// 数字(型:文字列)
eq(toDate('2015'),           new Date(2015,  0,  1          ));
eq(toDate('201501'),         new Date(2015,  0,  1          ));
eq(toDate('201511'),         new Date(2015, 10,  1          ));
eq(toDate('20150101'),       new Date(2015,  0,  1          ));
eq(toDate('20151123'),       new Date(2015, 10, 23          ));
eq(toDate('2015112301'),     new Date(2015, 10, 23,  1, 0, 0));
eq(toDate('201511230101'),   new Date(2015, 10, 23,  1, 1, 0));
eq(toDate('20151123010101'), new Date(2015, 10, 23,  1, 1, 1));

// 時刻のみ
eq(toDate('10:00'),    new Date(y, m, d, 10,  0,  0));
eq(toDate('am10:00'),  new Date(y, m, d, 10,  0,  0));
eq(toDate('am10'),     new Date(y, m, d, 10,  0,  0));
eq(toDate('pm10:00'),  new Date(y, m, d, 22,  0,  0));
eq(toDate('10:00:20'), new Date(y, m, d, 10,  0, 20));
eq(toDate('8時50分'),  new Date(y, m, d,  8, 50,  0));
eq(toDate('十時'),     new Date(y, m, d, 10,  0,  0));
eq(toDate('午後３時'), new Date(y, m, d, 15,  0,  0));

