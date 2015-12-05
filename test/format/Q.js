// フォーマット
var koyomi = require('../..').create();
var format = koyomi.format.bind(koyomi);
var eq = require('assert').equal;

koyomi.startMonth = 1;

// 四半期
// Q
eq(format(201501, 'Q') , '1');
eq(format(201502, 'Q') , '1');
eq(format(201503, 'Q') , '1');
eq(format(201504, 'Q') , '2');
eq(format(201505, 'Q') , '2');
eq(format(201506, 'Q') , '2');
eq(format(201507, 'Q') , '3');
eq(format(201508, 'Q') , '3');
eq(format(201509, 'Q') , '3');
eq(format(201510, 'Q') , '4');
eq(format(201511, 'Q') , '4');
eq(format(201512, 'Q') , '4');

koyomi.startMonth = 9;

eq(format(201501, 'Q') , '2');
eq(format(201502, 'Q') , '2');
eq(format(201503, 'Q') , '3');
eq(format(201504, 'Q') , '3');
eq(format(201505, 'Q') , '3');
eq(format(201506, 'Q') , '4');
eq(format(201507, 'Q') , '4');
eq(format(201508, 'Q') , '4');
eq(format(201509, 'Q') , '1');
eq(format(201510, 'Q') , '1');
eq(format(201511, 'Q') , '1');
eq(format(201512, 'Q') , '2');

koyomi.startMonth = 5;

eq(format(201501, 'Q') , '3');
eq(format(201502, 'Q') , '4');
eq(format(201503, 'Q') , '4');
eq(format(201504, 'Q') , '4');
eq(format(201505, 'Q') , '1');
eq(format(201506, 'Q') , '1');
eq(format(201507, 'Q') , '1');
eq(format(201508, 'Q') , '2');
eq(format(201509, 'Q') , '2');
eq(format(201510, 'Q') , '2');
eq(format(201511, 'Q') , '3');
eq(format(201512, 'Q') , '3');



