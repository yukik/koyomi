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

  // 曜日
  WEEK      : 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday'.split(','),
  WEEK_SHORT: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat'.split(','),
  JWEEK     : '日月火水木金土'.split(''),

  // 単位
  TANI: {
    d : ['days', 'day', '日'],
    m : ['mo', 'mon', 'month', 'months', '月', 'カ月', 'ヶ月', 'ケ月', 'か月'],
    y : ['year', 'years', '年', 'カ年', 'ヶ年', 'ケ年', 'か年'],
    i : ['min', 'minute', 'minutes', '分'],
    h : ['hour', 'hours', '時', '時間'],
    w : ['week', 'weeks', '週', '週間'],
    s : ['sec', 'second', 'seconds', '秒']
  }
};


module.exports = CONST;