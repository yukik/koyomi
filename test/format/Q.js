// フォーマット
var Koyomi = require('../..');
var koyomi = new Koyomi();
var format = koyomi.format.bind(koyomi);
var eq = require('assert').equal;

// 四半期
// Q, Qj, Qx
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

eq(format(201501, 'Qj') , '4');
eq(format(201502, 'Qj') , '4');
eq(format(201503, 'Qj') , '4');
eq(format(201504, 'Qj') , '1');
eq(format(201505, 'Qj') , '1');
eq(format(201506, 'Qj') , '1');
eq(format(201507, 'Qj') , '2');
eq(format(201508, 'Qj') , '2');
eq(format(201509, 'Qj') , '2');
eq(format(201510, 'Qj') , '3');
eq(format(201511, 'Qj') , '3');
eq(format(201512, 'Qj') , '3');


eq(format(201501, 'Qx') , '1');
eq(format(201502, 'Qx') , '1');
eq(format(201503, 'Qx') , '1');
eq(format(201504, 'Qx') , '2');
eq(format(201505, 'Qx') , '2');
eq(format(201506, 'Qx') , '2');
eq(format(201507, 'Qx') , '3');
eq(format(201508, 'Qx') , '3');
eq(format(201509, 'Qx') , '3');
eq(format(201510, 'Qx') , '4');
eq(format(201511, 'Qx') , '4');
eq(format(201512, 'Qx') , '4');


koyomi.startMonth = 9;

eq(format(201501, 'Qx') , '2');
eq(format(201502, 'Qx') , '2');
eq(format(201503, 'Qx') , '3');
eq(format(201504, 'Qx') , '3');
eq(format(201505, 'Qx') , '3');
eq(format(201506, 'Qx') , '4');
eq(format(201507, 'Qx') , '4');
eq(format(201508, 'Qx') , '4');
eq(format(201509, 'Qx') , '1');
eq(format(201510, 'Qx') , '1');
eq(format(201511, 'Qx') , '1');
eq(format(201512, 'Qx') , '2');


koyomi.startMonth = 5;

eq(format(201501, 'Qx') , '3');
eq(format(201502, 'Qx') , '4');
eq(format(201503, 'Qx') , '4');
eq(format(201504, 'Qx') , '4');
eq(format(201505, 'Qx') , '1');
eq(format(201506, 'Qx') , '1');
eq(format(201507, 'Qx') , '1');
eq(format(201508, 'Qx') , '2');
eq(format(201509, 'Qx') , '2');
eq(format(201510, 'Qx') , '2');
eq(format(201511, 'Qx') , '3');
eq(format(201512, 'Qx') , '3');



