# Change Log

 0.5.2 / 2015-12-08
===================
  
  * テストのutil/create.js、util/clone.jsを記述
  * example/testを追加
  * docs/config.md、startMonthの既定値を修正


 0.5.1 / 2015-12-06
===================

  * v1.0に向け大幅に整理しました
  * **注意! v0.3.9までのAPIと全く互換性がありません**
  * ES6(ES2015)で記述
    * クライアントサイドはbabelによりes5のコードに変換済みです
  * イントロダクション＆インスタンスの作成
    * グローバル変数Koyomiをkoyomiに変更。クラスではなくオブジェクトに変更しました
    * クラスメソッドとインスタンスメソッドの区別がなくなりすべて共通のオブジェクトの関数になりました
    * インスタンスの作成が不要になったため、ドキュメントの"インスタンスの作成"は"設定値"と名称変更しました
    * 年が関連するメソッドやパラメータの1月始まりを廃止し、startMonthに統一しました
    * 設定値holidayOpenedはopenOnHolidayに変更になりました
    * seasonHolidayに休業の事由を設定できるようになりました
    * koyomi.createとkoyomi.cloneメソッドが追加されました
  * フォーマット
    * パラメータ文字列を整理しました
        * VV, Vを廃止し、VxをVに変更
        * Qを廃止し、QxをQに変更
        * R,Rjを廃止し、Rx,RiをR,rに変更、
        * TT,T,tを廃止し、TTx,Tx,txをTT,T,tに変更
        * Wをwに、WjをWに変更
        * FFwをFFに、FFをFに、Fwをffに、Fをfに変更
        * EwをEEに変更
        * eの戻り値に特別休業と祝日名を返すよう変更
        * Aをaaに、AjをAに変更
    * formatの引数をコンパイルしキャッシュするように変更し高速化しました
    * formatNendoをformatYearに名称変更し、ドキュメントをフォーマットの項に移動させました
    * formatYearの引数はformatNendoと異なります
  * 日時の情報取得・操作
    * 新しいメソッドgetRangeが追加されました
        * 指定した単位の範囲で最初と最後の日時を返します
    * start,endをfrom,toに名称変更しました
    * diffDays,diffMinutes,diffSecondsを、汎用化しdiffに統合しました
    * yearDays,monthDaysを汎用化しdaysに統合しました
    * passYearDays,passDaysを汎用化しpassDaysに統合しました
    * remainYearDays,remainDaysを汎用化しremainDaysに統合しました
    * 新しいメソッドseparateが追加されました
        * 期間をブロックごとに分割(年度、月、日)されます
    * kindのソースコードをcalcDate.jsに移動しました
  * 営業日計算
    * コードを記述していたファイルがcalcEigyobi.jsからcalcBiz.jsに変更になりました
    * addEigyobi,toEigyobiをaddBiz,toBizに名称変更しました
    * countEigyobi,nendoEIgyobi,monthEigyobiは汎用化しbizに統合しました
    * passNendoEigyobi,passMonthEigyobiは汎用化しpassBizに統合しました
    * remainNendoEigyobi,remainEigyobiは汎用化しremainBizに統合しました
  * カレンダー情報
    * getCalendarDataの引数はrangeだけになりました
    * 引数でしていたstartWeekはオブジェクトの設定値を常に使用します
    * 引数やインスタンスで指定していた設定値sixを廃止し、カレンダーデータは常に6週分返すようにしました
    * ゴースト日が不要な場合は、手動で戻り値をArray.filterで排除してください
    * 各日付のプロパティopened,closedはopen,closeに名称を変更しました
    * 週番号の取得getWeekNumberのドキュメントが補助関数を重複していたので、削除しました
    * 日のデータの取得を効率化しました（formatの代わりにformatArrayを使用）
  * 年度
    * 年度のドキュメントは削除されました
        * 1月始まりではなくstartMonthに統一されたため
    * getNendoはgetEraとして補助関数の項目に移動しました
    * nendoDays,passNendoDays,remainNendoDaysは廃止され、それぞれdays,passDays,remainDaysに統合されました
    * formatNendoはformatYearとしてフォーマットのドキュメントに移動しています
  * 祝日
    * 特に変更はありません
  * 営業・休業
    * isOpenedはisOpenに名称変更しました
    * isCloseが追加されました
    * forcedOpen,forcedCloseはisSetOpen,isSetCloseに名称変更しました
    * isHolidayClosedはisHolidayCloseに名称変更しました
  * 補助関数
    * フォルダ名がfxからutilsに変更になりました
    * utilsに配置された関数はすべて単体で動作するようになりました
        * thisに依存しません
    * parseメソッド追加になりました
    * toDateはtoDatetimeに名称が変更になり、第二引数がなくなりました
    * toDateが新しく日付のみを返す関数として追加されました。旧toDate(value, ture)です
    * toDate,toDatetimeは、文字列・数字を引数にした場合に存在する日時を指定しなければnullを返すようになりました
    * toDate,toDatetimeの月が省略された場合は、startMonthが設定されるようになりました
    * getDateArray,getWeekIndexは廃止されました
    * getNengoはgetEraに名称変更しました
  * その他
    * const.jsはconfig.jsに統合されました
    * Array.indexOfを使用しているコードのいくつかをmapを使用するように変更し、高速化しました

 0.3.9 / 2015-09-10
===================

  * パラメータKを追加
  * kindを追加


  0.3.8 / 2015-09-04
===================

  * パラメータOを追加
  * getAgeを追加


 0.3.7 / 2015-08-25
===================

  * パラメータ文字列のYYYYを追加
  * formatの規定値をYYYY-MM-DD HH:mm:ssに変更


 0.3.5 / 2015-05-26
===================

  * suji,formatの序数を文字列に対応
  * toDateの文字列時のpm,Pm,午後を含む場合に対応
  * パラメータ文字列のCをeに移動(Cを空ける)


 0.3.4 / 2015-05-20
===================

  * getISOWeekNumberの追加
  * パラメータ文字列 GGG Ri 追加 Mj 削除
  * パラメータ文字列
  * const整理
  * format.jsの定数設定を切り出し、defineMushにパラメータ文字列を後から変更した時に対応可能にする
  * テストにWAREKI,wareki追加
  * forcedOpenClose, forcedOpen, forcedCloseの修正とテスト追加
  * example/calc追加


 0.3.3 / 2015-05-17
===================

  * インスタンスのformatから引数eigyobi,includeを削除


 0.3.2 / 2015-05-15
===================

  * calcDateの年区切り、週初めをconfigから取得
  * テストコードをフォルダに分類
  * パラメータ文字列変更 YYYY->Y, YY->y
  * パラメータ文字列削除 Zx
  * checkDayInfoHoliday -> forcedOpenClose
  * getTani追加


 0.3.1 / 2015-05-14
===================

  * テストコード作成
  * パラメータ文字列変更


 0.3.0 / 2015-04-09
===================

  * ファイル分割


 0.2.1 / 2015-04-06
===================

  * 初期リリース