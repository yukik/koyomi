# 祝日

Koyomiでは日本の祝日を取得することができます  
祝日はクラスメソッドとインスタンスメソッドどちらにも定義されており、同じ動作をします  
祝日は、定義ファイルから自動的に行われる為、新しい祝日が設定されたり廃止されたりすることがない限り永久的に計算することができるようになっています  
そのため、毎年定義ファイルを更新する必要はありません  

(注意)  
[春分の日](http://ja.wikipedia.org/wiki/%E6%98%A5%E5%88%86%E3%81%AE%E6%97%A5)および[秋分の日](http://ja.wikipedia.org/wiki/%E7%A7%8B%E5%88%86%E3%81%AE%E6%97%A5)はWikipediaの簡易的な計算を元に算出しています  
そのため、実際には確定した日付を保証するものではありません

## getHolidays

祝日一覧を取得します

`{Object} Koyomi.getHolidays ({Number} year)`

  + キーに日にち、値に祝日名が設定されたオブジェクトを返します
  + `{'101': '元日', '111': '成人の日', '211': '建国記念日', （省略...）`
  + 一覧の中には振替休日および国民の休日も含みます

## getHolidayName

祝日名を取得します

`{String} Koyomi.getHolidayName ({Date|String} date)`

  + 指定した日が祝日であれば、祝日名を返します
  + 祝日で無い場合は、`null`を返します
  + 振替休日および国民の休日も対象に含みます

# ドキュメント一覧

  + [イントロダクション ../README.md](../README.md)
  + [インスタンスの作成 ./instance.md](./instance.md)
  + [フォーマット ./format.md](./format.md)
  + [日時の情報取得・操作 ./calc-date.md](./calc-date.md)  
  + [営業日計算 ./eigyobi.md](./eigyobi.md)
  + [カレンダー情報 ./calendar.md](./calendar.md)
  + [年度 ./nendo.md](./nendo.md)
  + 祝日 ./holiday.md
  + [営業・休業 ./open-close.md](./open-close.md)
  + [補助関数 ./helper.md](./helper.md)

