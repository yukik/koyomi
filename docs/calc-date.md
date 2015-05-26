# 日付の計算

以下のすべてのメソッドは、クラスメソッドとしてもインスタンスメソッドしても使用できます

# add

加算(減算)することができる単位は、年、ケ月、週、日、時間、分、秒です  
各単位で使用できる記述は次のとおりです

  + 年: `y`, `year`, `years`, `年`, `カ年`, `ヶ年`, `ケ年`, `か年`
  + 月: `m`, `mo`, `mon`, `month`, `months`, `月`, `カ月`, `ヶ月`, `ケ月`, `か月`
  + 週: `w`, `week`, `weeks`, `週`, `週間`
  + 日: `d`, `days`, `day`, `日`
  + 時: `h`, `hour`, `hours`, `時間`
  + 分: `i`, `min`, `minute`, `minutes`, `分`
  + 秒: `s`, `sec`, `second`, `seconds`, `秒`

半角数字 + 単位を第二引数に設定します
複数の期間を指定することもできます


`{Date} Koyomi.add({Date|String} date, {String} value)`

```
Koyomi.add('2015-5-10', '3年'); // 2018-5-10
Koyomi.add('2015-5-10', '2週間6日'); // 2015-5-30
```

うるう年の2/29の日付からの年の加減算は、2/28に丸められます

```
Koyomi.add('2016-2-29', '1年'); // 2017-2-28
```

月末の日付からの月の加減算は、月末に丸められます

```
Koyomi.add('2016-3-31', '1ヶ月'); // 2017-4-30
```


# isLeap

うるう年判定

`{Boolean} Koyomi.isLeap({Number|Date|String} year/date)`

```
Koyomi.isLeap('2015-1-1'); // false
Koyomi.isLeap(2016); // true
```

# start

所属する単位の先頭の値を返します  
使用できる単位はaddの時と同じです  
このメソッドはクラスメソッドとインスタンスメソッドで動作が異なります  
年を指定した時は、クラスメソッドが年始の1月1日(CONFIG.START_MONTH依存)を返すのに対し、インスタンスメソッドは年度の初め(プロパティstartMonth)を返します  
週を指定した時は、クラスメソッドは月曜日(CONFIG.START_WEEK依存)を返すのに対し、インスタンスメソッドは週の初め(koyomi.startWeek)を返します

`{Date} Koyomi.start({Date|String} date, {String} grid)`

```
Koyomi.start('2015-4-20', '月'); // 2015-4-1 00:00:00
```

# end

所属する単位の最後の値を返します  
使用できる単位はaddの時と同じです  
このメソッドはクラスメソッドとインスタンスメソッドで動作が異なります  
年を指定した時は、クラスメソッドが年末の12月31日の23:59:59(CONFIG.START_MONTH依存)を返すのに対し、インスタンスメソッドは年度の終りの23:59:59(koyomi.startMonthに依存)を返します  
週を指定した時は、クラスメソッドは日曜日の23:59:59(CONFIG.START_WEEK依存)を返すのに対し、インスタンスメソッドは週の最後の23:59:59(koyomi.startWeek依存)を返します  

`{Date} Koyomi.end({Date|String} date, {String} grid)`

```
Koyomi.end('2015-4-20', '月'); // 2015-4-30 23:59:59.999
```

# diffDays

２つの日の差の日数を返します  
計算時２つの日の時の部分は切り捨てられます

`{Number} Koyomi.diffDays({Date|String} from, {String|Date} to)`

```
Koyomi.diffDays('2015-1-5', '2015-1-15') // 10
```


# diffMinutes

２つの時間の分数差を返します
秒は切り捨てられます

`{Number} Koyomi.diffMinutes({Date|String} from, {String|Date} to)`

```
Koyomi.diffMinutes('2015-1-5 12:10', '2015-1-5 12:35') // 20
```

# diffSeconds

２つの時間の秒数差を返します
ミリ秒は切り捨てられます

`{Number} Koyomi.diffSeconds({Date|String} from, {String|Date} to)`

```
Koyomi.diffSeconds('2015-1-5 12:12:10:', '2015-1-5 12:12:35') // 20
```

# yearDays

年の日数を返します  
年は始まりを1月1日とします(CONFIG.START_MONTHに依存)

`{Number} Koyomi.yearDays({Date|String} date)`

```
Koyomi.yearDays('2015-2-10') // 365
```

# monthDays

月の日数を返します

`{Number} Koyomi.monthDays({Date|String} date)`

```
Koyomi.monthDays('2015-2-10') // 28
```

# passYearDays

年の初めからの経過日数を返します  
指定日を含みます  
年は初めを1月1日とします(CONFIG.START_MONTHに依存)

`{Number} Koyomi.passYearDays({Date|String} date)`

```
Koyomi.passYearDays('2015-2-10') // 41
```

# passDays

月の初めからの経過日数を返します  
指定日を含みます

`{Number} Koyomi.passDays({Date|String} date)`

```
Koyomi.passDays('2015-2-10') // 10
```


# remainYearDays

年の終わりまでの残日数を返します  
指定日を含みます  
年は終わりを12月31日とします(CONFIG.START_MONTHに依存)

`{Number} Koyomi.remainYearDays({Date|String} date)`

```
Koyomi.remainYearDays('2015-2-10') // 322
```

# remainDays

月の終わりまでの残日数を返します  
指定日を含みます

`{Number} Koyomi.remainDays({Date|String} date)`

```
Koyomi.remainDays('2015-2-10') // 19
```


# ドキュメント一覧

  + [イントロダクション ../README.md](../README.md)
  + [インスタンスの作成 ./instance.md](./instance.md)
  + [フォーマット ./format.md](./format.md)
  + 日時の情報取得・操作 ./calc-date.md
  + [営業日計算 ./eigyobi.md](./eigyobi.md)
  + [カレンダー情報 ./calendar.md](./calendar.md)
  + [年度 ./nendo.md](./nendo.md)
  + [祝日 ./holiday.md](./holiday.md)
  + [営業・休業 ./open-close.md](./open-close.md)
  + [補助関数 ./helper.md](./helper.md)
