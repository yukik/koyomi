/**
 * *********************************************************
 *             (補助関数) 週インデックス取得
 * *********************************************************
 */
var CONST = require('../const');

// 曜日名一覧  英語は小文字に変更されます
var WEEK_NAMES = [].slice
        .call(CONST.JWEEK)
        .concat(CONST.WEEK.map(function(w){
          return w.toLowerCase().slice(0, 3);
        }))
        .concat(CONST.WEEK.map(function(w){
          return w.toLowerCase();
        }));

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
    var idxes = week.map(function(w){
                      if (Array.isArray(w)) {
                        return null;
                      }
                      return getWeekIndex(w);
                    }).filter(function(x){
                      return x !== null;
                    });
    return  idxes.length ? idxes : null;

  } else if (typeof week === 'string') {
    if (~week.indexOf(',')) {
      return getWeekIndex(week.split(',').map(function(x){return x.trim();}));
    }
    var idx =  WEEK_NAMES.indexOf(week.toLowerCase()) % 7;
    return idx === -1 ? null : idx;

  } else if (typeof week === 'number') {
    return 0 <= week && week <= 6 ? ~~week : null;
  }

  return null;
}

module.exports = getWeekIndex;