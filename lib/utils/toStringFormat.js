/**
 * *********************************************************
 *       (ユーティリティ関数) フォーマットを文字列化
 * *********************************************************
 */
module.exports = buildFormat;

var OPTIONS = {
  tanshuku   : '短縮',
  gannen     : '元年',
  kansujiFull: '漢数字フル',
  kansuji    : '漢数字',
  zenkaku    : '全角',
  escape     : 'エスケープ'
};

/**
 * {
 *   v: [{p:'YYYY'}, '年', {p:'MM'}, '月', {p:'DD'}, '日(', {p:'W', o:1}, ')'],
 *   o: {kansuji: true}
 * }
 *  => {YYYY}年{MM}月{DD}日({W>1})>>漢数字
 * @param  {Object} format
 * @return {String}
 */
function buildFormat(format) {
  return format.v.map(x=> typeof x === 'string' ? x :
               '{' + x.p + ('o' in x ? '>' + x.o : '') + '}').join('') +
        (format.o ? '>>' + Object.keys(format.o).map(x => OPTIONS[x]).join('') : '');
}
