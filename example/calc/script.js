/*global Koyomi*/

/**
 * 入力フォームのidから自動的に計算結果を貼り付けます
 * id名はクラスメソッドは最初の大文字にします
 * インスタンスメソッドはそのまま小文字です
 */

var koyomi;

// 初期値の設定
function load(skip){
  if (!skip) {
    setConfig();
  }

  var now = new Date();

  var dt = Koyomi.format(now);
  var d = Koyomi.format(now, 'YYYY-MM-DD');
  var y = now.getFullYear();
  var m = now.getMonth() + 1;

  var els = document.getElementsByTagName('input');
  for(var i=0, len = els.length; i < len; i++) {
    var el = els[i];
    if (el.value) {

    } else if (el.hasAttribute('y')) {
      el.value = y;

    } else if (el.hasAttribute('m')) {
      el.value = m;

    } else if (el.hasAttribute('dt')) {
      el.value = dt;

    } else if (el.hasAttribute('d')) {
      el.value = d;
    }

    var at = el.parentNode.parentNode.getAttribute('onKeyup');
    if (at === 'classCalc(event)') {
      classCalc({target: el});
    } else if (at === 'instanceCalc(event)') {
      instanceCalc({target: el});
    }
  }
}

// クラスメソッド
function classCalc(ev) {
  var format = Koyomi.format.bind(Koyomi);
  var id = ev.target.id;
  if (id.slice(-1) === 'R') {
    return;
  }
  var method = id.slice(0, id.length-1);
  var args = [];
  for (var i = 1, input; input = document.getElementById(method + i); i++) {
    args.push(parseArgVal(input.value.trim()));
  }
  var rEl = document.getElementById(method + 'R');
  method = method[0].toLowerCase() + method.slice(1);

  var result;
  try {
    result = args.length ? Koyomi[method].apply(Koyomi, args) : Koyomi[method]();
  } catch(e) {
    result = 'ERR';
  }
  rEl.value = resultToString(result, format);
}

// インスタンス設定変更
function setConfig() {
  var get = document.getElementById.bind(document);

  var config = {
    defaultFormat: get('defaultFormat').value,
    holidayOpened: get('holidayOpened').value === 'true',
    regularHoliday: get('regularHoliday').value,
    seasonHoliday: get('seasonHoliday').value,
    startMonth: get('startMonth').value * 1,
    startWeek: get('startWeek').value,
    six: get('six') === 'true'
  };
  try {
    koyomi = new Koyomi(config);
  } catch(e){}
  load(true);
}

// インスタンスメソッド
function instanceCalc(ev) {
  var format = koyomi.format.bind(koyomi);
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
  document.getElementById(method + 'R').value = resultToString(result, format);
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
    return val * 1;
  } else {
    return val;
  }
}

// 結果文字列化
function resultToString(result, format) {

  if (result === null) {
    return 'null';
  }

  if (result instanceof Date) {
    return format(result);
  }

  if (Array.isArray(result)) {
    return '[' + result.map(function(r){return resultToString(r, format);}).join(', ') + ']';
  }

  if (typeof result === 'object' && result.from && result.to) {
    return format(result.from) + ' - ' + format(result.to);
  }

  if (typeof result === 'object') {
    return '{' + (Object.keys(result).map(function(k){
      return k + ':\'' + result[k] +'\'';
    }).join(', ')) + '}';
  }

  return result;
}


