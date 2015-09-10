/**
 * *********************************************************
 *                        口語表記
 * *********************************************************
 */
module.exports = function (Koyomi) {
  Koyomi.kind = kind;
  Koyomi.prototype.kind = kind;
};

/**
 * dependencies
 */
var toDate = require('./fx/toDate');
var KIND_MARGIN = require('./config').KIND_MARGIN;

/**
 * const
 */
var POINTS = [
  [      60, '分'  ],
  [    3600, '時間'],
  [   86400, '日'  ],
  [ 2629800, 'ヶ月'], // 86400 * 365.25 / 12
  [31557600, '年'  ]  // 86400 * 365.25
];
POINTS.forEach(function(p){
  p.push(p[0] - p[0] * KIND_MARGIN);
});

/**
 * 人間が理解しやすい口語表記にする
 * @method kind
 * @param  {Date|String} date
 * @param  {Date|String} compareTo
 * @return {String}      
 */
function kind (date, compareTo) {
  date = toDate(date);
  compareTo = compareTo ? toDate(compareTo) : new Date();

  var diff =  (compareTo.getTime() - date.getTime()) / 1000;
  var surfix = 0 < diff ? '前' : '後';
  diff = Math.abs(diff);

  var i = POINTS.length - 1;
  var point = null;
  for(;point = POINTS[i]; i--) {
    if (point[2] <= diff) {
      var x = parseInt(diff / point[0], 10) + (point[2] <= diff % point[0] ? 1 : 0);
      return x + point[1] + surfix;
    }
  }
  return 'たった今';
}
