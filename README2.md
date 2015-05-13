# Koyomiクラス

Koyomiクラスには次のようなクラスメソッドが用意されています


## フォーマット

  + 日時をパラメータ文字列にそって整形します
  + 詳しい説明はフォーマットの項で説明します
  + `{String} Koyomi.format ({Date|String} date, {String} format)`
  + `format`を省略した場合は定数`DEFAULT_FORMAT`です

##  日時の加算

  + 加算(減算)することができる単位は、年、月、週、日、時、分、秒、ミリ秒です
  + `{Date} Koyomi.add({Date|String} date, {String} value)`
  + 追加する数と単位を`value`に設定します
    + 年
        + `'1y'`、`'1age'`、`'1year'`、`'1years'`、`'1年'`、`'1ヶ年'`、`'1か年'`、`'1カ年'`、`'1ケ年'`、`'1箇年'`、`'1個年`'。
        + いずれも1年追加されます。
        + うるう年の`'2/29'`からうるう年では無い年への加減は、`'2/28'`に設定されます
    + 月
        + `'1m'`、`'1mo'`、`'1mon'`、`'1month'`、`'1months'`、`'1月'`、`'1ヶ月'`、`'1か月'`、`'1カ月'`、`'1ケ月'`、`'1箇月'`、`'1個月'`。
        + いずれも1ヶ月追加されます。
        + 末日の日付に月を加減すると、日の部分が末日へ丸められることがあります
        + 例えば、`'2015/3/31'`に'`1ヶ月'`を追加すると結果は`'2015/4/30'`になります
        + 逆に`'2015/4/30'`に'`1ヶ月'`を追加しても`'2015/5/31'`にはならず、`'2015/5/30'`になります
    + 週
        + `'1w'`、`'1week'`、`'1weeks'`、`'1週'`、`'1週間'`。
        + いずれも1週間追加されます
    + 日
        + `'1日'`、`'1d'`、`'1day'`、`'1days'`。
        + いずれも1日追加されます
    + 時
        + `'1h'`、`'1hour'`、`'1hours'`、`'1時間'`。
        + いずれも1時間追加されます
    + 分
        +  `'1i'`、`'1min'`、`'1minute'`、`'1minutes'`、`'1分'`。
        + いずれも1分追加されます
    + 秒
        + `'1s'`、`'1sec'`、`'1second'`、`'1seconds'`、`'1秒'`。
        + いずれも1秒追加されます
    + ミリ秒
        + `'ms'`、`'millisecond'`、`'milliseconds'`、`'ミリ秒'`。
        + いずれも1ミリ秒追加されます
  + 複数同時に指定する場合は、続けて記述します。`'1年3か月-1日'`
  + その際に、記述した順に処理されます

## 月初の取得

  + 月末を取得する際に時以下の情報は切り捨てられます
  + `{Date} Koyomi.first ({Date|String} date)`

## 月末の取得

  + 月末を取得する際に時以下の情報は切り捨てられます
  + `{Date} Koyomi.last ({Date|String} date)`

## 二つの日の差の日数を取得

  + `{Number} Koyomi.days ({Date|String} from, {Date|String} to)`
  + 計算時２つの日の時以下は切り捨てて計算します

## 二つの時間の秒数差を取得

  + `{Number} Koyomi.seconds ({Date|String} from, {Date|String} to)`
  + ミリ秒は切り捨てられます
  + 文字列の場合は`'x時y分z秒'`などの時間だけの表記も受け付けます
  + その際、日の部分は本日になります

## 祝日名を取得

  + `{String} Koyomi.getHolidayName ({Date|String} date)`
  + 指定した日が祝日であれば、祝日名を返します
  + 祝日で無い場合は、`null`を返します

## 祝日一覧を取得

  + `{Object} Koyomi.getHolidays ({Number} year)`
  + キーに日にち、値に祝日名が設定されたオブジェクトを返します
  + `{'101': '元日', '111': '成人の日', '211': '建国記念日', （省略...）`

