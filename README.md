# Koyomi

日本の暦に基づいて日時に計算を行うモジュールです  
このモジュールは、サーバサイド、クライアントサイド両対応です

主な機能

  + フォーマット
  + 日にち、時間等の加減算
  + 営業日の加減算・日数カウント
  + 祝日一覧の取得
  + カレンダーデータの取得

# 利用方法

## node

npm経由でインストールしてください

`npm install koyomi`

```
var Koyomi = require('koyomi');
var wareki = Koyomi.format('2015-7-15', 'WAREKI');

var koyomi = new Koyomi();
var noki = koyomi.addEigyobi('2015-5-1', 10);
```

## クライアントサイド

`public/koyomi.min.js`を読み込んでください

```
<script src="koyomi.min.js"></script>
<script>
  var wareki = Koyomi.format('2015-7-15', 'WAREKI');

  var koyomi = new Koyomi();
  var noki = koyomi.addEigyobi('2015-5-1', 10);
</script>
```

# 日本の暦

## 和暦

日本の暦では、年号を使用した日付の表記(和暦)がよく使用されます  
Koyomiでは和暦でフォーマットすることができます

年区切りと日付区切りの両方をサポートしています

| 年号 | 年区切りの期間 | 日付区切りの期間      |
|------|--------------- |-----------------------|
| 平成 | 1989年-        | 1989/01/08-           |
| 昭和 | 1926年-1988年  | 1926/12/25-1989/01/07 |
| 大正 | 1912年-1925年  | 1912/07/30-1926/12/24 |
| 明治 | 1868年-1911年  | 1868/01/25-1912/07/29 |

(注意)  
1868年から明治ですが、グレゴリオ歴の導入は1873年（明治6年）以降のため、それ以前は和暦は旧暦のこよみになります。  
Koyomiでは旧暦のサポートはしていません。  
そのため、1872年以前での和暦のフォーマットは西暦表示になります  

## 祝日

Koyomiに設定されている祝日は、1948年7月20日に施行された祝日法に基づき計算されています  
祝日をフォーマットや営業日の計算に使用できます  
祝日データは2015年5月時点で決定されているものが反映されています  
（2016年から新しく施行される山の日まで)

## 営業日

ビジネス上では見積もり時に何営業日で納品など、営業日ベースの計算が必須です  
営業日の計算は煩雑になりやすいため、日付を明記することが面倒です  
それらを自動計算させることができます


# 一部機能の紹介

  + クラスメソッド
      + フォーマット。`Koyomi.format('2015-5-5', 'wareki')` &#x226B; `'平成二十七年五月五日'`
      + 加減算。`Koyomi.add('2015-5-5', '3日')` &#x226B; `new Date('2015-5-8')`
  + インスタンスの活用 `var koyomi = new Koyomi()`
      + 営業日の計算。`koyomi.addEigyobi('2015-5-5', 3)` &#x226B; `new Date('2015-5-11')`
      + 営業日数。`koyomi.countEigyobi('2015-1-1', '2015-12-31')` &#x226B; `242`

このほかにも多くの機能を利用することができます  
詳しくは下記のドキュメントを参照してください


# ドキュメント一覧

  + イントロダクション ./README.md
  + [インスタンスの作成 ./docs/instance.md](./docs/instance.md)
  + [フォーマット ./docs/format.md](./docs/format.md)
  + [日時の情報取得・操作 ./docs/calc-date.md](./docs/calc-date.md)
  + [営業日計算 ./docs/eigyobi.md](./docs/eigyobi.md)
  + [カレンダー情報 ./docs/calendar.md](./docs/calendar.md)
  + [年度 ./docs/nendo.md](./docs/nendo.md)
  + [祝日 ./docs/holiday.md](./docs/holiday.md)
  + [営業・休業 ./docs/open-close.md](./docs/open-close.md)
  + [補助関数 ./docs/helper.md](./docs/helper.md)
