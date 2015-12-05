/**
 * *********************************************************
 *       (ユーティリティ関数) フォーマットのコンパイル
 * *********************************************************
 */
module.exports = compileFormat;

// コンパイル結果をキャッシュ
var compiledCache = {};
compileFormat.cache = compiledCache;

/**
 * dependencies
 */
var parameters = require('../parameters');

/**
 * alias
 */
var keys = Object.keys(parameters).sort((x, y) => y.length - x.length).join('|');

// {}付きパラメータ文字列を検出する正規表現
var MUSH = /\{([a-z]+)(?:>(\d))?\}/ig;
// パラメーター列挙した正規表現
var PARAM = new RegExp('(' + keys + ')(?:>(\\d))?', 'g');

/**
 * フォーマットからパラメーター文字列を検出して分解し返す
 *
 * YYYY年MM月DD日(W>1)>>漢数字
 *    => {v: [{p:'YYYY'}, '年', {p:'MM'}, '月', {p:'DD'}, '日(', {p:'W', o:1}, ')'], o: {kansuji: true}}
 *
 * @param  {String} value
 * @return {Array}  compiled
 */
function compileFormat (value) {
  var c = compiledCache[value];
  if (c) {
    return c;
  }

  var m;
  var lastIndex = 0;
  var v = [];
  var o = null;

  var REG = value.indexOf('{') === -1 ? PARAM : MUSH;

  while(m = REG.exec(value)){
    var index = m.index;

    if (lastIndex !== index) {
      v.push(value.slice(lastIndex, index));
    }
    if (parameters.hasOwnProperty(m[1])) {
      if (m[2]) {
        v.push({p: m[1], o: +m[2]});
      } else {
        v.push({p: m[1]});
      }
    } else {
      v.push(m[0]);
    }
    lastIndex = index + m[0].length;
  }
  if (lastIndex !== value.length) {
    var suf = value.slice(lastIndex);
    var sufIndex = suf.indexOf('>>');
    if (sufIndex === -1) {
      v.push(suf);
    } else {
      if (sufIndex !== 0) {
        v.push(suf.slice(0, sufIndex));
      }
      o = getOptions(suf.slice(sufIndex));
    }
  }
  REG.lastIndex = 0;

  c = o ? {v, o} : {v};
  compiledCache[value] = c;
  return c;
}

/**
 * オプションの解析
 * @param  {String} value
 * @return {Object} options
 */
function getOptions(value) {
  var options = {};
  if(include(value, '短縮')) {
    options.tanshuku = true;
  }
  if (include(value, '元年')) {
    options.gannen = true;
  }
  if (include(value, '漢数字フル')) {
    options.kansujiFull = true;
  } else if (include(value, '漢数字')) {
    options.kansuji = true;
  } else if (include(value, '漢字')) {
    options.kanji = true;
  } else if (include(value, '全角')) {
    options.zenkaku = true;
  }
  if (include(value, 'エスケープ')) {
    options.escape = true;
  }
  return Object.keys(options).length ? options : null;
}

function include (value, search) {
  return value.indexOf(search) !== -1;
}
