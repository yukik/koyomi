/**
 * *********************************************************
 *                       営業日計算
 * *********************************************************
 */
var toDate = require('./fx/toDate');
var A_DAY = require('./const').A_DAY;

/**
 * 営業日の算出
 *
 * 適用事例:納品日を表示したい等
 *
 * 営業日を計算します
 * 時間部分の値は変化しません
 * 一年先(前)に見つからなかった場合はnullを返します
 * 
 * 営業日のルールは以下のとおり
 *
 * 加算する日数に1以上の場合は、翌営業日からカウントして算出します
 * 加算する日数が0の場合は、dataが営業日であればdateを、そうでない場合は翌営業日を返します
 * 加算する日数が-1以下の場合は、さかのぼって算出します
 *
 * その際includeがtrueの場合、dateもカウントの対象に含みます
 * 加算する日数が0の場合はincludeは無視されます
 * 
 * @method addEigyobi
 * @param  {Date|String}     date
 * @param  {Number}          days     加算する日数
 * @param  {Boolean}         include  初日を含む
 */
function addEigyobi(date, days, include) {
  var koyomi = this;
  date = toDate(date);
  if (!date) {
    return null;
  }

  // 0の場合の補正  +1営業日で前日からにすると同じ
  if (days === 0) {
    days = 1;
    date.setTime(date.getTime() - A_DAY);

  } else if (include) {
    // 当日を含む場合は、一日前（先）にずらして調査すると同じ
    date.setTime(date.getTime() + (0 < days ? -A_DAY : A_DAY));
  }

  // 最大調査日数
  var max = 365;

  // 以下営業日の計算
  while(days) {
    date.setTime(date.getTime() + (0 < days ? A_DAY : -A_DAY));
    if (koyomi.isOpened(date)) {
      days = 0 < days ? days - 1 : days + 1;
    }
    if (--max < 0) {
      return null;
    }
  }
  return date;
}

/**
 * 営業日から逆引き
 *
 * 適用事例：納品しなければならない注文の受注日の閾日を調べたい等
 *
 * dateが営業日の場合
 *   dateからdays営業日を引いた日付を返します
 * dateが休業日の場合
 *   dateから一番近い営業日からdays営業日を引いた日付を返します
 * 時間部分の値は変化しません
 * 一年先(前)に見つからなかった場合はnullを返します
 * 
 * 1以上の場合は、過去の日付を返します
 * daysが0の場合はその日が営業日ならその日を、そうでなければ一番近い日を返します
 * -1以下の場合は、未来の日付を返します
 * 
 * @method toEigyobi
 * @param  {Date|String}     date
 * @param  {Number}          days
 * @param  {Boolean}         include   初日を含む
 * @return {Date}            date
 */
function toEigyobi(date, days, include) {
  var koyomi = this;
  date = toDate(date);
  if (!date) {
    return null;
  }

  // 0の場合の補正  過去に一番近い営業日となる
  if (days === 0) {
    return koyomi.addEigyobi(date, -1, true);
  }

  // 順行
  var forward = 0 < days ? 1 : -1;

  // loopで最初に1日進むので1日対象を戻しておく
  date.setTime(date.getTime() + A_DAY * forward);

  // 最大調査日数
  var max = 365;

  // 逆引き調査
  while (days) {
    date.setTime(date.getTime() - A_DAY * forward);
    if (koyomi.isOpened(date)) {
      days -= forward;
    }
    if (--max < 0) {
      return null;
    }
  }
  if (!include) {
    date.setTime(date.getTime() - A_DAY * forward);
  }
  return date;
}

/**
 * 営業日数の調査
 *
 * 適用事例: 出勤日数を調べる
 * 
 * (月、年度の営業日数をキャッシュしながら計算します)
 * そのため、べたループではなく内部では次のメソッドを利用します。
 *   passEigyobi, remainEigyobi, monthEigyobi, nendoEigyobi
 * 
 * @method countEigyobi
 * @param  {String|Date}     from
 * @param  {String|Date}     to
 * @return {Number}          count
 */
