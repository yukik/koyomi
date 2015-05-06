
// パラメータ文字列

/*jshint maxlen:500*/

var Koyomi = require(global.minify ? '../lib/minify' : '..');
var koyomi = new Koyomi();
var format = koyomi.format.bind(koyomi);


var test = require('assert').equal;


// デフォルトフォーマット
test(format('2015-4-5'), '2015-04-05 00:00:00');

// hiduke
test(format('2015-4-5', 'hizuke'), '2015/04/05');
test(format('2015-4-5', 'hizuke'), format('2015-4-5', 'Y/m/d'));

// wareki, wareki2
test(format('2015-4-5', 'wareki') , '平成27年4月5日');
test(format('2015-4-5', 'wareki') , format('2015-4-5', 'nengonen年n月j日'));
test(format('2015-4-5', 'wareki2'), format('2015-4-5', 'NengoNen年n月j日'));

// 日本語
test(format('2015-4-5 8:05:09', 'Y年n月j日 G時i2分s2秒'), '2015年4月5日 8時5分9秒');

// wareki,wareki2,nengo,nengo2,nen,nen2,nen3,nen4,Nengo,Nengo2,Nen,Nen2,Nen3,Nen4
var warekiHeader = ['', 'wareki'     , 'wareki2'           , 'nengo', 'nengo2', 'nen' , 'nen2', 'nen3'    , 'nen4'    , 'Nengo', 'Nengo2', 'Nen' , 'Nen2', 'Nen3'    , 'Nen4'    ];
var warekiData = [
  ['1872-01-01', '西暦1872年1月1日'  , '西暦1872年1月1日'  , '西暦' , ''      , '1872', '1872', '一八七二', '一八七二', '西暦' , ''      , '1872', '1872', '一八七二', '一八七二'],
  ['1872-12-31', '西暦1872年12月31日', '西暦1872年12月31日', '西暦' , ''      , '1872', '1872', '一八七二', '一八七二', '西暦' , ''      , '1872', '1872', '一八七二', '一八七二'],
  ['1873-01-01', '明治6年1月1日'     , '明治6年1月1日'     , '明治' , 'M'     , '6'   , '6'   , '六'      , '六'      , '明治' , 'M'     , '6'   , '6'   , '六'      , '六'      ],
  ['1911-12-31', '明治44年12月31日'  , '明治44年12月31日'  , '明治' , 'M'     , '44'  , '44'  , '四十四'  , '四四'    , '明治' , 'M'     , '44'  , '44'  , '四十四'  , '四四'    ],
  ['1912-01-01', '大正1年1月1日'     , '明治45年1月1日'    , '大正' , 'T'     , '1'   , '元'  , '元'      , '元'      , '明治' , 'M'     , '45'  , '45'  , '四十五'  , '四五'    ],
  ['1912-07-29', '大正1年7月29日'    , '明治45年7月29日'   , '大正' , 'T'     , '1'   , '元'  , '元'      , '元'      , '明治' , 'M'     , '45'  , '45'  , '四十五'  , '四五'    ],
  ['1912-07-30', '大正1年7月30日'    , '大正1年7月30日'    , '大正' , 'T'     , '1'   , '元'  , '元'      , '元'      , '大正' , 'T'     , '1'   , '元'  , '元'      , '元'      ],
  ['1925-12-31', '大正14年12月31日'  , '大正14年12月31日'  , '大正' , 'T'     , '14'  , '14'  , '十四'    , '一四'    , '大正' , 'T'     , '14'  , '14'  , '十四'    , '一四'    ],
  ['1926-01-01', '昭和1年1月1日'     , '大正15年1月1日'    , '昭和' , 'S'     , '1'   , '元'  , '元'      , '元'      , '大正' , 'T'     , '15'  , '15'  , '十五'    , '一五'    ],
  ['1926-12-24', '昭和1年12月24日'   , '大正15年12月24日'  , '昭和' , 'S'     , '1'   , '元'  , '元'      , '元'      , '大正' , 'T'     , '15'  , '15'  , '十五'    , '一五'    ],
  ['1926-12-25', '昭和1年12月25日'   , '昭和1年12月25日'   , '昭和' , 'S'     , '1'   , '元'  , '元'      , '元'      , '昭和' , 'S'     , '1'   , '元'  , '元'      , '元'      ],
  ['1988-12-31', '昭和63年12月31日'  , '昭和63年12月31日'  , '昭和' , 'S'     , '63'  , '63'  , '六十三'  , '六三'    , '昭和' , 'S'     , '63'  , '63'  , '六十三'  , '六三'    ],
  ['1989-01-01', '平成1年1月1日'     , '昭和64年1月1日'    , '平成' , 'H'     , '1'   , '元'  , '元'      , '元'      , '昭和' , 'S'     , '64'  , '64'  , '六十四'  , '六四'    ],
  ['1989-01-07', '平成1年1月7日'     , '昭和64年1月7日'    , '平成' , 'H'     , '1'   , '元'  , '元'      , '元'      , '昭和' , 'S'     , '64'  , '64'  , '六十四'  , '六四'    ],
  ['1989-01-08', '平成1年1月8日'     , '平成1年1月8日'     , '平成' , 'H'     , '1'   , '元'  , '元'      , '元'      , '平成' , 'H'     , '1'   , '元'  , '元'      , '元'      ],
  ['1990-01-01', '平成2年1月1日'     , '平成2年1月1日'     , '平成' , 'H'     , '2'   , '2'   , '二'      , '二'      , '平成' , 'H'     , '2'   , '2'   , '二'      , '二'      ],
  ['2015-04-27', '平成27年4月27日'   , '平成27年4月27日'   , '平成' , 'H'     , '27'  , '27'  , '二十七'  , '二七'    , '平成' , 'H'     , '27'  , '27'  , '二十七'  , '二七'    ]
];
warekiData.forEach(function(x){
  for(var i = 1, len = warekiHeader.length; i < len; i++) {
    test(format(x[0], warekiHeader[i]), x[i]);
  }
});

