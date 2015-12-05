# 営業・休業

営業および休業を個別に日に設定したり、判別することができます  
休業には大きく4種類に分けられます

  + 定休日
  + 季節的な休業期間
  + 祝日による休業日
  + 個別に設定された休業日

それ以外の場合はすべて営業日になります  
また、個別に営業日も設定でき、その設定は休業設定よりも優先されます 

## open

休業日より優先して、営業日に設定することができます  
この設定時に、closeによる休業日の設定は解除されます

`{Boolean} koyomi.open({DATE} date)`


## close

休業日に設定することができます  
この設定時に、openによる営業日の設定は解除されます

`{Boolean} koyomi.close({DATE} date)`


## reset

`koyomi.open`、`koyomi.open`の設定をキャンセルし、暦どおりに設定します

`{Boolean} koyomi.reset({DATE} date)`



## isOpen

営業日かどうかの判定を行います

`{Boolean} koyomi.isOpen({DATE} date)`


## isSetOpen

openによって強制的に営業日に設定されているかどうかを判定します

`{Boolean} koyomi.isSetOpen({DATE} date)`


## isSetClose

closeによって強制的に休業日に設定されているかどうかを判定します

`{Boolean} koyomi.isSetClose({DATE} date)`


## isRegularHoliday

定休日かどうかの判定します

`{Boolean} koyomi.isRegularHoliday({DATE} date)`


## isSeasonHoliday

季節による休業日かどうかの判定します

`{Boolean} koyomi.isSeasonHoliday({DATE} date)`


## isHolidayClose

祝日による休業日かどうかの判定します

`{Boolean} koyomi.isHolidayClose({DATE} date)`

## closeCause

休業の事由を返します  
次の優先順位で判別し、以下の文字列を返します

  * openで営業日に設定
      * 空文字を返します
  * closeで休業日に設定
      * addEventで追加された最初のイベントを返します
      * 存在しない場合は'臨時休業'と返します
  * 年末年始・お盆休み
      * 設定時の事由もしくは'休業期間'と返します
  * 定休日
      * '定休日'と返します
  * 祝日休み判定
      * 祝日名を返します
  * 上記のいずれでもない場合
      * 空文字を返します

`{String} koyomi.closeCause({DATE} date)`


# ドキュメント一覧

  + [イントロダクション ../README.md](../README.md)
  + [設定値 ./config.md](./config.md)
  + [フォーマット ./format.md](./format.md)
  + [日時の情報取得・操作 ./calc-date.md](./calc-date.md)
  + [営業日計算 ./calc-biz.md](./calc-biz.md)
  + [カレンダー情報 ./calendar.md](./calendar.md)
  + [祝日 ./holiday.md](./holiday.md)
  + 営業・休業 ./open-close.md
  + [補助関数 ./helper.md](./helper.md)
