/**
 * *********************************************************
 *       (ユーティリティ関数) 休業期間のコンパイル
 * *********************************************************
 */
module.exports = compileSeasonHoliday;

/**
 * alias
 */
// 月日の期間の正規表現
var REG_DATE_LIST = /^(\D*)(\d{1,2})\/(\d{1,2})(?:-(\d{1,2})\/(\d{1,2}))?$/;

// 配列->マップオブジェクト
var makeMap = v => v.reduce((x, y) => (x[y] = true, x), {});

// 存在しない日付
var REMOVE_DATE = makeMap('230,231,431,631,931,1131'.split(','));

/**
 * 年末年始・お盆休みの定義
 *
 * '年末年始のお休み 12/29-1/3, お盆のお休み 8/16-8/18, 創立記念日10/10' ->
 *   {
 *     '1229': '年末年始のお休み',
 *     '1230': '年末年始のお休み',
 *     '1231': '年末年始のお休み',
 *     '101' : '年末年始のお休み',
 *     '102' : '年末年始のお休み',
 *     '103' : '年末年始のお休み',
 *     '816' : 'お盆のお休み',
 *     '817' : 'お盆のお休み',
 *     '818' : 'お盆のお休み',
 *     '1010': '創立記念日'
 *   }
 *
 * @param  {String} value
 * @return {Object} compiled
 */
function compileSeasonHoliday (value) {

  if (typeof value === 'function') {
    return value;

  } else if (typeof value === 'string') {
    value = getDateObject(value);
    return value && Object.keys(value).length ? value : null;

  } else {
    return null;

  }
}

/**
 * 文字列から月日のオブジェクトを作成する
 * @method getDateObject
 * @param  {String}  value
 * @return {Array}   days
 */
function getDateObject(value) {
  var result = {};
  var cause = '休業期間';

  value.split(',').forEach(v => {
    var m = v.match(REG_DATE_LIST);
    if (!m) {
      return;
    }

    var key;
    cause = (m[1] ? m[1].trim() : null) || cause;

    //  m1/d1-m2/d2
    if (m[4]) {
      var m1 = +m[2];
      var d1 = +m[3];
      var m2 = +m[4];
      var d2 = +m[5];
      if (m2 < m1) {
        m2 += 12;
      }
      while(m1 * 100 + d1 <= m2 * 100 + d2) {
        key = (12 < m1 ? m1 - 12 : m1) * 100 + d1;
        if (!REMOVE_DATE[key]) {
          result[key] = cause;
        }
        if (31 <= d1) {
          m1++;
          d1 = 1;
        } else {
          d1++;
        }
      }

    //   m/d
    } else {
      key = m[2] * 100 + m[3] * 1;
      result[key] = cause;
    }
  });
  return result;
}
