/**
 * *********************************************************
 *                    定数    (変更不可)
 * *********************************************************
 */
var CONST = {

  // 1日のミリ秒
  A_DAY: 86400000,

  // 月名一覧
  MONTH : 'January,February,March,April,May,June,July,August,September,October,November,December'.split(','),
  JMONTH: '睦月,如月,弥生,卯月,皐月,水無月,文月,葉月,長月,神無月,霜月,師走'.split(','),

  // 日の接尾語
  SUFFIX: ('th,' +
    'st,nd,rd,th,th,th,th,th,th,th,' +
    'th,th,th,th,th,th,th,th,th,th,' +
    'st,nd,rd,th,th,th,th,th,th,th,st').split(','),

  // 曜日
  WEEK      : 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday'.split(','),
  WEEK_SHORT: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat'.split(','),
  JWEEK     : '日月火水木金土'.split('')

};


module.exports = CONST;