// Y
test(format('2015-4-5', 'Y'), '2015');

// y
test(format('2015-4-5', 'y'), '15');

// L
test(format('1900-1-1', 'L'), '0');
test(format('2000-1-1', 'L'), '1');
test(format('2004-1-1', 'L'), '1');
test(format('2100-1-1', 'L'), '0');
test(format('2015-4-5', 'L'), '0');
test(format('2016-1-1', 'L'), '1');

// m
test(format('2015-4-27' , 'm'), '04');
test(format('2015-12-27', 'm'), '12');

// n
test(format('2015-4-27' , 'n'), '4');
test(format('2015-12-27', 'n'), '12');

// F
test(format('2015-1-1' , 'F'), 'January');
test(format('2015-2-1' , 'F'), 'February');
test(format('2015-3-1' , 'F'), 'March');
test(format('2015-4-1' , 'F'), 'April');
test(format('2015-5-1' , 'F'), 'May');
test(format('2015-6-1' , 'F'), 'June');
test(format('2015-7-1' , 'F'), 'July');
test(format('2015-8-1' , 'F'), 'August');
test(format('2015-9-1' , 'F'), 'September');
test(format('2015-10-1', 'F'), 'October');
test(format('2015-11-1', 'F'), 'November');
test(format('2015-12-1', 'F'), 'December');

// M
test(format('2015-1-1' , 'M'), 'Jan');
test(format('2015-2-1' , 'M'), 'Feb');
test(format('2015-3-1' , 'M'), 'Mar');
test(format('2015-4-1' , 'M'), 'Apr');
test(format('2015-5-1' , 'M'), 'May');
test(format('2015-6-1' , 'M'), 'Jun');
test(format('2015-7-1' , 'M'), 'Jul');
test(format('2015-8-1' , 'M'), 'Aug');
test(format('2015-9-1' , 'M'), 'Sep');
test(format('2015-10-1', 'M'), 'Oct');
test(format('2015-11-1', 'M'), 'Nov');
test(format('2015-12-1', 'M'), 'Dec');


