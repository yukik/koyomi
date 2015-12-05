/**
 * *********************************************************
 *       (ユーティリティ関数) 休業期間の文字列化
 * *********************************************************
 */
module.exports = toStringSeasonHoliday;

/**
 * {
 *  '1229': '年末年始のお休み',
 *  '1230': '年末年始のお休み',
 *  '1231': '年末年始のお休み',
 *  '101' : '年末年始のお休み',
 *  '102' : '年末年始のお休み',
 *  '103' : '年末年始のお休み',
 *  '816' : 'お盆のお休み',
 *  '817' : 'お盆のお休み',
 *  '818' : 'お盆のお休み',
 *  '1010': '創立記念日'
 * } ->
 * 年末年始のお休み 1/1, 1/2, 1/3, お盆のお休み 8/16, 8/17, 8/18,
 * 創立記念日 10/10, 年末年始のお休み 12/29, 12/30, 12/31
 *
 * @param  {Object} value
 * @return {String}
 */
function toStringSeasonHoliday(value) {
  if (!value) {
    return null;
  }
  if (typeof value === 'function') {
    return value;
  }
  var cause = null;
  return Object.keys(value).map(x => {
    if (value[x] === cause) {
      return [+x.slice(0, x.length-2), '/', +x.slice(-2)].join('');
    } else {
      cause = value[x];
      return [cause, ' ', +x.slice(0, x.length-2), '/', +x.slice(-2)].join('');
    }
  }).join(', ');
}