## 日時オブジェクトの作成

  + `{Date} Koyomi.toDate ({Date|String|Array} date, {Boolean} trim)`
  + 和暦の入力も限定的に受け付けます
    + 指定できるのは日付のみ
    + 数字は半角のみ
    + 平成,昭和,大正,明治,H,S,T,Mで始まり、年がそれに続く
    + 明治元年から5年は旧暦のため非対応(正しい結果ではありません)
    + 年、月、日の各数字の間に数字以外の文字が存在すること
    + この条件で入力を受け付ける例
        + `'昭和50年1月2日'`、`'S50-1-2'`、`'H1 10 10'`
  + また実は、配列での入力も受け付けますが、他のメソッドでは単に省略しています
  + 配列の場合は`[年, 月, 日, 時, 分, 秒, ミリ秒]`です
  + 月以降省略した場合は、その部で最初の数値が適用されます
  + 月や日の部では1が、時・分・秒・ミリ秒は0が既定値です
  + `clone`は、もし`date`がDateオブジェクトだった場合に複製を返します
  + 元のDateオブジェクトを安全に残しながら、日付の操作を行いたい場合にtrueにします
  + このメソッドは、他のメソッドの引数で`{Date|String} date`となっているものすべてで利用されます
  + そのため、他のメソッドでも和暦の入力や配列での入力を受け付けることができます
  + trimをtrueにすることで、時以下を切り捨てます。既定値 `null`
  + trimにfalseを設定した場合は、切り捨てはしませんが、必ず複製されたDateオブジェクトを返します
  + trimにnullまたは指定なしの場合は、Dateオブジェクトの場合にそのまま参照をかえします

## 週のインデックスを取得

  + `{String|Array} Koyomi.getWeekIndex({String|Array})`
  + 日曜を0、土曜を6とするインデックスを文字列から取得します
  + 受け付ける文字は、以下のとおり
  + `'日'`,`'月'`,`'火'`,`'水'`,`'木'`,`'金'`,`'土'`
  + `'Sun'`,`'Mon'`,`'Tue'`,`'Wed'`,`'Thu'`,`'Fri'`,`'Sat'`
  + `'Sunday'`,`'Monday'`,`'Tuesday'`,`'Wednesday'`,`'Thursday'`,`'Friday'`,`'Saturday'`
  + 英語は大文字小文字を区別しません
  + 配列を渡すと配列で返します
  + 変換例 `'火'` &#x226B; `2`、`'wed'` &#x226B; `3`、`['friday', 'saturday']` &#x226B; `[5, 6]`

## 文字列から日付の配列を作成

  + `{Array} Koyomi.getDateArray ({String} value)`
  + 複数の範囲を指定する際はカンマで区切ります
  + `'12/29-1/3, 8/16-8/18, 10/10'` &#x226B; `[1229, 1230, 1231, 101, 102, 103, 816, 817, 818, 1010] `

## 第x week曜日の日を取得

  + `{Number} Koyomi.getXDay({Number} year, {Number} month, {Number} x, {String} week)`
  + 2015年5月の第2月曜日を取得する場合は`Koyomi.getXDay(2015, 5, 2, '月')`とします
  + `x`を`5`以上にした場合は、最終週を対象にします

## 年号オブジェクトを取得

  + `{Object} Koyomi.getNengo({Date|String} date, {Boolean} daily)`
  + `daily`を`true`にすると、日付区切りの期間で年号を判定します
  + 既定値はfalseで判定は年区切りの期間です
  + 年号オブジェクトは次のような形式です
  + `{N: '昭和', n: 'S', y: 1926, d: new Date('1926-12-25 00:00:00.000')}`
  + `N`は年号、`n`は省略記号、`y`は元年の年、`d`は正確な開始日

## 漢数字変換

  + 0から9999までの数字を漢数字に変換します
  + `{String} Koyomi.kan({Number} num, {Boolean} shrt)`
  + `shrt`が`true`と`false`の違いによって出力される例は次のとおり
  + 入力、`0`、`3`、`10`、`15`、`20`、`24`、`63`、`1998`、`2000`、`2015`
  + `false`、`〇`、`三`、`十`、`十五`、`二十`、`二十四`、`六十三`、`千九百九十八`、`二千`、`二千十五`
  + `true`、`〇`、`三`、`一〇`、`一五`、`二〇`、`二四`、`六三`、`一九九八`、`二〇〇〇`、`二〇一五`
  + 既定値は`false`です
  + 0未満、10000以上の数字は空文字を返します


# インスタンスの作成

インスタンスを作成することで、さらに多くの機能を使用することができます  

作成方法

```
var koyomi = new Koyomi();
```

インスタンスには次のプロパティと既定値が設定されています

## プロパティ

### フォーマット

