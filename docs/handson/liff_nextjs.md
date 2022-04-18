# Next.js で LIFF アプリ

<HistoryTags :tags="['React', 'Next.js', 'LINE', 'LIFF']" />

目指すゴールはフロントエンドライブラリ [React](https://ja.reactjs.org) でひとつの Web アプリを作ること。[LINE Front-end Framework](https://developers.line.biz/ja/docs/liff/overview/) と [Firebase Authentication](https://firebase.google.com/docs/auth) を合わせアプリ内で LINE 認証を使えるようにします。

LIFF は LINE Front-end Framework の略で [LINE 社](https://linecorp.com/) が提供する Web アプリのプラットフォームです。このプラットフォームで動作する Web アプリを LIFF アプリと呼びます。

|LINE Auth|Signed|
|:---|:---|
|![](https://i.imgur.com/1SD6yfH.jpg)|![](https://i.imgur.com/pqQPnYp.jpg)|

なお、実際の成果物は [Firebase Hosting](https://firebase.google.com/docs/hosting) にデプロイを済ませており、 [Next.js](https://nextjs-liff.web.app/) 並びに [React on Vite](https://vite-react-liff.web.app/) をご確認いただければ幸いです。

## 執筆済みの教材

今回の教材は [Zenn](https://zenn.dev/) を利用しています。

[@preview](https://zenn.dev/jiyuujin/articles/liff-on-nextjs)

## テスト課題

- アイコン画像を表示する
- メッセージを送信する

## 参照リポジトリ

[https://github.com/jiyuujin/nextjs-liff](https://github.com/jiyuujin/nextjs-liff)

また Next.js 上で React を動作させる [サンプル](https://github.com/nekohack-oss/nextjs) と合わせ、参考にしていただければ幸いです。

### CHANGELOG

#### [`ver.2022.5` branch](https://github.com/jiyuujin/nextjs-liff/tree/ver.2022.5)

React 18 (Next.js 12) に対応している。

#### [`ver.2022.4.2` branch](https://github.com/jiyuujin/nextjs-liff/tree/ver.2022.4.2)

`shareTargetPicker` を利用して外部ブラウザで LINE にメッセージを送信する。

#### [`ver.2022.4.1` branch](https://github.com/jiyuujin/nextjs-liff/tree/ver.2022.4.1)

LIFF ブラウザでメッセージを送信する。

#### [`ver.2022.3` branch](https://github.com/jiyuujin/nextjs-liff/tree/ver.2022.3)

LINE ログイン時にアイコン画像を表示している。

#### [`ver.2022.2` branch](https://github.com/jiyuujin/nextjs-liff/tree/ver.2022.2)

LINE Front-end Framework を利用して LINE 認証を実装している。

#### [`ver.2022.1` branch](https://github.com/jiyuujin/nextjs-liff/tree/ver.2022.1)

Firebase Authentication の Google 認証を実装している。
