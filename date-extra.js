
/**
 * テストやデバッグで便利なようにDateの表記を見やすいように変更しています
 * lib内では使用していません
 *
 * console.logやassertのエラー出力の場合に以下の表記がされるようになります
 *
 * 基本形 Y-M-D H:II:SS.sss
 * 時以下が0時0分0.0秒の場合は Y-M-D
 * 秒が0.0秒の場合は Y-M-D H:II
 * ミリ秒が0の場合は Y-M-D H:II:SS
 */
Date.prototype.toString = function () {
  var v = this;
  var date = v.getFullYear() + '-' + (v.getMonth() + 1) + '-' + v.getDate();
  var h = v.getHours();
  var i = v.getMinutes();
  var s = v.getSeconds();
  var ms = v.getMilliseconds();
  ms = ms ? '.' + ('00' + ms).slice(-3) : '';
  s  = s || ms ? ':' + ('0' + s).slice(-2) : '';
  var time = h || i || s || ms ? ' ' + h + ':' + ('0' + i).slice(-2) + s + ms : '';
  return date + time;
};

/**
 * 月の数字をインデックスではなくそのまま月にしたnew Dateの代替え
 * @param  {Number} y
 * @param  {Number} m
 * @param  {Number} d
 * @param  {Number} h
 * @param  {Number} i
 * @param  {Number} s
 * @param  {Number} ms
 * @return {Date}
 */
module.exports = function make(y, m, d, h, i, s, ms) {
  return new Date(y, m ? m-1 : 0, d||1, h||0, i||0, s||0, ms||0);
};
