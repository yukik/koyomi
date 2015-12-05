// 差
var koyomi = require('../..').create();
var isLeap = koyomi.isLeap.bind(koyomi);
var eq = require('assert').equal;


eq(isLeap(1600), true);
eq(isLeap(1700), false);
eq(isLeap(1800), false);
eq(isLeap(1900), false);

eq(isLeap(1996), true);
eq(isLeap(1997), false);
eq(isLeap(1998), false);
eq(isLeap(1999), false);
eq(isLeap(2000), true);
eq(isLeap(2001), false);
eq(isLeap(2002), false);
eq(isLeap(2003), false);
eq(isLeap(2004), true);


koyomi.startMonth = 4;

eq(isLeap('1999'), false);
eq(isLeap('2000'), true);
eq(isLeap('2001'), false);
eq(isLeap('2002'), false);


