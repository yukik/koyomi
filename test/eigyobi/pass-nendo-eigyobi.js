//経過営業日(年度)
var Koyomi = require('../..');
var koyomi = new Koyomi();
var pass = koyomi.passNendoEigyobi.bind(koyomi);
var eq = require('assert').equal;


koyomi.startMonth = 4;

console.log(pass('2015-4-7'));


console.log('pass-nendo-eigyobi 作成中');