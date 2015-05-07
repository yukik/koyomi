
// 祝日名

var Koyomi = require(global.minify ? '../lib/minify' : '..');
var get = Koyomi.getHolidayName.bind(Koyomi);
var test = require('assert').equal;


test(get('2015-1-1'), '元日');
test(get('2015-1-2'), null);
test(get('2015-1-4'), null);
test(get('2015-5-5'), 'こどもの日');
test(get('2015-5-6'), '振替休日');
test(get('2015-3-21'), '春分の日');
test(get('2015-9-23'), '秋分の日');
