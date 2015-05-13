// 日情報の取得
var Koyomi = require('..');
var koyomi = new Koyomi();
var get = koyomi.getDayInfo.bind(koyomi);
var eq = require('assert').deepEqual;

eq(get('2015-1-1'), null);

// 設定後のテストはcheck-day-info-holidayで

