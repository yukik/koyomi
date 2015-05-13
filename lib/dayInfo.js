/**
 * *********************************************************
 *                    日データ管理
 * *********************************************************
 */
var toDate = require('./fx/toDate');

/** 
 * 日毎のデータを管理
 * 営業日・休業日・イベントデータ
 * @method getDayInfo
 * @param  {Date|String} date
 * @param  {Boolean}     create  存在しない場合は追加する
 * @return {Object}      info
 */
function getDayInfo (date, create) {
  date = toDate(date);
  if (!date) {
    return null;
  }
  var key = date.getFullYear() * 10000 + date.getMonth() * 100 + date.getDate();
  var info = this.daysInfo[key];
  if (!info && create) {
    info = {events: []};
    this.daysInfo[key] = info;
  }
  return info || null;
}

module.exports = function (Koyomi) {
  
  Koyomi.prototype.getDayInfo = getDayInfo;

  Koyomi.initialize.push(function(koyomi){
    koyomi.daysInfo = {};
  });
};
