//フォーマット
var Koyomi = require('../..');
var format = Koyomi.format.bind(Koyomi);
var eq = require('assert').equal;

// 曜日
// WW W Wj
eq(format('2015-1-1' , 'WW'), 'Thursday');
eq(format('2015-1-2' , 'WW'), 'Friday');
eq(format('2015-1-3' , 'WW'), 'Saturday');
eq(format('2015-1-4' , 'WW'), 'Sunday');
eq(format('2015-1-5' , 'WW'), 'Monday');
eq(format('2015-1-6' , 'WW'), 'Tuesday');
eq(format('2015-1-7' , 'WW'), 'Wednesday');

eq(format('2015-1-1' , 'WW>3'), 'Thu');
eq(format('2015-1-2' , 'WW>3'), 'Fri');
eq(format('2015-1-3' , 'WW>3'), 'Sat');
eq(format('2015-1-4' , 'WW>3'), 'Sun');
eq(format('2015-1-5' , 'WW>3'), 'Mon');
eq(format('2015-1-6' , 'WW>3'), 'Tue');
eq(format('2015-1-7' , 'WW>3'), 'Wed');

eq(format('2015-1-1' , 'W'), '4');
eq(format('2015-1-2' , 'W'), '5');
eq(format('2015-1-3' , 'W'), '6');
eq(format('2015-1-4' , 'W'), '0');
eq(format('2015-1-5' , 'W'), '1');
eq(format('2015-1-6' , 'W'), '2');
eq(format('2015-1-7' , 'W'), '3');


eq(format('2015-1-1' , 'W>>全角'), '４');
eq(format('2015-1-2' , 'W>>全角'), '５');
eq(format('2015-1-3' , 'W>>全角'), '６');
eq(format('2015-1-4' , 'W>>全角'), '０');
eq(format('2015-1-5' , 'W>>全角'), '１');
eq(format('2015-1-6' , 'W>>全角'), '２');
eq(format('2015-1-7' , 'W>>全角'), '３');


eq(format('2015-1-1' , 'Wj'), '木曜日');
eq(format('2015-1-2' , 'Wj'), '金曜日');
eq(format('2015-1-3' , 'Wj'), '土曜日');
eq(format('2015-1-4' , 'Wj'), '日曜日');
eq(format('2015-1-5' , 'Wj'), '月曜日');
eq(format('2015-1-6' , 'Wj'), '火曜日');
eq(format('2015-1-7' , 'Wj'), '水曜日');


eq(format('2015-1-1' , 'Wj>1'), '木');
eq(format('2015-1-2' , 'Wj>1'), '金');
eq(format('2015-1-3' , 'Wj>1'), '土');
eq(format('2015-1-4' , 'Wj>1'), '日');
eq(format('2015-1-5' , 'Wj>1'), '月');
eq(format('2015-1-6' , 'Wj>1'), '火');
eq(format('2015-1-7' , 'Wj>1'), '水');