// tuki
test(format('2015-1-1' , 'tuki'), '一');
test(format('2015-2-1' , 'tuki'), '二');
test(format('2015-3-1' , 'tuki'), '三');
test(format('2015-4-1' , 'tuki'), '四');
test(format('2015-5-1' , 'tuki'), '五');
test(format('2015-6-1' , 'tuki'), '六');
test(format('2015-7-1' , 'tuki'), '七');
test(format('2015-8-1' , 'tuki'), '八');
test(format('2015-9-1' , 'tuki'), '九');
test(format('2015-10-1', 'tuki'), '十');
test(format('2015-11-1', 'tuki'), '十一');
test(format('2015-12-1', 'tuki'), '十二');

// tuki2
test(format('2015-1-1' , 'tuki2'), '一');
test(format('2015-2-1' , 'tuki2'), '二');
test(format('2015-3-1' , 'tuki2'), '三');
test(format('2015-4-1' , 'tuki2'), '四');
test(format('2015-5-1' , 'tuki2'), '五');
test(format('2015-6-1' , 'tuki2'), '六');
test(format('2015-7-1' , 'tuki2'), '七');
test(format('2015-8-1' , 'tuki2'), '八');
test(format('2015-9-1' , 'tuki2'), '九');
test(format('2015-10-1', 'tuki2'), '一〇');
test(format('2015-11-1', 'tuki2'), '一一');
test(format('2015-12-1', 'tuki2'), '一二');

// t
test(format('2015-1-1' , 't'), '31');
test(format('2015-2-1' , 't'), '28');
test(format('2016-2-1' , 't'), '29');
test(format('2015-3-1' , 't'), '31');
test(format('2015-4-1' , 't'), '30');
test(format('2015-5-1' , 't'), '31');
test(format('2015-6-1' , 't'), '30');
test(format('2015-7-1' , 't'), '31');
test(format('2015-8-1' , 't'), '31');
test(format('2015-9-1' , 't'), '30');
test(format('2015-10-1', 't'), '31');
test(format('2015-11-1', 't'), '30');
test(format('2015-12-1', 't'), '31');

// W
test(format('2015-1-1' , 'W'), '1');
test(format('2015-2-1' , 'W'), '5');
test(format('2015-3-1' , 'W'), '9');
test(format('2015-4-1' , 'W'), '14');
test(format('2015-5-1' , 'W'), '18');
test(format('2015-6-1' , 'W'), '23');
test(format('2015-7-1' , 'W'), '27');
test(format('2015-8-1' , 'W'), '31');
test(format('2015-9-1' , 'W'), '36');
test(format('2015-10-1', 'W'), '40');
test(format('2015-11-1', 'W'), '44');
test(format('2015-12-1', 'W'), '49');

// Wj
test(format('2015-1-1' , 'Wj'), '40');
test(format('2015-2-1' , 'Wj'), '45');
test(format('2015-3-1' , 'Wj'), '49');
test(format('2015-4-1' , 'Wj'), '1');
test(format('2015-5-1' , 'Wj'), '5');
test(format('2015-6-1' , 'Wj'), '10');
test(format('2015-7-1' , 'Wj'), '14');
test(format('2015-8-1' , 'Wj'), '18');
test(format('2015-9-1' , 'Wj'), '23');
test(format('2015-10-1', 'Wj'), '27');
test(format('2015-11-1', 'Wj'), '32');
test(format('2015-12-1', 'Wj'), '36');

// wn
test(format('2015-1-1' , 'wn'), '1');
test(format('2015-2-1' , 'wn'), '5');
test(format('2015-3-1' , 'wn'), '9');
test(format('2015-4-1' , 'wn'), '14');
test(format('2015-5-1' , 'wn'), '18');
test(format('2015-6-1' , 'wn'), '23');
test(format('2015-7-1' , 'wn'), '27');
test(format('2015-8-1' , 'wn'), '31');
test(format('2015-9-1' , 'wn'), '36');
test(format('2015-10-1', 'wn'), '40');
test(format('2015-11-1', 'wn'), '44');
test(format('2015-12-1', 'wn'), '49');

// d
var i;
for(i = 1; i <= 9; i++) {
  test(format('2015-1-' + i , 'd'), '0' + i);
}
for(i = 10; i <= 31; i++) {
  test(format('2015-1-' + i , 'd'), ''  + i);
}

// j
var i;
for(i = 1; i <= 31; i++) {
  test(format('2015-1-' + i , 'j'), ''  + i);
}

