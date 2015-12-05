/**
 * *********************************************************
 *         (ユーティリティ関数) 週インデックス取得
 * *********************************************************
 */
module.exports = getWeekIndex;

/**
 * dependencies
 */
var CONFIG = require('../config');

/**
 * alias
 */
var WEEK_INDEXES = [].slice
        .call(CONFIG.JWEEK)
        .concat(CONFIG.WEEK.map(w => w.toLowerCase().slice(0, 3)))
        .concat(CONFIG.WEEK.map(w => w.toLowerCase()))
        .concat(CONFIG.JWEEK.map(w => w + '曜日'))
        .reduce((x, y, i) => {x[y] = i % 7;return x;}, {});

/**
 * 週の文字列からインデックスを返す
 * 配列を渡した場合は、配列で返す
 * 判別できる週の文字列がひとつもない場合はnullを返す
 * カンマ区切りの文字列は配列で返す
 *
 * '日' -> 0,  'sat' -> 6, ['月', '火', '休'] -> [1, 2]
 * '祝' -> null, ['休', '祝'] -> null
 * '土,日' -> [6, 0]
 *
 * @method getWeekIndex
 * @param  {String|Array|Number} week
 * @return {Number|Array}        index
 */
function getWeekIndex (week) {
  if (Array.isArray(week)) {
    var idxes = week.map(w => typeof w === 'string' ? index(w) : null)
                    .filter(x => x !== null);
    return  idxes.length ? idxes : null;

  } else if (typeof week === 'string') {
    if (week.indexOf(',') !== -1) {
      return getWeekIndex(week.split(',').map(x => x.trim()));
    } else {
      return index(week);
    }

  } else if (typeof week === 'number') {
    return CONFIG.WEEK.hasOwProperty(week) ? week : null;
  }

  return null;
}

// インデックスを返す
function index(w) {
  var idx =  WEEK_INDEXES[w.toLowerCase()];
  return typeof idx === 'number' ? idx : null;
}
