# 補助関数

## toDate

Dateオブジェクトを作成します。  

`{Date} Koyomi.toDate({Date|String|Array|Number|Object} date, {Boolean} trim)`

dateは次の5つの方法で指定できます  
省略した場合は、nullが返されます

  + Dateオブジェクト
  + 文字列
      + 和暦、漢数字、全角数字、時刻に対応しています
      + 時刻を指定した場合は日付の部分は本日です
        + 時刻の指定は数字以外の最初に現れる文字が以下である必要があります
        + `'am'`,`'pm'`,`'AM'`,`'PM'`,`'午前'`,`'午後'`,`':'`,`'：'`,`'時'`
  + 配列
      + [年, 月, 日, 時, 分, 秒, ミリ秒]
      + 月以降省略した場合は、その部で最初の数値が適用されます
      + 月の部を1月にする場合は1を指定します(0ではありません)
  + 数字
      + Y>4MMDDHHmmssの形式とみなす
      + MM以下は省略することができます
        + 省略した場合はそれぞれ1月1日0時0分0秒です
      + 西暦1000年未満の日時は数字では指定できません
  + オブジェクト
      + year, month, day, hours, minutes, seconds等のプロパティを持つ必要があります
      + そのほかに使用できるプロパティの一覧は次のとおりです
          + 年。`'y'`、`'year'`、`'years'`、`'年'`、`'ヶ年'`、`'か年'`、`'カ年'`、`'ケ年'`。
          + 月。`'m'`、`'mo'`、`'mon'`、`'month'`、`'months'`、`'月'`、`'ヶ月'`、`'か月'`、`'カ月'`、`'ケ月'`。
          + 日。`'日'`、`'d'`、`'day'`、`'days'`。
          + 時。`'h'`、`'hour'`、`'hours'`、`'時間'`。
          + 分。`'i'`、`'min'`、`'minute'`、`'minutes'`、`'分'`。
          + 秒。`'s'`、`'sec'`、`'second'`、`'seconds'`、`'秒'`。
      + 年月日を同時に省略すると本日の日付に、個別の省略は、年・月・日がそれぞれ今年・1月・1日です
      + 時分秒を省略すると0時・0分・0秒が設定されます

trimは時以下の切り捨てを指定します

  + trimをtrueにすることで、時以下を切り捨てます。既定値 `null`
  + trimにfalseを設定した場合は、切り捨てはしませんが、必ず複製されたDateオブジェクトを返します
      + Dateオブジェクトの場合に通常そのまま参照をかえします

他のメソッドとの関係

  + このメソッドは、他のメソッドの引数で`{Date|String} date`となっているものすべてで利用されています
  + そのため、他のメソッドでも和暦の入力や配列での入力を受け付けることができます
  + この事によってメソッドによっては便利な場合があります
      + 年の総日数を受け付ける`Koyomi.yearDays`の引数は日付ですが、数字の`2015`などを渡しても正常に動作します


## getDateArray

文字列を日付の配列に変更します

`{Array} Koyomi.getDateArray({String} value)`

`'12/29-1/3, 8/16-8/18, 10/10' -> [1229, 1230, 1231, 101, 102, 103, 816, 817, 818, 1010] `  
範囲指定は日付同士をハイフンでつなぎます
 
## getNengo

年号オブジェクトを取得します

`{Object} Koyomi.getNengo({Date|String} date, {Boolean} daily)`

  + `daily`を`true`にすると、日付区切りの期間で年号を判定します
  + 既定値はfalseで判定は年区切りの期間です
  + 年号オブジェクトは次のような形式です
  + `{N: '昭和', n: 'S', y: 1926, d: new Date('1926-12-25 00:00:00.000')}`
  + `N`は年号、`n`は省略記号、`y`は元年の年、`d`は開始日

## getWeekIndex

日曜を0、土曜を6とするインデックスを文字列から取得します

`{String|Array} Koyomi.getWeekIndex({String|Array} value)`

  + 受け付ける文字は、以下のとおり
      + `'日'`,`'月'`,`'火'`,`'水'`,`'木'`,`'金'`,`'土'`
      + `'Sun'`,`'Mon'`,`'Tue'`,`'Wed'`,`'Thu'`,`'Fri'`,`'Sat'`
      + `'Sunday'`,`'Monday'`,`'Tuesday'`,`'Wednesday'`,`'Thursday'`,`'Friday'`,`'Saturday'`
  + 英語は大文字小文字を区別しません
  + 配列を渡すと配列で返します
  + 変換例 `'火'` &#x226B; `2`、`'wed'` &#x226B; `3`、`['friday', 'saturday']` &#x226B; `[5, 6]`

## getWeekNumber

週番号を取得します

`{Number} Koyomi.getWeekNumber({Date|String} date, {String} startWeek, {Number} startMonth)`

weekを省略した場合は、`月`曜日です。(CONFIG.START_WEEKの値)  
monthを省略した場合は、1です。(CONFIG.START_MONTHの値)


## getISOWeekNumber

ISO週番号を取得します  

`{Number} Koyomi.getISOWeekNumber({Date|String} date)`

月は1月始まりで、週は月曜始まりです  
さらに、年初・年末は週に締める日数が少ない(三日以内)の時に、前年・翌年の週番号となります


## getXDay

第２月曜日などの日にちを返す  
返すのは日を表す数字で、Dateオブジェクトではありません

`{Number} Koyomi.getXDay({Number} year, {Number} month, {Number} x, {String} week)`

year年month月の第x week曜日を返します  
xに5以上を指定した場合は最終の指定曜日の日とします


# ドキュメント一覧

  + [イントロダクション ../README.md](../README.md)
  + [インスタンスの作成 ./instance.md](./instance.md)
  + [フォーマット ./format.md](./format.md)
  + [日時の情報取得・操作 ./calc-date.md](./calc-date.md)  
  + [営業日計算 ./eigyobi.md](./eigyobi.md)
  + [カレンダー情報 ./calendar.md](./calendar.md)
  + [年度 ./nendo.md](./nendo.md)
  + [祝日 ./holiday.md](./holiday.md)
  + [営業・休業 ./open-close.md](./open-close.md)
  + 補助関数 ./helper.md

