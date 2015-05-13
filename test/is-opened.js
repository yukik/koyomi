
// 営業日判定
var Koyomi = require('..');
var koyomi = new Koyomi();
var isOpened = koyomi.isOpened.bind(koyomi);
var test = require('assert').equal;

test(isOpened('2015-1-1'), false);
test(isOpened('2015-1-2'), false);
test(isOpened('2015-1-4'), false);
test(isOpened('2015-1-5'), true);