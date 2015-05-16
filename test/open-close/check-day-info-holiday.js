// 個別営業・休業設定

var Koyomi = require('../..');
var koyomi = new Koyomi();
var get = koyomi.getDayInfo.bind(koyomi);
var open = koyomi.open.bind(koyomi);
var close = koyomi.close.bind(koyomi);
var reset = koyomi.reset.bind(koyomi);
var forced = koyomi.forcedOpenClose.bind(koyomi);
var eq = require('assert').deepEqual;


eq(koyomi.isOpened('2015-5-1'), true);

eq(forced('2015-5-1'), null);

open('2015-5-1');
eq(forced('2015-5-1'), true);

close('2015-5-1');
eq(forced('2015-5-1'), false);

reset('2015-5-1');
eq(forced('2015-5-1'), null);

eq(get('2015-5-1'), {events:[]});