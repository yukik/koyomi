# 祝日

koyomiでは日本の祝日を取得することができます  
祝日は、定義ファイルから自動的に行われる為、新しい祝日が設定されたり廃止されたりすることがない限り  
永久的に計算することができるようになっています  
そのため、毎年定義ファイルを更新する必要はありません  
ただし、祝日法が改正された場合は、`lib/config.js`を変更する必要があります。

(注意)  
[春分の日](http://ja.wikipedia.org/wiki/%E6%98%A5%E5%88%86%E3%81%AE%E6%97%A5)および[秋分の日](http://ja.wikipedia.org/wiki/%E7%A7%8B%E5%88%86%E3%81%AE%E6%97%A5)はWikipediaの簡易的な計算を元に算出しています  
そのため、実際には確定した日付を保証するものではありません

## getHolidays

祝日一覧を取得します

`{Object} koyomi.getHolidays ({Number} year)`

  + キーに日にち、値に祝日名が設定されたオブジェクトを返します
  + `{'101': '元日', '111': '成人の日', '211': '建国記念日', （省略...）`
  + 一覧の中には振替休日および国民の休日も含みます

## getHolidayName

祝日名を取得します

`{String} koyomi.getHolidayName ({DATE} date)`

  + 指定した日が祝日であれば、祝日名を返します
  + 祝日で無い場合は、`null`を返します
  + 振替休日および国民の休日も対象に含みます

# ドキュメント一覧

  + [イントロダクション ../README.md](../README.md)
  + [設定値 ./docs/config.md](./docs/config.md)
  + [フォーマット ./docs/format.md](./docs/format.md)
  + [日時の情報取得・操作 ./docs/calc-date.md](./docs/calc-date.md)
  + [営業日計算 ./docs/calc-biz.md](./docs/calc-biz.md)
  + [カレンダー情報 ./docs/calendar.md](./docs/calendar.md)
  + 祝日 ./docs/holiday.md
  + [営業・休業 ./docs/open-close.md](./docs/open-close.md)
  + [補助関数 ./docs/helper.md](./docs/helper.md)