// niti
test(format('2015-1-1' , 'niti'), '一');
test(format('2015-1-2' , 'niti'), '二');
test(format('2015-1-3' , 'niti'), '三');
test(format('2015-1-4' , 'niti'), '四');
test(format('2015-1-5' , 'niti'), '五');
test(format('2015-1-6' , 'niti'), '六');
test(format('2015-1-7' , 'niti'), '七');
test(format('2015-1-8' , 'niti'), '八');
test(format('2015-1-9' , 'niti'), '九');
test(format('2015-1-10', 'niti'), '十');
test(format('2015-1-11', 'niti'), '十一');
test(format('2015-1-12', 'niti'), '十二');
test(format('2015-1-13', 'niti'), '十三');
test(format('2015-1-14', 'niti'), '十四');
test(format('2015-1-15', 'niti'), '十五');
test(format('2015-1-16', 'niti'), '十六');
test(format('2015-1-17', 'niti'), '十七');
test(format('2015-1-18', 'niti'), '十八');
test(format('2015-1-19', 'niti'), '十九');
test(format('2015-1-20', 'niti'), '二十');
test(format('2015-1-21', 'niti'), '二十一');
test(format('2015-1-22', 'niti'), '二十二');
test(format('2015-1-23', 'niti'), '二十三');
test(format('2015-1-24', 'niti'), '二十四');
test(format('2015-1-25', 'niti'), '二十五');
test(format('2015-1-26', 'niti'), '二十六');
test(format('2015-1-27', 'niti'), '二十七');
test(format('2015-1-28', 'niti'), '二十八');
test(format('2015-1-29', 'niti'), '二十九');
test(format('2015-1-30', 'niti'), '三十');
test(format('2015-1-31', 'niti'), '三十一');

// niti2
test(format('2015-1-1' , 'niti2'), '一');
test(format('2015-1-2' , 'niti2'), '二');
test(format('2015-1-3' , 'niti2'), '三');
test(format('2015-1-4' , 'niti2'), '四');
test(format('2015-1-5' , 'niti2'), '五');
test(format('2015-1-6' , 'niti2'), '六');
test(format('2015-1-7' , 'niti2'), '七');
test(format('2015-1-8' , 'niti2'), '八');
test(format('2015-1-9' , 'niti2'), '九');
test(format('2015-1-10', 'niti2'), '一〇');
test(format('2015-1-11', 'niti2'), '一一');
test(format('2015-1-12', 'niti2'), '一二');
test(format('2015-1-13', 'niti2'), '一三');
test(format('2015-1-14', 'niti2'), '一四');
test(format('2015-1-15', 'niti2'), '一五');
test(format('2015-1-16', 'niti2'), '一六');
test(format('2015-1-17', 'niti2'), '一七');
test(format('2015-1-18', 'niti2'), '一八');
test(format('2015-1-19', 'niti2'), '一九');
test(format('2015-1-20', 'niti2'), '二〇');
test(format('2015-1-21', 'niti2'), '二一');
test(format('2015-1-22', 'niti2'), '二二');
test(format('2015-1-23', 'niti2'), '二三');
test(format('2015-1-24', 'niti2'), '二四');
test(format('2015-1-25', 'niti2'), '二五');
test(format('2015-1-26', 'niti2'), '二六');
test(format('2015-1-27', 'niti2'), '二七');
test(format('2015-1-28', 'niti2'), '二八');
test(format('2015-1-29', 'niti2'), '二九');
test(format('2015-1-30', 'niti2'), '三〇');
test(format('2015-1-31', 'niti2'), '三一');

