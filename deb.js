/**
 * console.logの代替え 行数・カラムを出力することができます
 * @param  {String|Number|Boolean|Date} v
 * @param  {Number}                     depth 呼び出し元を遡る場合に1以上の値
 */
module.exports = function deb(v, depth) {
  var stack = {};
  Error.captureStackTrace(stack, deb);
  var info = stack.stack
    .split(/[\r\n]+/)
    .reduce(function(x, y){
      var m = y.match(/at (.*) \((.+\.js):([0-9]+):([0-9]+)/);
      if (m) {
        var index = m[2].indexOf(__dirname);
        var file = index === -1 ? m[2] : m[2].slice(index + __dirname.length + 1);
        x.push({method: m[1], file: file, line: m[3], column: m[4]});
      }
      return x;
    }, [])[depth || 0];

  if (!info) {
    console.log(v);
  } else if (v && typeof v === 'object') {
    console.log(v);
    console.log('                        : ' +
                info.file + '(' + info.line + ',' + info.column + ')');
  } else {
    console.log(v + ' : ' +  info.file + '(' + info.line + ',' + info.column + ')');
  }
};










