// 年度表記
var Koyomi = require('..');
var koyomi = new Koyomi();
var nendo = koyomi.formatNendo.bind(koyomi);
var test = require('assert').equal;

test(nendo('2015-5-5'), '2015/1-2015/12');
test(nendo('2015-5-5', 'GGN年度'), '平成27年度');
test(nendo('2015-5-5', 'GGN年度' , ''), '平成27年度');

koyomi.startMonth = 4;
test(nendo('2015-5-5'), '2015/4-2016/3');
test(nendo('2015-3-3'), '2014/4-2015/3');
test(nendo('2015-5-5', null, 'YYYY年M月締め'), '2016年3月締め');
test(nendo('2015-5-5', ' (YYYY年M月開始)', 'YYYY年M月締め', true), '2016年3月締め (2015年4月開始)');

