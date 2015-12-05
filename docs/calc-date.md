# 日付の計算

# add

加算(減算)することができる単位は、年、ケ月、週、日、時間、分、秒です  
各単位で使用できる記述は次のとおりです

  + 年。`y`、`year`、`years`、`年`、`年度`、`カ年`、`ヶ年`、`ケ年`、`か年`。
  + 月。`m`、`mo`、`mon`、`month`、`months`、`月`、`カ月`、`ヶ月`、`ケ月`、`か月`。
  + 週: `w`, `week`, `weeks`, `週`, `週間`
  + 日: `d`, `day`, `days`, `日`
  + 時: `h`, `hour`, `hours`, `時`、`時間`
  + 分: `i`, `min`, `minute`, `minutes`, `分`
  + 秒: `s`, `sec`, `second`, `seconds`, `秒`

半角数字 + 単位を第二引数に設定します
複数の期間を指定することもできます

`{Date} koyomi.add({DATE} date, {String} value)`

```
koyomi.add('2015-5-10', '3年'); // 2018-5-10
koyomi.add('2015-5-10', '2週間6日'); // 2015-5-30
```

年・月・週のみ指定して、日以下を指定しない場合、次のルールを適用します  

民法第143条 暦による期間の計算  
週、月又は年の初めから期間を起算しないときは、その期間は、最後の週、月又は年において  
その起算日に応当する日の前日に満了する。ただし、月又は年によって期間を定めた場合にお  
いて、最後の月に応当する日がないときは、その月の末日に満了する。  

これにより、うるう年の2/29の日付からの年の加減算は、2/28に丸められます

```
koyomi.add('2016-2-29', '1年'); // 2017-2-28
```

月末あたりの日付からの月の加減算は、月末に丸められます

```
koyomi.add('2016-3-31', '1ヶ月'); // 2017-4-30
```

`date.setMonth(x)`や`date.setYear(x)`とは処理が異なるため注意してください

個別の期間の数字の前に`-`をつける事で減算する事もできます
全部の数字を減算の対象にするには、最後に`前`とつけます
数字は全角・漢数字にも対応します

```
koyomi.add('2015-1-1', '-1年-3ヶ月');   // 2013-10-1
koyomi.add('2015-1-1', '一年三ヶ月前'); // 2013-10-1
```

# isLeap

うるう年判定

`{Boolean} koyomi.isLeap({Number} year)`  
`{Boolean} koyomi.isLeap({DATE} date)`

```
koyomi.isLeap('2015-1-1'); // false
koyomi.isLeap(2016); // true
```


# getRange

指定した単位の範囲で最初と最後の日時を返します  
第一引数が文字列の場合に第二引数を省略することができます  
その場合は`2015`、`2015年`、`2015-10`、`2015年10月`の形式で年月を指定します  
年のみを指定した場合はtermの既定値は'y'、年月を指定した場合の既定値は'm'です  
そのほかの形式の場合のtermの既定値は'd'です

`{Object} koyomi.getRange({DATE/String|Number} date/yyyymm, {String} term)`

```
koyomi.getRange('2015-11-8', 'month');
// { from: D2015-11-1 00:00:00.000, to: D2015-11-30 23:59:59.999 }
```

# from

所属する単位の先頭の値を返します  
使用できる単位はaddの時と同じです  

プロパティに依存する単位が存在します  
年を指定した時は、年度の初め(koyomi.startMonthに依存)を返します  
週を指定した時は、週の初め(koyomi.startWeekに依存)を返します

`{Date} koyomi.from({DATE} date, {String} term)`

```
koyomi.from('2015-4-20', '月'); // 2015-4-1 00:00:00
```

# to

所属する単位の最後の値を返します  
使用できる単位はaddの時と同じです  

プロパティに依存する単位が存在します  
年を指定した時は、年度の終りの23:59:59(koyomi.startMonthに依存)を返します  
週を指定した時は、週の最後の23:59:59(koyomi.startWeek依存)を返します  

`{Date} koyomi.to({Date} date, {String} term)`

```
koyomi.to('2015-4-20', '月'); // 2015-4-30 23:59:59.999
```

# diff

二つの日時の指定した単位での差を返します
年・月・週・日は時以降を切り捨てて計算します

ひと年は、同じ日にちを超えるごとに一ヶ年とします  
そのため、単純に365日経過したら一ヶ年ではありません  

ひと月は、日の部分が超えるごとに一ヶ月とします  
そのため、単純に30や31日経過したら一ヶ月ではありません  


`{Number} koyomi.diff({DATE} from, {DATE} to, {String} term)`

```
koyomi.diff('2015-1-5', '2015-1-15', '日') // 10
```


# days

指定した期間の日数を返します

第二引数に指定した値で３つの動作を切り替えます

  * 指定しなかった場合
      * 第一引数に、`2015年`や`2015-3`などの年度もしくは年度+月の文字列を指定します
      * その期間の日数を返します
      * 年だけを指定すると年度の期間を計算します
          * 年を指定する場合は二つの引数をきちんと指定してください
  * 日時を指定した場合
      * 二つの日付の間の日数を返します
      * diffでterm=day指定した場合との違いは、こちらは常に値が1大きくなります
  * 期間('year', 'month'等)を指定した場合
      * 第一引数が含まれる期間の開始日から終了日の日数を返します


`{Number} koyomi.days({String} yyyymm)`  
もしくは  
`{Number} koyomi.days({DATE} date, {String} term)`  
もしくは  
`{Number} koyomi.days({DATE} from, {DATE} to)`


一年の始まりはstartMonthに依存します

```
koyomi.days('2015-2') // 28
koyomi.days('2015-2-10', '2015-2-20') // 11
koyomi.days('2015-2-10', 'year') // 365
```

# passDays

指定した期間の経過日数を返します
（指定日を含みます）
@method passDays
@param  {DATE}   date
@param  {String} term
@return {Number} days

`{Number} koyomi.passDays({DATE} date, {String} term)`

```
koyomi.passDays('2015-2-10', '月') // 10
```


# remainDays

指定した期間の残日数を返します
（指定日を含みます）

`{Number} koyomi.remainDays({DATE} date, {String} term)`

```
koyomi.startMonth = 1;
koyomi.remainDays('2015-2-10', 'year') // 322
```

# getAge

年齢を取得します

`{Number} koyomi.getAge({DATE} birthday, {DATE} when)`

whenを省略した場合は、本日です

```
koyomi.getAge('1974-2-18', '2015-9-4'); // 41
```

# kind

口語表現を取得します

`{String} koyomi.kind({DATE} date, {DATE} compareTo)`

compareToを省略した場合は、現在日時です

```
koyomi.kind('2015-9-1', '2015-9-10'); // 9日前
koyomi.kind('2:00', '1:55'); // 5分後
```

# ドキュメント一覧

  + [イントロダクション ../README.md](../README.md)
  + [設定値 ./docs/config.md](./docs/config.md)
  + [フォーマット ./docs/format.md](./docs/format.md)
  + 日時の情報取得・操作 ./docs/calc-date.md
  + [営業日計算 ./docs/calc-biz.md](./docs/calc-biz.md)
  + [カレンダー情報 ./docs/calendar.md](./docs/calendar.md)
  + [祝日 ./docs/holiday.md](./docs/holiday.md)
  + [営業・休業 ./docs/open-close.md](./docs/open-close.md)
  + [補助関数 ./docs/helper.md](./docs/helper.md)