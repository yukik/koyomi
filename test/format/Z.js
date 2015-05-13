//フォーマット
var Koyomi = require('../..');
var format = Koyomi.format.bind(Koyomi);
var eq = require('assert').equal;

// タイムゾーン
// Z

var d = new Date();
if (d.getTimezoneOffset() === -540) { // Asia/Tokyo
  eq(format(d, 'Z'), '+9:00');

} else {
  console.log('skip timezone(Z)');
}