function countEigyobi (from, to) {
  var koyomi = this;
  var Koyomi = koyomi.Koyomi;
  from = toDate(from, true);
  to = toDate(to, true);
  if (!from || !to || to.getTime() < from.getTime()) {
    return null;
  }
  
  // 期間を分割
  var terms = this.separate(from, to);
  if (!terms) {
    return null;
  }

  // 日数
  var count = 0;

  // 同月内
  if (terms.days) {
    while(from.getTime() <= to.getTime()) {
      if (koyomi.isOpened(from)) {
        count++;
      }
      from.setTime(from.getTime() + A_DAY);
    }
    return count; // ここで処理終了
  }

  // 開始の端数日
  if (terms.remainDays) {
    count += koyomi.remainEigyobi(terms.remainDays);
  }

  // 年度前
  if (terms.fromMonths) {
    var f = terms.fromMonths.date;
    for(var fi = 0, ftimes = terms.fromMonths.times; fi  < ftimes; fi ++) {
      count += koyomi.monthEigyobi(f);
      f = Koyomi.add(f, '1month');
    }
  }

  // 年度
  if (terms.nendo) {
    var n = terms.nendo.date;
    for(var ni = 0, ntimes = terms.nendo.times; ni  < ntimes; ni ++) {
      count += koyomi.nendoEigyobi(n);
      n = Koyomi.add(n, '1year');
    }
  }

  // 年度後
  if (terms.toMonths) {
    var t = terms.toMonths.date;
    for(var ti = 0, ttimes = terms.toMonths.times; ti  < ttimes; ti ++) {
      count += koyomi.monthEigyobi(t);
      t = Koyomi.add(t, '1month');
    }
  }

  // 終了の端数日
  if (terms.passDays) {
    count += koyomi.passEigyobi(terms.passDays);
  }

  return count;
}

/**
 * 日が含まれる年度の営業日数  (キャッシュ有効)
 * @method countNendoEigyobi
 * @param  {Date|String} date
 * @return {Number}      count
 */
function nendoEigyobi(date) {
  var Koyomi = this.Koyomi;
  date = toDate(date);
  if (!date) {
    return null;
  }
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var nendoKey = year + (month < this.startMonth ? -1 : 0);
  if (nendoKey in this._eigyoCountCache) {
    return this._eigyoCountCache[nendoKey];
  }

  var range = this.getNendo(date);
  var from = range.from;
  var to = range.to;
  var count = 0;
  while(from < to) {
    count += this.monthEigyobi(from.getFullYear(), from.getMonth() + 1);
    from = Koyomi.add(from, '1か月');
  }
  this._eigyoCountCache[nendoKey] = count;
  return count;
}

/**
 * 月の営業日数 (キャッシュ有効)
 *   引数が２つの場合は、year,monthを渡したとみなします
 * @method monthEigyobi
 * @param  {Date|String|Number} date/year
 * @param  {Number}             month
 * @return {Number} count
 */
function monthEigyobi(year, month) {
  var koyomi = this;
  if (arguments.length === 1) {
    var date = toDate(year);
    if (!date) {
      return null;
    }
    year  = date.getFullYear();
    month = date.getMonth() + 1;
  }

  var key = year + '-' + month;

  // キャッシュを返す
  if (key in koyomi._eigyoCountCache) {
    return koyomi._eigyoCountCache[key];
  }

  // 営業日数調査
  var count = 0;
  var from = new Date(year, month - 1, 1);
  var to = new Date(year, month, 0);
  while(from.getTime() <= to.getTime()) {
    if (koyomi.isOpened(from)) {
      count++;
    }
    from.setTime(from.getTime() + A_DAY);
  }

  // キャッシュする
  koyomi._eigyoCountCache[key] = count;
  return count;
}

/**
 * 年度開始から経過した営業日数
 * @method passNendoEigyobi
 * @param  {Date|String}    date
 * @return {Number}         count
 */
