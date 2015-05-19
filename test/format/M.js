//フォーマット
var Koyomi = require('../..');
var format = Koyomi.format.bind(Koyomi);
var eq = require('assert').equal;

// 月もしくは分

// MMM, MM, M, Mj

eq(format('2015-1-1' , 'MMM'), 'January');
eq(format('2015-2-1' , 'MMM'), 'February');
eq(format('2015-3-1' , 'MMM'), 'March');
eq(format('2015-4-1' , 'MMM'), 'April');
eq(format('2015-5-1' , 'MMM'), 'May');
eq(format('2015-6-1' , 'MMM'), 'June');
eq(format('2015-7-1' , 'MMM'), 'July');
eq(format('2015-8-1' , 'MMM'), 'August');
eq(format('2015-9-1' , 'MMM'), 'September');
eq(format('2015-10-1', 'MMM'), 'October');
eq(format('2015-11-1', 'MMM'), 'November');
eq(format('2015-12-1', 'MMM'), 'December');

eq(format('2015-4-1' , 'MM'), '04');
eq(format('2015-12-1', 'MM'), '12');

eq(format('2015-4-1' , 'M'), '4');
eq(format('2015-12-1', 'M'), '12');

eq(format('2015-12-1', 'M>>漢数字'), '十二');



// mm, m

eq(format('2015-1-1', 'mm'), '00');
eq(format('2015-1-1',  'm'),  '0');
eq(format('00:09:10', 'mm'), '09');
eq(format('00:09:10',  'm'),  '9');
eq(format('00:12:56', 'mm'), '12');
eq(format('00:12:56',  'm'), '12');

