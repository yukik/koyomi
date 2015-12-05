// 年度のフォーマット
var koyomi = require('../..').create();
var nendo = koyomi.formatYear.bind(koyomi);
var eq = require('assert').equal;

eq(nendo('2015-5-5'), '2015/1 - 2015/12');
eq(nendo('2015-5-5', 'GGN年度'), '平成27年度');
eq(nendo('2015-5-5', 'GGN年度' , ''), '平成27年度');

eq(nendo('2015', 'GGN年度>>漢字' , ''), '平成二七年度');
eq(nendo('2015', 'GGN年度>>漢数字' , ''), '平成二十七年度');

koyomi.startMonth = 4;

eq(nendo('2015-5-5'), '2015/4 - 2016/3');
eq(nendo('2015-3-3'), '2014/4 - 2015/3');
eq(nendo('2015-5-5', 'Y年M月締め', null, true), '2016年3月締め');
eq(nendo('2015-5-5', 'Y年M月締め (Y年M月開始)', ' ', true), '2016年3月締め (2015年4月開始)');

eq(nendo('2015', 'GGN年度>>漢数字'), '平成二十七年度');
eq(nendo('2015', 'GGN年M月>>漢字'), '平成二七年四月');
eq(nendo('2015', 'GGN年M月〜GGN年M月>>漢数字' , '〜'), '平成二十七年四月〜平成二十八年三月');
