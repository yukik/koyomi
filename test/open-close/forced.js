// 営業判別
var Koyomi = require('../..');
var koyomi = new Koyomi();
var forced = koyomi.forcedOpenClose.bind(koyomi);
var open = koyomi.forcedOpen.bind(koyomi);
var close = koyomi.forcedClose.bind(koyomi);
var test = require('assert').equal;


test(forced('2015-1-1'), null);
test(open('2015-1-1'), false);
test(close('2015-1-1'), false);


koyomi.open('2015-1-1');
test(forced('2015-1-1'), true);
test(open('2015-1-1'), true);
test(close('2015-1-1'), false);


koyomi.close('2015-1-1');
test(forced('2015-1-1'), false);
test(open('2015-1-1'), false);
test(close('2015-1-1'), true);


koyomi.reset('2015-1-1');
test(forced('2015-1-1'), null);
test(open('2015-1-1'), false);
test(close('2015-1-1'), false);