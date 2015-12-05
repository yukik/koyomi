// 期間の分割
var koyomi = require('../..').create();
var sp = koyomi.separate.bind(koyomi);
var eq = require('assert').deepEqual;

koyomi.startMonth = 1;

// 2015-1-1 .. 2015/12/31
var r = sp(new Date(2015, 0, 1), new Date(2015, 11, 31));
eq(r, {
  years: [new Date(2015, 0, 1)],
  months: [],
  days: []
});

// ここのテストはutils/separate.jsで細かく行います