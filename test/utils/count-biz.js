// 営業日の計算
var koyomi = require('../..').create();
var count = require('../../lib/utils/countBiz');
var eq = require('assert').equal;
var fromTo = count.countFromTo;
var term   = count.countTerm;
var D = require('../../date-extra.js');

koyomi.regularHoliday = '土,日';
koyomi.seasonHoliday = '12/29-1/3';
koyomi.openOnHoliday = false;

// from to
eq(fromTo(koyomi, D(2015, 1, 1), D(2015, 1, 5)), 1);

// term
eq(term(koyomi, D(2015, 1, 1), 'm'), 19);

// いろんなパターンをcalc-bizのbiz-from-to,biz-term,biz-yyyymmでテスト済み