// S
test(format('2015-1-1' , 'S'), 'st');
test(format('2015-1-2' , 'S'), 'nd');
test(format('2015-1-3' , 'S'), 'rd');
test(format('2015-1-4' , 'S'), 'th');
test(format('2015-1-5' , 'S'), 'th');
test(format('2015-1-6' , 'S'), 'th');
test(format('2015-1-7' , 'S'), 'th');
test(format('2015-1-8' , 'S'), 'th');
test(format('2015-1-9' , 'S'), 'th');
test(format('2015-1-10', 'S'), 'th');
test(format('2015-1-11', 'S'), 'th');
test(format('2015-1-12', 'S'), 'th');
test(format('2015-1-13', 'S'), 'th');
test(format('2015-1-14', 'S'), 'th');
test(format('2015-1-15', 'S'), 'th');
test(format('2015-1-16', 'S'), 'th');
test(format('2015-1-17', 'S'), 'th');
test(format('2015-1-18', 'S'), 'th');
test(format('2015-1-19', 'S'), 'th');
test(format('2015-1-20', 'S'), 'th');
test(format('2015-1-21', 'S'), 'st');
test(format('2015-1-22', 'S'), 'nd');
test(format('2015-1-23', 'S'), 'rd');
test(format('2015-1-24', 'S'), 'th');
test(format('2015-1-25', 'S'), 'th');
test(format('2015-1-26', 'S'), 'th');
test(format('2015-1-27', 'S'), 'th');
test(format('2015-1-28', 'S'), 'th');
test(format('2015-1-29', 'S'), 'th');
test(format('2015-1-30', 'S'), 'th');
test(format('2015-1-31', 'S'), 'st');

// z
test(format('2015-1-1' , 'z'), '0');
test(format('2015-1-2' , 'z'), '1');
test(format('2015-1-3' , 'z'), '2');
test(format('2015-1-4' , 'z'), '3');
test(format('2015-1-5' , 'z'), '4');
test(format('2015-1-6' , 'z'), '5');
test(format('2015-1-7' , 'z'), '6');
test(format('2015-1-8' , 'z'), '7');
test(format('2015-1-9' , 'z'), '8');
test(format('2015-1-10', 'z'), '9');
test(format('2015-1-11', 'z'), '10');
test(format('2015-1-12', 'z'), '11');
test(format('2015-1-13', 'z'), '12');
test(format('2015-1-14', 'z'), '13');
test(format('2015-1-15', 'z'), '14');
test(format('2015-1-16', 'z'), '15');
test(format('2015-1-17', 'z'), '16');
test(format('2015-1-18', 'z'), '17');
test(format('2015-1-19', 'z'), '18');
test(format('2015-1-20', 'z'), '19');
test(format('2015-1-21', 'z'), '20');
test(format('2015-1-22', 'z'), '21');
test(format('2015-1-23', 'z'), '22');
test(format('2015-1-24', 'z'), '23');
test(format('2015-1-25', 'z'), '24');
test(format('2015-1-26', 'z'), '25');
test(format('2015-1-27', 'z'), '26');
test(format('2015-1-28', 'z'), '27');
test(format('2015-1-29', 'z'), '28');
test(format('2015-1-30', 'z'), '29');
test(format('2015-1-31', 'z'), '30');
test(format('2015-2-1' , 'z'), '31');
test(format('2015-2-2' , 'z'), '32');
test(format('2015-2-3' , 'z'), '33');
test(format('2015-2-4' , 'z'), '34');
test(format('2015-2-5' , 'z'), '35');
test(format('2015-2-6' , 'z'), '36');
test(format('2015-2-7' , 'z'), '37');
test(format('2015-2-8' , 'z'), '38');
test(format('2015-2-9' , 'z'), '39');
test(format('2015-2-10', 'z'), '40');
test(format('2015-2-11', 'z'), '41');
test(format('2015-2-12', 'z'), '42');
test(format('2015-2-13', 'z'), '43');
test(format('2015-2-14', 'z'), '44');
test(format('2015-2-15', 'z'), '45');
test(format('2015-2-16', 'z'), '46');
test(format('2015-2-17', 'z'), '47');
test(format('2015-2-18', 'z'), '48');
test(format('2015-2-19', 'z'), '49');
test(format('2015-2-20', 'z'), '50');
test(format('2015-2-21', 'z'), '51');
test(format('2015-2-22', 'z'), '52');
test(format('2015-2-23', 'z'), '53');
test(format('2015-2-24', 'z'), '54');
test(format('2015-2-25', 'z'), '55');
test(format('2015-2-26', 'z'), '56');
test(format('2015-2-27', 'z'), '57');
test(format('2015-2-28', 'z'), '58');
test(format('2015-3-1' , 'z'), '59');
test(format('2016-2-29', 'z'), '59'); // 閏年
test(format('2016-3-1' , 'z'), '60'); // 閏年
test(format('2015-12-31', 'z'), '364');
test(format('2016-12-31', 'z'), '365'); // 閏年

