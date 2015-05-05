// 週番号の取得
var Koyomi = require(global.minify ? '../lib/minify' : '..');
var get = Koyomi.getWeekNumber;
var eq = require('assert').equal;


eq(get('2015-1-1'), 1);
eq(get('2015-4-1' , '月', 4), 1);
eq(get('2015-3-31', '月', 4), parseInt(365/7, 10) + 1);


eq(get('2015-4-1' , '日', 4), 1);
eq(get('2015-4-2' , '日', 4), 1);
eq(get('2015-4-3' , '日', 4), 1);
eq(get('2015-4-4' , '日', 4), 1);
eq(get('2015-4-5' , '日', 4), 2);


eq(get('2015-6-1' , '木', 4), 10);
eq(get('2015-6-2' , '木', 4), 10);
eq(get('2015-6-3' , '木', 4), 10);
eq(get('2015-6-4' , '木', 4), 11);
eq(get('2015-6-5' , '木', 4), 11);