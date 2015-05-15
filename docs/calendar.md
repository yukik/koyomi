# カレンダーデータの取得

`{Array} koyomi.getCalendarData({String|Number} range, {String} startWeek, {Boolean} six);`

カレンダーデータを簡単に作成することのできるメソッドが用意されています  
一般的なカレンダーをDOMの動的作成する際に、通常次のような処理が必要です

  1. 曜日の始まりを決め、1日より前に幾つの空マスを用意しなければならないか計算
  2. 週の終わりを検査し、次の行にするための判定を行う
  3. 末日から週の終わりまで幾つの空マスで埋めるかを計算
  4. 複数月を処理する場合は、データを何度も取得し、上記を行う

これらを複雑な処理をViewコードで行う必要はありません  

## データ

次のようなデータを取得することができます

```
koyomi.getCalendarData('2015/1', 'sun', 'true')
[
  { som: true , eom: false, sow: true , eow: false, ghost: true , block: '2015/01', year: 2014, month: 12, day: 28, week: 0, opened: false, closed: '定休日', holiday: ''        , weekNumber: 1, events: []},
  { som: false, eom: false, sow: false, eow: false, ghost: true , block: '2015/01', year: 2014, month: 12, day: 29, week: 1, opened: false, closed: '休業日', holiday: ''        , weekNumber: 1, events: []},
  { som: false, eom: false, sow: false, eow: false, ghost: true , block: '2015/01', year: 2014, month: 12, day: 30, week: 2, opened: false, closed: '休業日', holiday: ''        , weekNumber: 1, events: []},
  { som: false, eom: false, sow: false, eow: false, ghost: true , block: '2015/01', year: 2014, month: 12, day: 31, week: 3, opened: false, closed: '休業日', holiday: ''        , weekNumber: 1, events: []},
  { som: false, eom: false, sow: false, eow: false, ghost: false, block: '2015/01', year: 2015, month: 1 , day: 1 , week: 4, opened: false, closed: '祝日'  , holiday: '元日'    , weekNumber: 1, events: []},
  { som: false, eom: false, sow: false, eow: false, ghost: false, block: '2015/01', year: 2015, month: 1 , day: 2 , week: 5, opened: false, closed: '休業日', holiday: ''        , weekNumber: 1, events: []},
  { som: false, eom: false, sow: false, eow: true , ghost: false, block: '2015/01', year: 2015, month: 1 , day: 3 , week: 6, opened: false, closed: '休業日', holiday: ''        , weekNumber: 1, events: []},
                (中略)
  { som: false, eom: false, sow: false, eow: false, ghost: false, block: '2015/01', year: 2015, month: 1 , day: 29, week: 4, opened: true , closed: ''      , holiday: ''        , weekNumber: 5, events: []},
  { som: false, eom: false, sow: false, eow: false, ghost: false, block: '2015/01', year: 2015, month: 1 , day: 30, week: 5, opened: true , closed: ''      , holiday: ''        , weekNumber: 5, events: []},
  { som: false, eom: false, sow: false, eow: true , ghost: false, block: '2015/01', year: 2015, month: 1 , day: 31, week: 6, opened: false, closed: '定休日', holiday: ''        , weekNumber: 5, events: []},
  { som: false, eom: false, sow: true , eow: false, ghost: true , block: '2015/01', year: 2015, month: 2 , day: 1 , week: 0, opened: false, closed: '定休日', holiday: ''        , weekNumber: 6, events: []},
  { som: false, eom: false, sow: false, eow: false, ghost: true , block: '2015/01', year: 2015, month: 2 , day: 2 , week: 1, opened: true , closed: ''      , holiday: ''        , weekNumber: 6, events: []},
  { som: false, eom: false, sow: false, eow: false, ghost: true , block: '2015/01', year: 2015, month: 2 , day: 3 , week: 2, opened: true , closed: ''      , holiday: ''        , weekNumber: 6, events: []},
  { som: false, eom: false, sow: false, eow: false, ghost: true , block: '2015/01', year: 2015, month: 2 , day: 4 , week: 3, opened: true , closed: ''      , holiday: ''        , weekNumber: 6, events: []},
  { som: false, eom: false, sow: false, eow: false, ghost: true , block: '2015/01', year: 2015, month: 2 , day: 5 , week: 4, opened: true , closed: ''      , holiday: ''        , weekNumber: 6, events: []},
  { som: false, eom: false, sow: false, eow: false, ghost: true , block: '2015/01', year: 2015, month: 2 , day: 6 , week: 5, opened: true , closed: ''      , holiday: ''        , weekNumber: 6, events: []},
  { som: false, eom: true , sow: false, eow: true , ghost: true , block: '2015/01', year: 2015, month: 2 , day: 7 , week: 6, opened: false, closed: '定休日', holiday: ''        , weekNumber: 6, events: []},
]);
```

最初の行のデータは4/26のもので、最後の行のデータは6/6のものです  
引数で指定した月以外の日データも含まれてますが、これで正常な動作です  
この指定した月以外の日をゴースト日と呼びます  
 (カレンダーでは通常、薄いグレーなど影を薄くするためゴースト日と命名しました。造語です。)  
