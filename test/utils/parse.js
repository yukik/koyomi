var parse = require('../../lib/utils/parse');
var startMonth = 4;  // 一月
var startWeek  = 1;  // 月曜日
var eq = require('assert').deepEqual;
var D = require('../../date-extra.js');

var now = D(2015, 10, 9, 14, 35, 22, 621);
function create(value, date) {
  return parse(value, startMonth, startWeek, date || now);
}

// 現在日時 2015年10月9日 金曜日 14時35分22.621秒
eq(create('今')        , D(2015, 10,  9, 14, 35, 22, 621));
eq(create('いま')      , D(2015, 10,  9, 14, 35, 22, 621));
eq(create('now')       , D(2015, 10,  9, 14, 35, 22, 621));
eq(create('今日')      , D(2015, 10,  9));
eq(create('きょう')    , D(2015, 10,  9));
eq(create('本日')      , D(2015, 10,  9));
eq(create('today')     , D(2015, 10,  9));
eq(create('昨日')      , D(2015, 10,  8));
eq(create('きのう')    , D(2015, 10,  8));
eq(create('yesterday') , D(2015, 10,  8));
eq(create('明日')      , D(2015, 10, 10));
eq(create('あす')      , D(2015, 10, 10));
eq(create('あした')    , D(2015, 10, 10));
eq(create('tomorrow')  , D(2015, 10, 10));
eq(create('明後日')    , D(2015, 10, 11));
eq(create('あさって')  , D(2015, 10, 11));
eq(create('一昨日')    , D(2015, 10,  7));
eq(create('おととい')  , D(2015, 10,  7));

eq(create('年初')      , D(2015,  1,  1));
eq(create('今年初め')  , D(2015,  1,  1));
eq(create('年末')      , D(2015, 12, 31));
eq(create('今年末')    , D(2015, 12, 31));

eq(create('来年初め')  , D(2016,  1,  1));
eq(create('来年末')    , D(2016, 12, 31));
eq(create('昨年初め')  , D(2014,  1,  1));
eq(create('昨年末')    , D(2014, 12, 31));

eq(create('年度始め')  , D(2015,  4,  1));
eq(create('年度末')    , D(2016,  3, 31));

eq(create('月初')      , D(2015, 10,  1));
eq(create('月初め')    , D(2015, 10,  1));
eq(create('今月初め')  , D(2015, 10,  1));
eq(create('月末')      , D(2015, 10, 31));
eq(create('月終わり')  , D(2015, 10, 31));
eq(create('今月終わり'), D(2015, 10, 31));

eq(create('週初')      , D(2015, 10,  5));
eq(create('週初め')    , D(2015, 10,  5));
eq(create('今週初め')  , D(2015, 10,  5));
eq(create('週開始')    , D(2015, 10,  5));
eq(create('週末')      , D(2015, 10, 11));
eq(create('今週末')    , D(2015, 10, 11));
eq(create('週終わり')  , D(2015, 10, 11));

eq(create('二週間前') , D(2015, 9, 25));
eq(create('二週間後') , D(2015, 10, 23));

eq(create('一ヶ月後', D(2015, 1, 31)), D(2015, 2, 28));
eq(create('一ヶ月前', D(2015, 2, 28)), D(2015, 1, 28));

eq(create('今週日曜日'), D(2015, 10, 11));
eq(create('今週月曜日'), D(2015, 10,  5));
eq(create('今週火曜日'), D(2015, 10,  6));
eq(create('今週水曜日'), D(2015, 10,  7));
eq(create('今週木曜日'), D(2015, 10,  8));
eq(create('今週金曜日'), D(2015, 10,  9));
eq(create('今週土曜日'), D(2015, 10, 10));

startWeek = 3; // 水曜日

eq(create('今週日曜日'), D(2015, 10, 11));
eq(create('今週月曜日'), D(2015, 10, 12));
eq(create('今週火曜日'), D(2015, 10, 13));
eq(create('今週水曜日'), D(2015, 10,  7));
eq(create('今週木曜日'), D(2015, 10,  8));
eq(create('今週金曜日'), D(2015, 10,  9));
eq(create('今週土曜日'), D(2015, 10, 10));

startWeek = 0; // 日曜日

eq(create('今週日曜日'), D(2015, 10,  4));
eq(create('今週月曜日'), D(2015, 10,  5));
eq(create('今週火曜日'), D(2015, 10,  6));
eq(create('今週水曜日'), D(2015, 10,  7));
eq(create('今週木曜日'), D(2015, 10,  8));
eq(create('今週金曜日'), D(2015, 10,  9));
eq(create('今週土曜日'), D(2015, 10, 10));

startWeek = 1; // 月曜日

eq(create('先週日曜日'), D(2015, 10,  4));
eq(create('先週月曜日'), D(2015,  9, 28));
eq(create('先週火曜日'), D(2015,  9, 29));
eq(create('先週水曜日'), D(2015,  9, 30));
eq(create('先週木曜日'), D(2015, 10,  1));
eq(create('先週金曜日'), D(2015, 10,  2));
eq(create('先週土曜日'), D(2015, 10,  3));

eq(create('今度の日曜日'), D(2015, 10, 11));
eq(create('今度の月曜日'), D(2015, 10, 12));
eq(create('今度の火曜日'), D(2015, 10, 13));
eq(create('今度の水曜日'), D(2015, 10, 14));
eq(create('今度の木曜日'), D(2015, 10, 15));
eq(create('今度の金曜日'), D(2015, 10, 16));
eq(create('今度の土曜日'), D(2015, 10, 10));

eq(create('前回の日曜日'), D(2015, 10, 4));
eq(create('前回の月曜日'), D(2015, 10, 5));
eq(create('前回の火曜日'), D(2015, 10, 6));
eq(create('前回の水曜日'), D(2015, 10, 7));
eq(create('前回の木曜日'), D(2015, 10, 8));
eq(create('前回の金曜日'), D(2015, 10, 2));
eq(create('前回の土曜日'), D(2015, 10, 3));














