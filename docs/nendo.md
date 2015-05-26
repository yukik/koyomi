# 年度

年度とは、特定の目的のために規定された1年間の区切り方です  
日本での会計年度は4月に始まり3月末に終わるため、年度を基準とした計算が便利なことが多くなります  
年度のメソッドはいずれもインスタンスメソッドです

## getNendo

年度の開始と終了の日時を取得することができます  

`{Object} koyomi.getNendo({Date|String} date)`

  + プロパティ`startMonth`の値に影響します
  + `date`が含まれる期間の年度を検出します
  + 省略した場合は、本日を対象にします
  + 戻り値のオブジェクトは次の形式です
      + `{from: Dateオブジェクト, to: Dateオブジェクト}`


## formatNendo

年度を表す文字列を返します

`{String} koyomi.formatNendo({Date|String} Date, {String} fromFormat, {String} toFormat, {Boolean} reverse)`

  + `date`が含まれる期間の年度を対象とします
  + 省略した場合は、本年度を対象にします
  + `fromFormat`と`toFormat`で整形された文字を結合して返します
  + `reverse`を`true`にした場合は結合の順を逆にします
  + `fromFormat`の既定値は`'Y/M'`、`toFormat`の既定値は`'-Y/M'`です
  + ただし、`fromFormat`が設定された場合は`toFormat`の既定値は`null`です
  + 4月初めの年度では、`koyomi.formatNendo('2015-3-5')`は`'2014/4-2015/3'`と返されます


## nendoDays

年度の総日数を返します

`{Number} koyomi.nendoDays({Date|String} date)`


## passNendoDays

年度始めからの経過日数を返します

`{Number} koyomi.passNendoDays({Date|String} date)`


## remainNendoDays

年度末まで残りの日数を返します

`{Number} koyomi.remainNendoDays({Date|String} date)`


# ドキュメント一覧

  + [イントロダクション ../README.md](../README.md)
  + [インスタンスの作成 ./instance.md](./instance.md)
  + [フォーマット ./format.md](./format.md)
  + [日時の情報取得・操作 ./calc-date.md](./calc-date.md)
  + [営業日計算 ./eigyobi.md](./eigyobi.md)
  + [カレンダー情報 ./calendar.md](./calendar.md)
  + 年度 ./nendo.md
  + [祝日 ./holiday.md](./holiday.md)
  + [営業・休業 ./open-close.md](./open-close.md)
  + [補助関数 ./helper.md](./helper.md)
