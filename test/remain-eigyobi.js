//残営業日(月)
var Koyomi = require('..');
var koyomi = new Koyomi();
var remain = koyomi.remainEigyobi.bind(koyomi);
var eq = require('assert').equal;


koyomi.startMonth = 4;

console.log(remain('2015-4-7'));


console.log('remain-eigyobi 作成中');