// フォーマット
var koyomi = require('../..').create();
var format = koyomi.format.bind(koyomi);
var eq = require('assert').equal;


koyomi.startMonth = 1;
koyomi.startWeek = '月';

// 週番号
// R r

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

koyomi.startMonth = 4;
koyomi.startWeek = '日';

eq(format(201501, 'R'), '40');
eq(format(201502, 'R'), '45');
eq(format(201503, 'R'), '49');
eq(format(201504, 'R'),  '1');
eq(format(201505, 'R'),  '5');
eq(format(201506, 'R'), '10');
eq(format(201507, 'R'), '14');
eq(format(201508, 'R'), '18');
eq(format(201509, 'R'), '23');
eq(format(201510, 'R'), '27');
eq(format(201511, 'R'), '32');
eq(format(201512, 'R'), '36');


eq(format(201501, 'r'),  '1');
eq(format(201502, 'r'),  '5');
eq(format(201503, 'r'),  '9');
eq(format(201504, 'r'), '14');
eq(format(201505, 'r'), '18');
eq(format(201506, 'r'), '23');
eq(format(201507, 'r'), '27');
eq(format(201508, 'r'), '31');
eq(format(201509, 'r'), '36');
eq(format(201510, 'r'), '40');
eq(format(201511, 'r'), '44');
eq(format(201512, 'r'), '49');


koyomi.startMonth = 9;
koyomi.startWeek = '日';

eq(format(201501, 'R'), '18');
eq(format(201502, 'R'), '23');
eq(format(201503, 'R'), '27');
eq(format(201504, 'R'), '31');
eq(format(201505, 'R'), '35');
eq(format(201506, 'R'), '40');
eq(format(201507, 'R'), '44');
eq(format(201508, 'R'), '48');
eq(format(201509, 'R'),  '1');
eq(format(201510, 'R'),  '5');
eq(format(201511, 'R'), '10');
eq(format(201512, 'R'), '14');
