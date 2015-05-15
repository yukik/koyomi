//経過営業日(月)
var Koyomi = require('../..');
var koyomi = new Koyomi();
var pass = koyomi.passEigyobi.bind(koyomi);
var eq = require('assert').equal;


console.log('pass-eigyobi 作成中');