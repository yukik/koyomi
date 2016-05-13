# 営業日計算

koyomiでは簡単に営業日の計算が計算できます

## addBiz

日付に営業日を加算した日付の算出を行うことができます  

`{Date} koyomi.addBiz({DATE} date, {Number} days, {Boolean} include)`

  + date
    + 基準となる日時です
    + 必須です
    + 日にちの部分のみ計算の対象になります
    + 時間部分の値は切り捨てられます
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


## biz

営業日数を返します  
第二引数に指定した値で３つの動作を切り替えます  

  * 指定しなかった場合
      * 第一引数に、`2015年`や`2015-3`などの年度もしくは年度+月の文字列を指定します
      * その期間の営業日数を返します
  * 日時を指定した場合
      * 二つの日付の間の営業日数を返します
  * 期間(`年`,`月`,`日`,`year`,`month`,`week`など)を指定した場合
      * 第一引数が含まれる期間の開始日から終了日の営業日数を返す

`{Number} koyomi.biz({String} yyyymm)`  
または  
`{Number} koyomi.biz({DATE} from, {DATE} to)`  
または  
`{Number} koyomi.biz({DATE} date, {String} term)`

```
koyomi.biz('2015-1');                // 19
koyomi.biz('2015-1-1', '2015-1-31'); // 19
koyomi.biz('2015-1-1', '月');        // 19
```

## passBiz

指定した日が含まれる期間の経過した営業日数を返します  

`{Number} koyomi.passBiz ({DATE} date, {String} term)`


## remainBiz

指定した日が含まれる期間の残りの営業日数を返します  

`{Number} koyomi.remainBiz({DATE} date, {String} term)`


# ドキュメント一覧

  + [イントロダクション ../README.md](../README.md)
  + [設定値 ./config.md](./config.md)
  + [フォーマット ./format.md](./format.md)
  + [日時の情報取得・操作 ./calc-date.md](./calc-date.md)
  + 営業日計算 ./calc-biz.md
  + [カレンダー情報 ./calendar.md](./calendar.md)
  + [祝日 ./holiday.md](./holiday.md)
  + [営業・休業 ./open-close.md](./open-close.md)
  + [補助関数 ./helper.md](./helper.md)