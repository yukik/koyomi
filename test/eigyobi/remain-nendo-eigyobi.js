//残営業日(年度)
var Koyomi = require('../..');
var koyomi = new Koyomi();
var remain = koyomi.remainNendoEigyobi.bind(koyomi);
var eq = require('assert').equal;


koyomi.startMonth = 4;

console.log(remain('2015-4-7'));


console.log('remain-nendo-eigyobi 作成中');