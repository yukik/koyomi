//フォーマット
var Koyomi = require('../..');
var koyomi = new Koyomi();
var format = koyomi.format.bind(koyomi);
var eq = require('assert').equal;

// 週番号
// R Rj Rx

eq(format(201501, 'R'),  '1');
eq(format(201502, 'R'),  '5');
eq(format(201503, 'R'),  '9');
eq(format(201504, 'R'), '14');
eq(format(201505, 'R'), '18');
eq(format(201506, 'R'), '23');
eq(format(201507, 'R'), '27');
eq(format(201508, 'R'), '31');
eq(format(201509, 'R'), '36');
eq(format(201510, 'R'), '40');
eq(format(201511, 'R'), '44');
eq(format(201512, 'R'), '49');


eq(format(201501, 'Rj'), '40');
eq(format(201502, 'Rj'), '45');
eq(format(201503, 'Rj'), '49');
eq(format(201504, 'Rj'),  '1');
eq(format(201505, 'Rj'),  '5');
eq(format(201506, 'Rj'), '10');
eq(format(201507, 'Rj'), '14');
eq(format(201508, 'Rj'), '18');
eq(format(201509, 'Rj'), '23');
eq(format(201510, 'Rj'), '27');
eq(format(201511, 'Rj'), '32');
eq(format(201512, 'Rj'), '36');


eq(format(201501, 'Rx'),  '1');
eq(format(201502, 'Rx'),  '5');
eq(format(201503, 'Rx'),  '9');
eq(format(201504, 'Rx'), '14');
eq(format(201505, 'Rx'), '18');
eq(format(201506, 'Rx'), '23');
eq(format(201507, 'Rx'), '27');
eq(format(201508, 'Rx'), '31');
eq(format(201509, 'Rx'), '36');
eq(format(201510, 'Rx'), '40');
eq(format(201511, 'Rx'), '44');
eq(format(201512, 'Rx'), '49');

koyomi.startMonth = 9;
koyomi.startWeek = '日';

eq(format(201501, 'Rx'), '18');
eq(format(201502, 'Rx'), '23');
eq(format(201503, 'Rx'), '27');
eq(format(201504, 'Rx'), '31');
eq(format(201505, 'Rx'), '35');
eq(format(201506, 'Rx'), '40');
eq(format(201507, 'Rx'), '44');
eq(format(201508, 'Rx'), '48');
eq(format(201509, 'Rx'),  '1');
eq(format(201510, 'Rx'),  '5');
eq(format(201511, 'Rx'), '10');
eq(format(201512, 'Rx'), '14');