function passNendoEigyobi (date) {
  date = toDate(date);
  if (!date) {
    return null;
  }
  var sm = this.startMonth;
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  var d = date.getDate();
  var startY = m < sm ? y - 1: y;
  var last = new Date(y, m, 0).getDate() === d;
  var count = 0;
  if (!last) {
    count = this.passEigyobi(date);
    m--;
  }
  var loop = y*12 + m - startY*12 - sm;
  while(0 <= loop) {
    count += this.monthEigyobi([startY, sm]);
    sm++;
    loop--;
  }
  return count;
}

/**
 * 月初からの経過した営業日数
 * @method passEigyobi
 * @param  {Date|String} date
 * @return {Number}      count
 */
function passEigyobi(date) {
  var koyomi = this;
  var count = 0;
  date = toDate(date, true);
  var from = new Date(date.getFullYear(), date.getMonth(), 1);
  while(from.getTime() <= date.getTime()) {
    if (koyomi.isOpened(from)) {
      count++;
    }
    from.setTime(from.getTime() + A_DAY);
  }
  return count;
}

/**
 * 年度終了までの残りの営業日数
 * @method remainNendoEigyo
 * @param  {Date|String}    date
 * @return {Number}         count
 */
function remainNendoEigyobi (date) {
  date = toDate(date);
  if (!date) {
    return null;
  }
  var sm = this.startMonth;
  var em = sm === 1 ? 12 : sm - 1;
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  var d = date.getDate();
  var endY = sm !== 1 && sm < m ? y + 1: y;
  var first = d === 1;
  var count = 0;
  if (!first) {
    count = this.remainEigyobi(date);
    m++;
  }
  var loop = endY*12 + em - y*12 - m;

  while(0 <= loop) {
    count += this.monthEigyobi([y, sm]);
    sm++;
    loop--;
  }
  return count;
}

/**
 * 月末までの残りの営業日数
 * @method remainEigyobi
 * @param  {Date|String} date
 * @return {Number}      count
 */
function remainEigyobi(date) {
  var koyomi = this;
  var count = 0;
  date = toDate(date, true);
  var to = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  while(date.getTime() <= to.getTime()) {
    if (koyomi.isOpened(date)) {
      count++;
    }
    date.setTime(date.getTime() + A_DAY);
  }
  return count;
}

/**
 * キャッシュを削除
 * @method resetEigyobiCache
 * @param  {Date|String}     date
 * @return {Boolean}         success
 */
function resetEigyobiCache (date) {

  if (!date) {
    this._eigyoCountCache = {};
    return true;
  }
  
  date = toDate(date);
  if (!date) {
    return false;
  }

  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  // 月キャッシュの削除
  delete this._eigyoCountCache[year + '-' + month];

  // 年度キャッシュの削除
  year = year + (month < this.startMonth ? -1 : 0);
  delete this._eigyoCountCache[year];

  return true;
}


// ------------------------------------------------------------------    EXPORTS
module.exports = function (Koyomi) {

  Koyomi.initialize.push(function(koyomi) {

    /**
     * 次のプロパティが更新された場合はキャッシュが破棄されます
     * regularHoliday, seasonHoliday, holidayOpened, startMonth
     * 次のメソッドが実行された場合は、キャッシュの一部が破棄されます
     * open, close, reset
     */
    koyomi._eigyoCountCache = {};
  });

  Koyomi.prototype.addEigyobi         = addEigyobi;
  Koyomi.prototype.toEigyobi          = toEigyobi;
  Koyomi.prototype.countEigyobi       = countEigyobi;
  Koyomi.prototype.nendoEigyobi       = nendoEigyobi;
  Koyomi.prototype.monthEigyobi       = monthEigyobi;
  Koyomi.prototype.passNendoEigyobi   = passNendoEigyobi;
  Koyomi.prototype.passEigyobi        = passEigyobi;
  Koyomi.prototype.remainNendoEigyobi = remainNendoEigyobi;
  Koyomi.prototype.remainEigyobi      = remainEigyobi;
  Koyomi.prototype.resetEigyobiCache  = resetEigyobiCache;

};