フォーマットの既定値は`'Y-m-d H:i:s'`です  
この値を変更した場合は、`format`メソッドで第二引数を指定しなかった場合に既定値が使用されます

設定方法

```
koyomi.defaultFormat = 'Y年n月j日 G時i2分s2秒';
```

文字のエスケープはphpのdate関数と異なり、`{}`を使用します  
一箇所でも`{}`が含まれているとエスケープが有効になります  
`{}`で囲った部分をパラメータ文字列と認識し
その他の文字はすべてそのまま表示されるようになります

```
koyomi.defaultFromat = '{Y}/{m}/{d} updated';
```

### 定休日

定休日の既定値は`'土,日'`です  
曜日を指定するときには、日から土をカンマ区切りで指定します  
`'sun'`や`'Sunday'`なども設定することができます  
固定の日を指定する場合は、`'5,15,25'`のように数字をカンマ区切りでしています  
第xy曜日などの指定は`'2水,3水'`と、何週目のあとに曜日を指定します  
これらは、混合させることもできます  
上記では対応できない場合は、関数を指定することで細かな定休日を指定することができます  
引数はDateオブジェクトのみで、定休日の場合はtrueを返すようにします

設定方法

```
koyomi.regularHoliday = '日,2土,3土,30';
```

### 年末年始、お盆の休業日

定休日とは別に、年末年始・お盆の休業日を設定することができます  
既定値は、`'12/29-1/3'`です  
お盆の期間も指定する場合は、カンマ区切りで、`'12/29-1/3, 8/16-8/18'`のように指定します  
単発の日付を指定する場合は、`'12/29-1/3, 10/10'`などとします  
上記では対応できない場合は、関数を指定することで細かな休業日を指定することができます  
引数はDateオブジェクトのみで、休業日の場合はtrueを返すようにします

設定方法

```
koyomi.seasonHoliday = '12/29-1/3, 8/16-8/18';
```

### 祝日の営業

祝日を営業日にするかどうかを設定することができます  
既定値は`false`(祝日は休業日)です

設定方法

```
koyomi.holidayOpened = true; // 営業日にする
```

### 年の始まり

一年の始まりを設定することができます  
既定値は`1`です  
パラメータ文字列の`Wn`や`getCalendarData`などで使用します  
通常は、1月からですが、年度にあわせ4月に設定する場合は次のようにします  

設定方法

```
koyomi.startMonth = 4;
```

### 週の始まり

週の始まりを設定することができます  
既定値は`'月'`です  
パラメータ文字列の`Wn`や`getCalendarData`などで使用します  
日曜日へ変更する場合は、次のようにします

設定方法

```
koyomi.startWeek = '日';
```

## メソッド



## 営業日の加算

日付に営業日を加算した日付の算出を行うことができます  
`koyomi.format`の営業日を指定した場合と動作は同じですが、整形を行いません

`{Date} koyomi.addEigyobi({Date|String} date, {Number} days, {Boolean} include)`

  + date
    + 基準となる日時です
    + 必須です
    + 日にちの部分は変更されます
    + 時間部分の値は変化しません
  + days
    + カウントする営業日数
    + 必須です
    + 1以上の場合は、翌営業日からカウントして算出します
    + 0の場合は、dataが営業日であればdateを、そうでない場合は翌営業日を返します
    + -1以下の場合は、さかのぼって算出します
  + include
    + trueの場合、dateもカウントの対象に含みます
    + 既定値はfalseです
    + daysが0の場合はincludeは無視されます

基準となる日時より１年先（前）以内に営業日が存在しなかった場合はnullが返されます

## 営業日から逆算

日付の営業日を加算する前の日付の算出を行うことができます  
候補はいくつか出てきますが、一番近い日付を返します

`{Date} koyomi.toEigyobi({Date|String} date, {Number} days, {Boolean} include)`

例えば次のような場面で使用します。  
3営業日で納品しなければならない。本日は、いつまでの日までの分の受注を納品作業しなければならないか？


## 営業日数の算出

営業日数を数えることができる関数が定義されています  

`{Number} koyomi.countEigyobi({Date|String} from, {Date|String} to)`

  + from
    + 開始日
    + 必須です
  + to
    + 終了日
    + 必須です

## 個別に営業日を設定

定休日や祝日より優先して、営業日に設定することができます

`{Boolean} koyomi.open({Date|String} date)`

## 個別に休業日を設定

定休日や祝日より優先して、休業日に設定することができます