このデータを利用すると先の1-4は次のように行います

  1. 最初の要素から表示する。その際、ghost=trueは前月の日付なので目立たないように表示する
  2. sow=trueは週の初めを、eow=trueは週の終わりを示すので、TRタグなどで行を示す
  3. 月末後もそのまま要素を表示する。その際ghost=trueは次月の日付なので目立たないように表示する
  4. 複数月の場合は、som=trueは新しい月の最初のデータ、eom=trueは月の最後のデータとして扱う

このように、カレンダーを作成するための情報が揃っています  
Viewコードではデザインだけに集中することができます

具体的なViewコードは、[example/calendar.html](../example/calendar.html)を確認してください  
非常にすっきりとしたViewコードであることが確認できます  
これであれば、もっと複雑な処理（カレンダーを値の入力に使用する・予定を表示させるなど）を追加することが容易になります

### 引数の説明

  + range 
      + 期間を指定します
      + 次の３つの指定の方法があります
          + 年を指定して1月から12月まで取得    2015, '2016'など
          + 月を指定 '2015/4', '2015/10'など
          + 期間を指定 '2015/4-2016/3'など
      + 指定しなかった場合は、プロパティの`startMonth`に設定された月から、本日が含まれる年度の期間になります
  + startWeek
      + 開始曜日を指定します 
      + 指定しなかった場合はインスタンスのプロパティ`startWeek`です
      + '月', '日'や'Mon', 'sunday' など大文字小文字問わず英語も指定できます
      + nullを設定しないかぎり、ゴースト日のデータが追加され、sow/eow/ghost/block/weekNumberのプロパティが追加されます
  + six
      + 6週分までゴースト日を追加します
      + 指定しなかった場合は、プロパティの`six`に設定された値です
      + trueにすることで、月によって行数が変わることなくデザイン上、表示スペースを固定することができます

### プロパティの説明

  + block
    + 月ブロックのキー 
    + どの月のデータとして取得したかを表します
    + 年月を次のような文字列で示します '2015/01'
  + som  (start of month)
    + 月のはじめ 
  + eom  (end of month)
    + 月の終わり 
  + sow (start of week)   
    + 週のはじめ 
  + eow  (end of week)
    + 週の終わり
  + ghost
    + ゴースト日はtrue
  + year
    + 年
    + この年は、取得した月の年を表すのではなく、この日オブジェクト自身の年です
    + どの月のデータとして取得したかは、blockプロパティで判定してください
  + month
    + 月
    + この年は、取得した月を表すのではなく、この日オブジェクト自身の年です
    + どの月のデータとして取得したかは、blockプロパティで判定してください
  + day
    + 日
  + week
    + 曜日 0:日->6:土
  + opened
    + 営業日ならtrue
  + closed
    + 休業理由 `'祝日'`,`'休業日'`,`'定休日'`のいずれかが入る
    + `'休業日'`は、年末年始・お盆の休日を設定した期間をさします
    + 判定の優先順位は、 `'祝日'`,`'休業日'`,`'定休日'`の順です
  + holiday
    + 祝日名、祝日ではない場合はnull
  + weekNumber
    + 週番号
    + この週番号はプロパティの`startMonth`と`startWeek`の影響はうけていません
    + メソッド`getCalendarData`で取得されたデータ内だけの週番号です
    + 年度の週番号を得たい場合は、順次処理のなかで`getWeekNumber`
  + events
    + イベント
    + `koyomi.addEvents`で追加されたイベントです

カレンダー作成時に`getCalendarDate`を利用することは大きな利点があります

  + Viewコードがすっきりする
  + 日曜始まりから月曜始まりの修正は、ほぼ一箇所だけで簡単に済むようになる
  + 祝日名、営業中などの情報が含まれている
  + 複数の月データを簡単に処理できる
  + [exapmle/calendar1-1.html](../example/calendar1-1.html)を参考にしてください


# 週番号の取得

年度を元に週番号を特定するためのメソッドが用意されています

`{Number} koyomi.getWeekNumber({Date|Number} date/year, {Number} month, {Number} day)`

引数を3つ渡した場合は、year,month,dayを指定したことになります  
クラスメソッドの`getWeekNumber`と異なり、開始月・開始週を指定することはできません


# イベント

カレンダーにイベントを追加・削除をするためのメソッドが用意されています

## 取得

`{Array} koyomi.getEvents({Date|String} date)`  
イベントは文字列の配列です

## 追加

`{Number} koyomi.addEvent({Date|String} date, {String} value)`

戻り値は設定されたイベントが登録されたインデックスです  
指定日にひとつもイベントが登録されていない状態で登録した場合は0が返されます

## 削除

`{Boolean} koyomi.removeEvent({Date|String} date, {Number} index)`

指定したindexのイベントを削除します  
indexを省略した場合は指定日のすべてのイベントが削除されます  
戻り値は削除が成功したかどうかです

