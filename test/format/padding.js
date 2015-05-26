// フォーマット
var Koyomi = require('../..');
var format = Koyomi.format.bind(Koyomi);
var eq = require('assert').equal;

// 0埋め
eq(format(20150101, 'D'),            '1');
eq(format(20150101, 'D>0'),        '1st');   // 序数になる
eq(format(20150101, 'DD>0'),      '01st');   // 序数になる
eq(format(20150101, 'D>1'),          '1');
eq(format(20150101, 'D>2'),         '01');
eq(format(20150101, 'D>3'),        '001');
eq(format(20150101, 'D>4'),       '0001');
eq(format(20150101, 'D>5'),      '00001');
eq(format(20150101, 'D>6'),     '000001');
eq(format(20150101, 'D>7'),    '0000001');
eq(format(20150101, 'D>8'),   '00000001');
eq(format(20150101, 'D>9'),  '000000001');
eq(format(20150101, 'D>10'),         '10');  // 意味としては '{D>1}0'です
eq(format(20150101, 'D>11'),         '11');