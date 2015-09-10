// フォーマット
var Koyomi = require('../..');
var format = Koyomi.format.bind(Koyomi);
var eq = require('assert').equal;

// 現在時刻から計算した日時を返す
function d(ad) { return  Koyomi.add(new Date(), ad); }

// 口語
// K
eq(format(new Date(), 'K'), 'たった今');
eq(format(d('-10分'), 'K'), '10分前');
eq(format(d('10分'), 'K'), '10分後');



// TODO: テストの充実