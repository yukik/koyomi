// フォーマット
var koyomi = require('../..').create();
var format = koyomi.format.bind(koyomi);
var eq = require('assert').equal;

// 曜日
// WW W w
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

eq(format('2015-1-1' , 'W'), '木曜日');
eq(format('2015-1-2' , 'W'), '金曜日');
eq(format('2015-1-3' , 'W'), '土曜日');
eq(format('2015-1-4' , 'W'), '日曜日');
eq(format('2015-1-5' , 'W'), '月曜日');
eq(format('2015-1-6' , 'W'), '火曜日');
eq(format('2015-1-7' , 'W'), '水曜日');

eq(format('2015-1-1' , 'W>1'), '木');
eq(format('2015-1-2' , 'W>1'), '金');
eq(format('2015-1-3' , 'W>1'), '土');
eq(format('2015-1-4' , 'W>1'), '日');
eq(format('2015-1-5' , 'W>1'), '月');
eq(format('2015-1-6' , 'W>1'), '火');
eq(format('2015-1-7' , 'W>1'), '水');

eq(format('2015-1-1' , 'w'), '4');
eq(format('2015-1-2' , 'w'), '5');
eq(format('2015-1-3' , 'w'), '6');
eq(format('2015-1-4' , 'w'), '0');
eq(format('2015-1-5' , 'w'), '1');
eq(format('2015-1-6' , 'w'), '2');
eq(format('2015-1-7' , 'w'), '3');