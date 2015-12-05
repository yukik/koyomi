/*global koyomi*/

/**
 * 入力フォームのidから自動的に計算結果を貼り付けます
 */
var format = koyomi.format.bind(koyomi);

// 初期値の設定
function load(skip){
  if (!skip) {
    setConfig();
  }

  var now = new Date();

  var dt = format(now);
  var d = format(now, 'YYYY-MM-DD');
  var y = now.getFullYear();
  var m = now.getMonth() + 1;

  var els = document.getElementsByTagName('input');
  for(var i=0, len = els.length; i < len; i++) {
    var el = els[i];
    if (!el.value) {
      if (el.hasAttribute('y')) {
        el.value = y;

      } else if (el.hasAttribute('m')) {
        el.value = m;

      } else if (el.hasAttribute('dt')) {
        el.value = dt;

      } else if (el.hasAttribute('d')) {
        el.value = d;
      }
      calc({target: el});
    }
  }
}

// 設定変更
function setConfig() {
  var get = document.getElementById.bind(document);
  koyomi.defaultFormat = get('defaultFormat').value;
  koyomi.openOnHoliday = get('openOnHoliday').value === 'true';
  koyomi.regularHoliday= get('regularHoliday').value;
  koyomi.seasonHoliday = get('seasonHoliday').value;
  koyomi.startMonth    = +get('startMonth').value;
  koyomi.startWeek     = get('startWeek').value;
  load(true);
}

// 再計算
function calc(ev) {
  var id = ev.target.id;
  if (id.slice(-1) === 'R') {
    return;
  }
  var method = id.slice(0, id.length-1);
  var args = [];
  for (var i = 1, input; input = document.getElementById(method + i); i++) {
    args.push(parseArgVal(input.value.trim()));
  }

  var result;
  try {
    result = args.length ? koyomi[method].apply(koyomi, args) : koyomi[method]();
  } catch(e) {
    result = 'ERR';
  }

  try {
    document.getElementById(method + 'R').value = resultToString(result, method);
  } catch(e) {
    console.log(e.message);
  }
}

// 値パース
function parseArgVal(val) {
  if (val === 'null') {
    return null;
  } else if (val === '') {
    return undefined;
  } else if (val === 'true') {
    return true;
  } else if (val === 'false') {
    return false;
  } else if (/^\d+$/.test(val)) {
    return +val;
  } else {
    return val;
  }
}

// 結果文字列化
function resultToString(result) {

  if (result === null) {
    return 'null';
  }

  if (result instanceof Date) {
    return format(result);
  }

  if (Array.isArray(result)) {
    return '[' +
      result.map(function(r){return resultToString(r);}).join(', ') +
    ']';
  }

  if (typeof result === 'object' && result.from && result.to) {
    return format(result.from) + ' - ' + format(result.to);
  }

  if (typeof result === 'object') {
    return '{' +
        Object.keys(result).map(function(k){
          return k + ':\'' + resultToString(result[k]) +'\'';
        }).join(', ') +
      '}';
  }
  return result;
}


