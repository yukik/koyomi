# 営業日計算


## addEigyobi

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


## toEigyobi

日付の営業日を加算する前の日付の算出を行うことができます  
候補はいくつか出てきますが、一番近い日付を返します

`{Date} koyomi.toEigyobi({Date|String} date, {Number} days, {Boolean} include)`

例えば次のような場面で使用します。  
3営業日で納品しなければならない。本日は、いつまでの日までの分の受注を納品作業しなければならないか？


## countEigyobi

営業日数を数えることができる関数が定義されています  

`{Number} koyomi.countEigyobi({Date|String} from, {Date|String} to)`

  + from
    + 開始日
    + 必須です
  + to
    + 終了日
    + 必須です


## passEigyobi

月初から経過した営業日数


## passNendoEigyobi

年度開始から経過した営業日数


## remainEigyobi

月末までの残りの営業日数


## remainNendoEigyobi

年度末までの残りの営業日数


## monthEigyobi

月の営業日数


## nendoEigyobi

年度の営業日数