`{Boolean} koyomi.close({Date|String} date)`

## 個別に設定した営業日・休業日を暦どおりに設定

`koyomi.open`、`koyomi.open`の設定をキャンセルし、暦どおりに設定します

`{Boolean} koyomi. reset({Date|String} date)`


## 週番号の取得

週番号を取得することができます  
クラスメソッドの`Koyomi.getWeekNumber`とほぼ同じ機能ですが、  
始まりの月と週の始まりの曜日を指定することはできません  
自動的にプロパティから取得します  
その代わり、次の二つの形式で実行することができます

`{Number} koyomi.getWeekNumber({Date|String} Date)`  
`{Number} koyomi.getWeekNumber({Number} year, {Number} month, {Number} day)`

  + 後者でのmonthは1月なら1と入力します(0ではありません)
  + 次のカレンダーデータの順次処理中に、年度の週番号が必要になった際に便利です

## 年度の期間の取得

年度の開始と終了の日時を取得することができます  

`{Object} koyomi.getNendo({Date|String} date)`

  + プロパティ`startMonth`の値に影響します
  + `date`が含まれる期間の年度を検出します
  + 省略した場合は、本日を対象にします
  + 戻り値のオブジェクトは次の形式
  + `{from: Dateオブジェクト, to: Dateオブジェクト}`

## 年度をフォーマット
  
年度を表す文字列を返します

`{String} koyomi.formatNendo({Date|String} Date, {String} fromFormat, {String} toFormat, {Boolean} reverse)`

  + `date`が含まれる期間の年度を対象とします
  + 省略した場合は、本年度を対象にします
  + `fromFormat`と`toFormat`で整形された文字を結合して返します
  + `reverse`を`true`にした場合は結合の順を逆にします
  + `fromFormat`の規定値は`'Y/n'`、`toFormat`の規定値は`'-Y/n'`です
  + ただし、`fromFormat`が設定された場合は`toFormat`の規定値は`null`です
  + 4月初めの年度では、`koyomi.formatNendo('2015-3-5')`は`'2014/4-2015/3'`と返されます


## イベントの追加

日に対してイベントを追加することができます  
この情報は`koyomi.getEvent`のほかに、カレンダーデータでも取得できます

`{Number} koyomi.addEvent({Date|String} date, {String} value)`

  + 戻り値に追加したイベントのインデックスを返します


## イベントの削除

追加されたイベントを削除することができます

`{Boolean} koyomi.removeEvent({Date|String} date, {Number} index)`

  + indexを省略した場合は、すべてのイベントを削除します
  + 戻り値は削除が成功したかどうかです

## イベントの取得

日に対して設定されているイベントを取得します

`{Array} koyomi.getEvents({Date|String} date)`


    


## カレンダーデータの取得

カレンダーデータを簡単に作成することのできるメソッドが用意されています  

`{Array} koyomi.getCalendarData({String|Number} range, {String} startWeek, {Boolean} six);`

一般的なカレンダーをDOMの動的作成する際に、通常次のような処理が必要です

  1. 曜日の始まりを決め、1日より前に幾つの空マスを用意しなければならないか計算
  2. 週の終わりを検査し、次の行にするための判定を行う
  3. 末日から週の終わりまで幾つの空マスで埋めるかを計算
  4. 複数月を処理する場合は、データを何度も取得し、上記を行う

これらを複雑な処理をViewコードで行う必要はありません  

### データ

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
  2. eow=trueは週の終わりなので、次行へ
  3. 末日後もそのまま要素を表示する。その際ghost=trueは前月の日付なので目立たないように表示する
  4. 複数月の場合は、som=trueは新しい月の最初のデータ、eom=trueは月の最後のデータとして扱う

このように、カレンダーを作成するための情報が揃っています  
Viewコードではデザインだけに集中することができます

具体的なViewコードは、[example/calendar.html](https://github.com/yukik/koyomi/blob/master/example/calendar.html)を確認してください  
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
      + 規定値はインスタンスのプロパティ`startWeek`です
      + '月', '日'や'Mon', 'sunday' など大文字小文字問わず英語も指定できます
      + nullを設定しないかぎり、ゴースト日のデータが追加され、sow/eow/ghost/block/weekNumberのプロパティが追加されます
  + six
      + 6週分までゴースト日を追加します
      + 既定値は false
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
  + [exapmle/calendar1-1.html](./example/calendar1-1.html)を参考にしてください


