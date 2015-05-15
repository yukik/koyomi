# 営業・休業

営業および休業を個別に日に設定したり、判別することができます  
休業には大きく4種類に分けられます

  + 定休日
  + 季節的な休業日
  + 祝日による休業日
  + 個別に設定された休業日

それ以外の場合はすべて営業日になります  
また、個別に営業日も設定でき、その設定は休業設定よりも優先されます


## open

休業日より優先して、営業日に設定することができます
この設定時に、closeによる休業日設定は解除されます

`{Boolean} koyomi.open({Date|String} date)`


## close

休業日に設定することができます  
この設定時に、openによる営業日設定は解除されます

`{Boolean} koyomi.close({Date|String} date)`


## reset

`koyomi.open`、`koyomi.open`の設定をキャンセルし、暦どおりに設定します

`{Boolean} koyomi.reset({Date|String} date)`



## isOpened

営業日の判定を行います

`{Boolean} koyomi.isOpened({Date|String} date)`

## forcedOpenClose

openやcloseによって強制的に営業・休業が設定されているかどうか

`{Boolean} koyomi.forcedOpenClose({Date|String} date)`

戻り値によりどちらに設定されているかを判定します

  + 設定されていない &#x226B; null
  + 営業日に設定されている &#x226B; true
  + 休業日に設定されている &#x226B; false


## isRegularHoliday

定休日判定


## isSeasonHoliday

季節による休業日判定


## isHolidayClosed

祝日による休業日判定



