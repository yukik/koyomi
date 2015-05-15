# 年度

年度とは、


## getNendo

年度の開始と終了の日時を取得することができます  

`{Object} koyomi.getNendo({Date|String} date)`

  + プロパティ`startMonth`の値に影響します
  + `date`が含まれる期間の年度を検出します
  + 省略した場合は、本日を対象にします
  + 戻り値のオブジェクトは次の形式
  + `{from: Dateオブジェクト, to: Dateオブジェクト}`


## formatNendo

年度を表す文字列を返します

`{String} koyomi.formatNendo({Date|String} Date, {String} fromFormat, {String} toFormat, {Boolean} reverse)`

  + `date`が含まれる期間の年度を対象とします
  + 省略した場合は、本年度を対象にします
  + `fromFormat`と`toFormat`で整形された文字を結合して返します
  + `reverse`を`true`にした場合は結合の順を逆にします
  + `fromFormat`の既定値は`'Y/M'`、`toFormat`の規定値は`'-Y/M'`です
  + ただし、`fromFormat`が設定された場合は`toFormat`の規定値は`null`です
  + 4月初めの年度では、`koyomi.formatNendo('2015-3-5')`は`'2014/4-2015/3'`と返されます


## nendoDays

年度の総日数


## passNendoDays

年度始めからの経過日数


## remainNendoDays

年度末まで残りの日数


## separate

期間をブロックごとに分割(年度、月、日)します
(時以下は切り捨てられます)

```
{
  days: {from: from, to: to},
}

{
  remainDays:  from,
  fromMonths: {date: date, times: times},
  nendo     : {date: date, times: times},
  toMonths  : {date: date, times: times},
  passDays  :  to
}
```