// w
test(format('2015-1-1' , 'w'), '4');
test(format('2015-1-2' , 'w'), '5');
test(format('2015-1-3' , 'w'), '6');
test(format('2015-1-4' , 'w'), '0');
test(format('2015-1-5' , 'w'), '1');
test(format('2015-1-6' , 'w'), '2');
test(format('2015-1-7' , 'w'), '3');

// N
test(format('2015-1-1' , 'N'), '4');
test(format('2015-1-2' , 'N'), '5');
test(format('2015-1-3' , 'N'), '6');
test(format('2015-1-4' , 'N'), '7');
test(format('2015-1-5' , 'N'), '1');
test(format('2015-1-6' , 'N'), '2');
test(format('2015-1-7' , 'N'), '3');

// l
test(format('2015-1-1' , 'l'), 'Thursday');
test(format('2015-1-2' , 'l'), 'Friday');
test(format('2015-1-3' , 'l'), 'Saturday');
test(format('2015-1-4' , 'l'), 'Sunday');
test(format('2015-1-5' , 'l'), 'Monday');
test(format('2015-1-6' , 'l'), 'Tuesday');
test(format('2015-1-7' , 'l'), 'Wednesday');

// D
test(format('2015-1-1' , 'D'), 'Thu');
test(format('2015-1-2' , 'D'), 'Fri');
test(format('2015-1-3' , 'D'), 'Sat');
test(format('2015-1-4' , 'D'), 'Sun');
test(format('2015-1-5' , 'D'), 'Mon');
test(format('2015-1-6' , 'D'), 'Tue');
test(format('2015-1-7' , 'D'), 'Wed');

// yobi
test(format('2015-1-1' , 'yobi'), '木');
test(format('2015-1-2' , 'yobi'), '金');
test(format('2015-1-3' , 'yobi'), '土');
test(format('2015-1-4' , 'yobi'), '日');
test(format('2015-1-5' , 'yobi'), '月');
test(format('2015-1-6' , 'yobi'), '火');
test(format('2015-1-7' , 'yobi'), '水');


// yobi2
test(format('2015-1-1' , 'yobi2'), '祝');
test(format('2015-1-2' , 'yobi2'), '金');
test(format('2015-1-3' , 'yobi2'), '土');
test(format('2015-1-4' , 'yobi2'), '日');
test(format('2015-1-5' , 'yobi2'), '月');
test(format('2015-1-6' , 'yobi2'), '火');
test(format('2015-1-7' , 'yobi2'), '水');

// yobi3
test(format('2015-1-1' , 'yobi3'), '祝日');
test(format('2015-1-2' , 'yobi3'), '金曜日');
test(format('2015-1-3' , 'yobi3'), '土曜日');
test(format('2015-1-4' , 'yobi3'), '日曜日');
test(format('2015-1-5' , 'yobi3'), '月曜日');
test(format('2015-1-6' , 'yobi3'), '火曜日');
test(format('2015-1-7' , 'yobi3'), '水曜日');

// eigyo
test(format('2015-1-1' , 'eigyo'), '休');
test(format('2015-1-2' , 'eigyo'), '休');
test(format('2015-1-3' , 'eigyo'), '休');
test(format('2015-1-4' , 'eigyo'), '休');
test(format('2015-1-5' , 'eigyo'), '月');
test(format('2015-1-6' , 'eigyo'), '火');
test(format('2015-1-7' , 'eigyo'), '水');

// eigyo2
test(format('2015-1-1' , 'eigyo2'), '休業日');
test(format('2015-1-2' , 'eigyo2'), '休業日');
test(format('2015-1-3' , 'eigyo2'), '休業日');
test(format('2015-1-4' , 'eigyo2'), '休業日');
test(format('2015-1-5' , 'eigyo2'), '月曜日');
test(format('2015-1-6' , 'eigyo2'), '火曜日');
test(format('2015-1-7' , 'eigyo2'), '水曜日');

// holiday
test(format('2015-1-1' , 'holiday'), '元日');
test(format('2015-1-2' , 'holiday'), '');
test(format('2015-1-12', 'holiday'), '成人の日');
test(format('2016-8-11', 'holiday'), '山の日');

