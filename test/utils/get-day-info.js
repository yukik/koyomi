// 日情報取得
var get = require('../../lib/utils/getDayInfo');
var eq = require('assert').deepEqual;
var D = require('../../date-extra.js');

var days = {
  '2015-12-24': {events: ['クリスマスパーティー']}
};

eq(get(days, D(2015, 12,24)), {events: ['クリスマスパーティー']});

eq(get(days, D(2015, 1,1)), null);
eq(days, {
  '2015-12-24': {events: ['クリスマスパーティー']}
});

eq(get(days, D(2015, 1,1), true), {events: []});
eq(days, {
  '2015-12-24': {events: ['クリスマスパーティー']},
  '2015-1-1': {events: []}
});


