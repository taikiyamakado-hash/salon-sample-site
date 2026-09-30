# LUMINA hair atelier — 美容室Webサイト制作サンプル

## サイト概要

顧客名：架空の美容室 LUMINA hair atelier（御殿場を想定）。初回予約への導線を重視した、美容室向けの静的サイトです。既存リポジトリの店名と地域設定を引き継ぎ、デザインと写真、予約導線を刷新しました。

既存公開先： https://taikiyamakado-hash.github.io/salon-sample-site/

今回の変更は `design/lumina-salon` ブランチで管理します。公開済みのmainへは未反映です。既存リポジトリはPublicであり、公開範囲は変更していません。

## 要件・設計

- 最重要目的：初めての来店に対する不安を減らし、予約につなげる。
- 主なターゲット：御殿場周辺の、髪のまとまりと自然なカラーを求める大人の方。
- 悩み：似合う髪型がわからない、朝のセットに時間をかけられない、料金が不安。
- 強みの仮設定：丁寧な相談、状態に合わせた提案、家でのスタイリング案内。
- 差別化：華美な変化より日常での扱いやすさを訴求。競合優位性を実証するものではありません。
- 導線：ファーストビュー → スタイル → 料金 → 来店の流れ・FAQ → 予約体験。
- 構成：TOP内にConcept / Style / Menu / Salon / First visit / FAQ / Access / Reserve。別ページにプライバシー説明。
- デザイン：余白、生成写真、アイボリー、深いオリーブブラウン、明朝・セリフ見出し。
- 写真：すべてこのサンプルのための生成イメージ。実店舗・実績として扱わない。
- お客様の声・スタッフの実績：根拠がないため架空の口コミや経歴は掲載していません。

参考URL：https://unrip-kumamoto.com/ （コンセプト、メニュー、スタイル、アクセス、予約の情報構成を参考にしました。画像・文章の転載はありません。）

## 使用技術

HTML / CSS / Vanilla JavaScript。ビルド不要・外部依存なし。WebP画像、システムフォントを使用。XServerの公開フォルダーにもそのまま配置できます。

## ファイル構成

- `index.html`：トップページ
- `styles.css`：レスポンシブ・ダイアログを含む共通スタイル
- `script.js`：モバイルメニュー、予約体験、スタイル詳細
- `privacy.html`：デモでの入力情報の扱い
- `assets/hero.webp`, `assets/bob.webp`, `assets/salon.webp`：新規生成した写真イメージ
- `assets/favicon.svg`：専用favicon
- `assets/*.svg`（favicon以外）：既存素材。新ページからは未使用、履歴保全のため保持
- `robots.txt`, `sitemap.xml`：クローラー・URL設定
- `QA.md`：検証結果と未確認項目

## ローカル確認・更新方法

`index.html`をブラウザーで開くか、ルートで `python3 -m http.server 4173` を実行します。文章と料金はHTML、配色はCSS先頭の変数、予約の挙動はJSを修正してください。画像を差し替える際は同名WebPを置き、実寸に合わせてHTMLのwidth/heightも更新します。

## 機能・SEO

- スマートフォン用メニュー、固定予約CTA
- 標準dialogによる予約デモ・スタイル詳細、Escapeで閉じる、フォーカス制御
- ネイティブdetailsによるFAQ
- 入力必須・過去日不可の予約体験。名前や連絡先は求めません
- データ送信、保存、アクセス解析、広告Cookieなし
- title / description / OGPテキスト / canonical / h1〜h3 / alt / favicon / sitemap / robots.txt
- **架空店舗のため `noindex, follow` を明示。** robots.txtでクロールを許可し、noindexを読めるようにしています。検索登録は意図的に抑制しています
- OGP画像は未設定。実店舗用に利用する際は承認済み画像・正式URLで設定してください
- 画像に寸法指定、ファーストビュー以外は遅延読込、アニメーション低減設定への対応

## 公開手順

1. QA.mdの未確認項目を実機で確認。
2. このサンプルのまま公開する場合はサンプル表記・noindexを維持。
3. レビュー後、ブランチをmainにマージ。GitHub Pagesの既存設定がmainを対象としていれば更新されます。公開設定そのものは本作業では変更していません。
4. XServerで公開する場合は `.git`、README、QAなどを除く公開ファイルを対象ドメインのpublic_htmlに配置。canonical、OGP URL、sitemap、robots.txtを正式ドメインへ変更。

## 顧客確認事項（実店舗への転用時）

正式名称・住所・連絡先・営業時間・駐車場、料金・所要時間・追加料金、予約先URL、キャンセル方針、写真の利用許可、個人情報取扱方針、正式ドメインを確認すること。予約デモを実運用フォームに見せかけないでください。

## セキュリティ

APIキー・パスワード・個人情報はありません。.env等はgitignore対象です。外部リンクはnoopener noreferrer付き。入力値はtextContentで表示し、HTMLとして解釈しません。

## 画像生成記録

内蔵画像生成を使用し、生成後WebPへ圧縮しました。保存先は上記assets内です。

- hero: Japanese adult woman around 30, chestnut medium-long layered hair, three-quarter back profile, cream blouse, sunlit warm plaster wall, editorial photograph, landscape 1536x1024, no text/logos.
- bob: Japanese adult woman around 30, chin-length glossy dark brown bob, side profile, beige knit, warm plaster background, editorial photograph, portrait 1024x1536, no text/logos.
- salon: Small Japanese hair salon, two tan chairs, rounded mirrors, oak cabinetry, cream walls, afternoon sunlight, architectural editorial photograph, landscape 1536x1024, no people/text/logos.

## 初回来店向けLP（2026-10-01追加）

`lp.html` を開いてください。LP専用のスタイルは `lp.css`、予約デモは `lp.js` です。既存HPと写真・配色を共有し、髪の悩み→サロンの考え方→カット＋透明感カラー→来店の流れ→FAQ→予約体験へ絞った構成です。通常のサンプル料金12,100円〜を使用し、根拠のない割引・口コミ・限定枠は設けていません。各ボタンから予約デモを開くと、選択したメニューが反映されます。HPフッターからLPへ移動できます。公開時の想定URLは `/salon-sample-site/lp.html` ですが、公開反映は未実施です。
