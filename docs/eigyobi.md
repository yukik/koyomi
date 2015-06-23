# 営業日計算

営業日の計算は複雑になりやすいですが、Koyomiでは標準で用意されています  
いずれのメソッドもインスタンスからのみ利用することができます  
また、一度計算した営業日はキャッシュされるため、長期間の営業日の計算を繰り返し行っても
処理時間がかかることはありません

## addEigyobi

日付に営業日を加算した日付の算出を行うことができます  

`{Date} koyomi.addEigyobi({Date|String} date, {Number} days, {Boolean} include)`

  + date
    + 基準となる日時です
    + 必須です
    + 日にちの部分のみ計算の対象になります
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

指定した期間の営業日数を返します

`{Number} koyomi.countEigyobi({Date|String} from, {Date|String} to)`


## nendoEigyobi

年度の営業日数を返します  
引数には年度が含まれる日付を指定します

`{Number} koyomi.nendoEigyobi({Date|String} date)`


## monthEigyobi

月の営業日数を返します  
引数にはその月に含まれる日付を指定します

`{Number} koyomi.monthEigyobi({Date|String} date)`


## passNendoEigyobi

年度開始から経過した営業日数を返します  
引数には年度が含まれる日付を指定します

`{Number} koyomi.passNendoEigyobi({Date|String} date)`


## passEigyobi

月初から経過した営業日数を返します  
引数にはその月に含まれる日付を指定します

`{Number} koyomi.passEigyobi({Date|String} date)`


## remainNendoEigyobi

年度末までの残りの営業日数を返します  
引数には年度が含まれる日付を指定します

`{Number} koyomi.remainNendoEigyobi({Date|String} date)`


## remainEigyobi

月末までの残りの営業日数を返します  
引数にはその月に含まれる日付を指定します

`{Number} koyomi.remainEigyobi({Date|String} date)`

# ドキュメント一覧

  + [イントロダクション ../README.md](../README.md)
  + [インスタンスの作成 ./instance.md](./instance.md)
  + [フォーマット ./format.md](./format.md)
  + [日時の情報取得・操作 ./calc-date.md](./calc-date.md)
  + 営業日計算 ./eigyobi.md
  + [カレンダー情報 ./calendar.md](./calendar.md)
  + [年度 ./nendo.md](./nendo.md)
  + [祝日 ./holiday.md](./holiday.md)
  + [営業・休業 ./open-close.md](./open-close.md)
  + [補助関数 ./helper.md](./helper.md)

