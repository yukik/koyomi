/**
 * *********************************************************
 *       (ユーティリティ関数) 全体オプションの変換
 * *********************************************************
 */
module.exports = formatOption;

/**
 * dependencies
 */
var suji = require('./suji');

/**
 * 全体オプションを処理する
 * @method convertFormatOption
 * @param  {String} value
 * @param  {Object} options オプション
 *             tanshuku    短縮  : 0分・0秒を省略
 *             kansuji     漢数字: 位あり漢字表記。ただし西暦は漢字
 *             kansujiFull 漢数字: 位あり漢字表記
 *             kanji       漢字  : 位なし漢字表記
 *             zenkaku     全角  : 全角数字に変換
 *             escape      エスケープ: & < > " 'を無害処理
 * @return {String} value
 */
function formatOption (value, options) {

  // 8時0分0秒 -> 8時
  if (options.tanshuku) {
    value = value.replace(/(\D)0秒/, (m, D) => D);
    if (value.indexOf('秒') === -1) {
      value = value.replace(/(\D)0分/, (m, D) => D);
    }
  }

  // 平成1年9月9日 -> 平成元年9月9日
  if (options.gannen) {
    value = value.replace(/(\D)1年/, (m, D) => D + '元年');
  }

  // 以下は排他
  // 2000年12月23日 -> 二〇〇〇年十二月二十三日
  if (options.kansuji) {
    value = value.replace(/(\D)1年/, (m, D) => D + '元年');
    value = value.replace(/\d+/g, d => d.length < 3 ? suji(+d, '漢数字') : suji(+d, '漢字'));

  // 2000年12月23日 -> 二千年十二月二十三日
  } else if (options.kansujiFull) {
    value = value.replace(/(\D)1年/, (m, D) => D + '元年');
    value = value.replace(/\d+/g, d => suji(+d, '漢数字'));

  // 2000年12月23日 -> 二〇〇〇年一二月二三日
  } else if (options.kanji) {
    value = value.replace(/(\D)1年/, (m, D) => D + '元年');
    value = value.replace(/\d+/g, d => suji(+d, '漢字'));

  // 2000年12月23日 -> ２０００年１２月２３日
  } else if (options.zenkaku) {
    value = value.replace(/\d+/g, d => suji(+d, '全角'));

  }

  // エスケープ
  if (options.escape) {
    value = escapeHtml(value);
  }

  return value;
}


// HTMLエスケープ
function escapeHtml(str) {
  str = str.replace(/&/g, '&amp;');
  str = str.replace(/</g, '&lt;');
  str = str.replace(/>/g, '&gt;');
  str = str.replace(/"/g, '&quot;');
  str = str.replace(/'/g, '&#39;');
  return str;
}