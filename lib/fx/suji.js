/**
 * *********************************************************
 *                   (補助関数) 数字変換
 * *********************************************************
 */

var JNUM = '〇,一,二,三,四,五,六,七,八,九'.split(',');
var ZNUM = '０,１,２,３,４,５,６,７,８,９'.split(',');
var ALL_NUM = [].slice.call(JNUM).concat(ZNUM);

/**
 * 数字を漢数字・漢字・全角に変更します
 * 文字列は漢数字・漢字・全角に変更後とみなし、逆に数字に変更します
 * 
 * 第二引数による動作の違いは以下のとおり
 *         0  3    10    15    20     24      63        1998        2000      2015
 * 漢数字: 〇 三   十   十五  二十  二十四  六十三  千九百九十八    二千    二千十五
 * 漢字  : 〇 三  一〇  一五  二〇   二四    六三    一九九八     二〇〇〇  二〇一五
 * 全角  : ０ ３  １０  １５  ２０   ２４    ６３    １９９８     ２０００  ２０１５
 * 
 * 
 * @method suji
 * @param  {Number|String} num
 * @param  {String}        type
 * @return {String|Number} suji
 */
function suji (num, type) {

  if (typeof num === 'string') {
    return reverse(num);
  }

  if (typeof num !== 'number') {
    return '';
  }

  switch(type) {

  case '漢数字':
    return kansuji(num);

  case '漢字':
    return kanji(num);

  case '全角':
    return zenkaku(num);

  case '序数':
    return josu(num);

  default:
    return num;
  }
}


/**
 * 漢数字 (0から9999まで対応)
 * @method kansuji
 * @param  {Number} num
 * @return {String} suji
 */
function kansuji (num) {

  if (num === 0) {
    return '〇';
  } else if (num < 0 || 9999 < num) {
    return '';
  }

  var kurai = ('0000' + num).slice(-4).split('');
  var s = kurai[0] * 1;
  var h = kurai[1] * 1;
  var j = kurai[2] * 1;
  var i = kurai[3] * 1;

  return (s === 0 ? '' : s === 1 ? '千' : JNUM[s] + '千') +
         (h === 0 ? '' : h === 1 ? '百' : JNUM[h] + '百') +
         (j === 0 ? '' : j === 1 ? '十' : JNUM[j] + '十') +
         (i === 0 ? '' : JNUM[i]);

}

/**
 * 漢字
 * @method kanji
 * @param  {Number} num
 * @return {String} suji
 */
function kanji (num) {
  return ('' + num).split('').map(function(x){return JNUM[x * 1];}).join('');
}

/**
 * 全角
 * @method zenkaku
 * @param  {Number} num
 * @return {String} suji
 */
function zenkaku (num) {
  return ('' + num).split('').map(function(x){return ZNUM[x * 1];}).join('');
}

/**
 * 漢数字・漢字・全角を半角数字に変換
 * @method reverse
 * @param  {String} value
 * @return {String} value
 */
function reverse (value) {
  var r = '';
  var stack = null;
  var num = null;

  var a = (value + 'E').split('');

  for(var i = 0, j = a.length - 1; i <= j; i++) {
    var x = a[i];
    switch(x) {
    case '千':
      stack = (stack || 0) + (num || 1) * 1000;
      num = null;
      break;
    case '百':
      stack = (stack || 0) + (num || 1) * 100;
      num = null;
      break;
    case '十':
      stack = (stack || 0) + (num || 1) * 10;
      num = null;
      break;
    default:
      var idx = ALL_NUM.indexOf(x);
      if (idx === -1) {
        if (stack !== null || num !== null) {
          r += (stack || 0) + (num || 0);
          stack = null;
          num = null;
        }
        if (i !== j) {
          r += x;
        }
      } else {
        if (num === 0) {
          r += '0';
        }
        num = (num || 0) * 10 + (idx % 10);
      }
      break;
    }
  }
  return r;
}

/**
 * 序数
 * @method josu
 * @param  {Number} num
 * @return {String} suji
 */
function josu (num) {
  // 10-19, 110-119, 210-219...
  if (parseInt(num % 100 / 10 , 10) === 1) {
    return num + 'th';
  }

  switch(num % 10) {
  case 1:
    return num + 'st';
  case 2:
    return num + 'nd';
  case 3:
    return num + 'rd';
  default:
    return num + 'th';
  }
}

module.exports = suji;

