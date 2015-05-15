# 祝日

## getHolidays

祝日一覧を取得

`{Object} Koyomi.getHolidays ({Number} year)`

  + キーに日にち、値に祝日名が設定されたオブジェクトを返します
  + `{'101': '元日', '111': '成人の日', '211': '建国記念日', （省略...）`


## getHolidayName

祝日名を取得

`{String} Koyomi.getHolidayName ({Date|String} date)`

  + 指定した日が祝日であれば、祝日名を返します
  + 祝日で無い場合は、`null`を返します

