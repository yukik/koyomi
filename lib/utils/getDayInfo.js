/**
 * *********************************************************
 *            (ユーティリティ関数) 日の情報取得
 * *********************************************************
 */
module.exports = getDayInfo;

/**
 * 日の個別データを返す
 * 営業設定・休業設定・イベントなどが登録されている
 * @method getDayInfo
 * @param  {Object}  days
 * @param  {date}    date
 * @param  {Boolean} create  存在しない場合は空の個別データを作成する
 * @return {Object}  info
 */
function getDayInfo (days, date, create) {
  var key = createKey(date);
  var info = days[key];
  if (!info && create) {
    info = {events: []};
    days[key] = info;
  }
  return info || null;
}

/**
 * 保存キー
 */
function createKey(date) {
  return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
}