// g
test(format('2015-1-1 0:00' , 'g'),  '0');
test(format('2015-1-1 1:00' , 'g'),  '1');
test(format('2015-1-1 10:00', 'g'), '10');
test(format('2015-1-1 12:00', 'g'),  '0');
test(format('2015-1-1 13:00', 'g'),  '1');
test(format('2015-1-1 23:00', 'g'), '11');

// G
test(format('2015-1-1 0:00' , 'G'),  '0');
test(format('2015-1-1 1:00' , 'G'),  '1');
test(format('2015-1-1 10:00', 'G'), '10');
test(format('2015-1-1 12:00', 'G'), '12');
test(format('2015-1-1 13:00', 'G'), '13');
test(format('2015-1-1 23:00', 'G'), '23');

// h
test(format('2015-1-1 0:00' , 'h'), '00');
test(format('2015-1-1 1:00' , 'h'), '01');
test(format('2015-1-1 10:00', 'h'), '10');
test(format('2015-1-1 12:00', 'h'), '00');
test(format('2015-1-1 13:00', 'h'), '01');
test(format('2015-1-1 23:00', 'h'), '11');

// H
test(format('2015-1-1 0:00' , 'H'), '00');
test(format('2015-1-1 1:00' , 'H'), '01');
test(format('2015-1-1 10:00', 'H'), '10');
test(format('2015-1-1 12:00', 'H'), '12');
test(format('2015-1-1 13:00', 'H'), '13');
test(format('2015-1-1 23:00', 'H'), '23');

// i
test(format('2015-1-1 00:00', 'i'), '00');
test(format('2015-1-1 00:01', 'i'), '01');
test(format('2015-1-1 00:10', 'i'), '10');

// s
test(format('2015-1-1 00:00:00', 's'), '00');
test(format('2015-1-1 00:00:01', 's'), '01');
test(format('2015-1-1 00:00:10', 's'), '10');

// u
test(format('2015-1-1 00:00:00.000', 'u'), '000000');
test(format('2015-1-1 00:00:00.001', 'u'), '001000');
test(format('2015-1-1 00:00:00.010', 'u'), '010000');
test(format('2015-1-1 00:00:00.100', 'u'), '100000');

// a
test(format('2015-1-1 0:00' , 'a'), 'am');
test(format('2015-1-1 1:00' , 'a'), 'am');
test(format('2015-1-1 10:00', 'a'), 'am');
test(format('2015-1-1 12:00', 'a'), 'pm');
test(format('2015-1-1 13:00', 'a'), 'pm');
test(format('2015-1-1 23:00', 'a'), 'pm');

// A
test(format('2015-1-1 0:00' , 'A'), 'AM');
test(format('2015-1-1 1:00' , 'A'), 'AM');
test(format('2015-1-1 10:00', 'A'), 'AM');
test(format('2015-1-1 12:00', 'A'), 'PM');
test(format('2015-1-1 13:00', 'A'), 'PM');
test(format('2015-1-1 23:00', 'A'), 'PM');

// aj
test(format('2015-1-1 0:00' , 'aj'), '午前');
test(format('2015-1-1 1:00' , 'aj'), '午前');
test(format('2015-1-1 10:00', 'aj'), '午前');
test(format('2015-1-1 12:00', 'aj'), '午後');
test(format('2015-1-1 13:00', 'aj'), '午後');
test(format('2015-1-1 23:00', 'aj'), '午後');

// エスケープ
test(format('2015-4-10', '{Y}/{m}/{d} updated'), '2015/04/10 updated');
test(format('2015-4-10', 'nennen2{nen3}nen4'), 'nennen2二十七nen4');

// 存在しないパラメータ文字列
test(format('2015-4-10', '{Ymd}'), '{Ymd}');
test(format('2015-4-10', '{Y}{md}'), '2015{md}');

// 混合
test(format('2015-4-10', 'Ymd'), '20150410');
test(format('2015-4-10', 'nennen2nen3nen4'), '2727二十七二七');

// 和暦入力
test(format('S50-1-2', 'Ymd'), '19750102');
test(format('昭和50年1月2日', 'Ymd'), '19750102');
test(format('S50 1 2', 'Ymd'), '19750102');






