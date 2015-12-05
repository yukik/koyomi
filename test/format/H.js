// フォーマット
var koyomi = require('../..').create();
var format = koyomi.format.bind(koyomi);
var eq = require('assert').equal;


// 時間
// HH, H, hh, hh

eq(format('2015-1-1', 'HH'), '00');
eq(format('2015-1-1', 'H' ),  '0');
eq(format('2015-1-1', 'hh'), '00');
eq(format('2015-1-1', 'h'),   '0');

eq(format('2015-1-1 8:00', 'HH'), '08');
eq(format('2015-1-1 8:00',  'H'),  '8');
eq(format('2015-1-1 8:00', 'hh'), '08');
eq(format('2015-1-1 8:00',  'h'),  '8');

eq(format('2015-1-1 12:00', 'HH'), '12');
eq(format('2015-1-1 12:00',  'H'), '12');
eq(format('2015-1-1 12:00', 'hh'), '00');
eq(format('2015-1-1 12:00',  'h'),  '0');

eq(format('2015-1-1 23:00', 'HH'), '23');
eq(format('2015-1-1 23:00',  'H'), '23');
eq(format('2015-1-1 23:00', 'hh'), '11');
eq(format('2015-1-1 23:00',  'h'), '11');

eq(format('23:59:59', 'HH'), '23');
eq(format('23:59:59',  'H'), '23');
eq(format('23:59:59', 'hh'), '11');
eq(format('23:59:59',  'h'), '11');

eq(format('0:00:00', 'HH'), '00');
eq(format('0:00:00',  'H'),  '0');
eq(format('0:00:00', 'hh'), '00');
eq(format('0:00:00',  'h'),  '0');

eq(format('11:59:59', 'HH'), '11');
eq(format('11:59:59',  'H'), '11');
eq(format('11:59:59', 'hh'), '11');
eq(format('11:59:59',  'h'), '11');

eq(format('12:00', 'HH'), '12');
eq(format('12:00',  'H'), '12');
eq(format('12:00', 'hh'), '00');
eq(format('12:00',  'h'),  '0');


// 0 padding
eq(format('15:00', 'HH>5'),    '15');
eq(format('15:00',  'H>5'), '00015');
eq(format('15:00', 'hh>5'),    '03');
eq(format('15:00',  'h>5'), '00003');





