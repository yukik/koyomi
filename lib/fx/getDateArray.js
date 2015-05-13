/**
 * *********************************************************
 *        (補助関数) 文字列から月日の配列を作成する
 * *********************************************************
 */

// 月日の期間の正規表現
var REG_DATE_LIST = /^(\d{1,2})\/(\d{1,2})(?:-(\d{1,2})\/(\d{1,2}))?$/;

// 存在しない日付
var REMOVE_DATE = [230, 231, 431, 631, 931, 1131];

/**
 * '12/29-1/3, 8/16-8/18, 10/10'
 *     -> [1229, 1230, 1231, 101, 102, 103, 816, 817, 818, 1010] 
 * @method getDateArray
 * @param  {String}     value
 * @return {Array}
 */
function getDateArray(value) {
  var result = [];
  value.split(',').forEach(function(s){
    var m = s.trim().match(REG_DATE_LIST);
    if (m && m[3]) {
      var m1 = m[1] * 1;
      var d1 = m[2] * 1;
      var m2 = m[3] * 1;
      var d2 = m[4] * 1;
      if (m2 < m1) {
        m2 += 12;
      }
      while(m1 * 100 + d1 <= m2 * 100 + d2) {
        result.push((12 < m1 ? m1 - 12 : m1) * 100 + d1);
        if (31 <= d1) {
          m1++;
          d1 = 1;
        } else {
          d1++;
        }
      }
    } else if (m) {
      result.push(m[1]*100 + m[2]*1);
    }
  });
  return result.filter(function (x) {
    return !~REMOVE_DATE.indexOf(x);
  });
}

module.exports = getDateArray;
