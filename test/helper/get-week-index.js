// 週番号
var Koyomi = require('../..');
var get = Koyomi.getWeekIndex.bind(Koyomi);
var eq = require('assert').deepEqual;

eq(get('日'), 0);
eq(get('月'), 1);
eq(get('火'), 2);
eq(get('水'), 3);
eq(get('木'), 4);
eq(get('金'), 5);
eq(get('土'), 6);
eq(get('Sun'), 0);
eq(get('Mon'), 1);
eq(get('Tue'), 2);
eq(get('Wed'), 3);
eq(get('Thu'), 4);
eq(get('Fri'), 5);
eq(get('Sat'), 6);
eq(get('sun'), 0);
eq(get('mon'), 1);
eq(get('tue'), 2);
eq(get('wed'), 3);
eq(get('thu'), 4);
eq(get('fri'), 5);
eq(get('sat'), 6);
eq(get('sunday'), 0);
eq(get('monday'), 1);
eq(get('tuesday'), 2);
eq(get('wednesday'), 3);
eq(get('thursday'), 4);
eq(get('friday'), 5);
eq(get('saturday'), 6);
eq(get('SUNDAY'), 0);
eq(get('MONDAY'), 1);
eq(get('TUESDAY'), 2);
eq(get('WEDNESDAY'), 3);
eq(get('THURSDAY'), 4);
eq(get('FRIDAY'), 5);
eq(get('SATURDAY'), 6);

eq(get('休'), null);

eq(get('土,日'), [6, 0]);
eq(get(['土', '日']), [6, 0]);

eq(get(['休', '祝']), null);

eq(get(['月', '火', '休']), [1, 2]);










