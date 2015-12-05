
var D = require('../../date-extra.js');

var to = require('../../lib/utils/toDatetime');
var sm = require('../../lib/config').START_MONTH;

var assert = require('assert');
var eq = assert.deepEqual;

var now = new Date();
var y  = now.getFullYear();
var m  = now.getMonth() + 1;
var d  = now.getDate();



// 月・日の省略
eq(to('2015'), D(2015, sm, 1));
eq(to('2015年'), D(2015, sm, 1));
eq(to('2015-10'), D(2015, 10, 1));

// 年の省略
eq(to('8-16', 1), D(y, 8, 16));
eq(to('8月16日', 1), D(y, 8, 16));
eq(to('8月16', 1), null);
eq(to('8月末日', 1), D(y, 8, 31));

// 年月日省略
eq(to('8時16分', 1), D(y, m, d, 8, 16));

// ISO8601拡張形式
if (now.getTimezoneOffset() === -540) {

  eq(to('2015-08-16T12:34:56'     )    , D(2015, 8, 16, 12, 34, 56));
  eq(to('2015-08-16T12:34:56+9:00')    , D(2015, 8, 16, 12, 34, 56));
  eq(to('2015-08-16T12:34:56+8:00')    , D(2015, 8, 16, 13, 34, 56));
  eq(to('2015-08-16 12:34:56+800')     , D(2015, 8, 16, 13, 34, 56));
  eq(to('2015-08-16 12:34:56+8')       , D(2015, 8, 16, 13, 34, 56));
  eq(to('2015-08-16T12:34:56GMT+8:00') , D(2015, 8, 16, 13, 34, 56));
  eq(to('2015-08-16 12:34:56GMT+800')  , D(2015, 8, 16, 13, 34, 56));
  eq(to('2015-08-16 12:34:56GMT+8')    , D(2015, 8, 16, 13, 34, 56));
  eq(to('2015-08-16 12:34:56 GMT+8:00'), D(2015, 8, 16, 13, 34, 56));
  eq(to('2015-08-16 12:34:56Z')        , D(2015, 8, 16, 21, 34, 56));
  eq(to('2015-08-16 12:34:56+13:00')   , null);
  eq(to('2015-08-16 12:34:56+9:80')    , null);

} else {
  console.log('Asia/Tokyo test skip');
}

