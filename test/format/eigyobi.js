// フォーマット
var Koyomi = require('../..');
var koyomi = new Koyomi();
var format = koyomi.format.bind(koyomi);
var eq = require('assert').equal;


//営業日加算
eq(format('2015-4-8', 'YYYY/MM/DD', 1), '2015/04/09');
eq(format('2015-4-9', 'YYYY/MM/DD', 1), '2015/04/10');
eq(format('2015-4-10', 'YYYY/MM/DD', 1), '2015/04/13');
eq(format('2015-4-10', 'YYYY/MM/DD', 0), '2015/04/10');


eq(format('2015-5-1', 'YYYY/MM/DD', 1), '2015/05/07');
eq(format('2015-5-2', 'YYYY/MM/DD', 1), '2015/05/07');
eq(format('2015-5-3', 'YYYY/MM/DD', 1), '2015/05/07');
eq(format('2015-5-4', 'YYYY/MM/DD', 1), '2015/05/07');
eq(format('2015-5-5', 'YYYY/MM/DD', 1), '2015/05/07');
eq(format('2015-5-6', 'YYYY/MM/DD', 1), '2015/05/07');
eq(format('2015-5-7', 'YYYY/MM/DD', 1), '2015/05/08');


eq(format('2015-5-1', 'YYYY/MM/DD', 1, true), '2015/05/01');
eq(format('2015-5-1', 'YYYY/MM/DD', 1, false), '2015/05/07');

eq(format('2015-5-1', 'YYYY/MM/DD', -1, true), '2015/05/01');
eq(format('2015-5-1', 'YYYY/MM/DD', -1, false), '2015/04/30');

eq(format('2015-5-1', 'YYYY/MM/DD', -2, true), '2015/04/30');
eq(format('2015-5-1', 'YYYY/MM/DD', -2, false), '2015/04/28');