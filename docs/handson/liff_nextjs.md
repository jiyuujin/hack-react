# Next.js で LIFF アプリ

目指すゴールはフロントエンドライブラリ [React](https://ja.reactjs.org) でひとつの Web アプリを作ること。[LINE Front-end Framework](https://developers.line.biz/ja/docs/liff/overview/) と [Firebase Authentication](https://firebase.google.com/docs/auth) を合わせアプリ内で LINE 認証を使えるようにする。

LIFF は LINE Front-end Framework の略で [LINE 社](https://linecorp.com/) が提供する Web アプリのプラットフォームです。このプラットフォームで動作する Web アプリを LIFF アプリと呼ぶ。

実際の成果物は [Firebase Hosting](https://firebase.google.com/docs/hosting) にデプロイを済ませており、 [Next.js](https://nextjs-liff.web.app/) をご確認いただければ幸いです。

|LINE Auth|Signed|
|:---|:---|
|![](https://i.imgur.com/1SD6yfH.jpg)|![](https://i.imgur.com/pqQPnYp.jpg)|

## Next.js プロジェクトを作成する

`npx create-next-app <プロジェクト名>` コマンドで Next.js プロジェクトを作成する。 TypeScript で書くため `--template typescript` オプションを付ける。

```bash
npx create-next-app nextjs-liff --template typescript
```

### 依存関係をインストールする

事前に [Node.js 環境構築](/#node-js-環境構築) が終わっていることを確認する。

```bash
npm install
```

### localhost で起動する

[http://localhost:3000](http://localhost:3000) が Web ブラウザで開けば OK

```bash
# next dev
npm run dev
```

## LINE Developers を操作する

[LINE Developers](https://developers.line.biz/console/) のコンソールへログインして、アプリケーションから LINE API へ繋げるためのチャネルを作成する。

![](https://i.imgur.com/hEBLkRQ.jpg)

コンソールの TOP から該当のプロバイダを選択して `新規チャンネル作成` でチャンネルを追加する。

![](https://i.imgur.com/H0bfGXi.jpg)

LIFF アプリを作るため、チャンネルの名前や説明を入力する。

チャンネルの種類に `LINE ログイン` を選択する。

- チャンネルの名前
- チャンネルの説明
- チャンネルの種類

次に LIFF アプリの詳細設定です。

![](https://i.imgur.com/2TSdPPD.jpg)

## Next.js とは

[Next.js](https://nextjs.org/) は React をベースに開発されているフロントエンド・フレームワークです。実際に導入して得られるメリット、それは SSR/SSG としての利用。そして開発サーバの部分的な高速リロードも実現する。

### Next.js プロジェクトを作成する

`npx create-next-app` コマンドで Next.js プロジェクトを作成する。 TypeScript で書くため `--template typescript` オプションを選択する。

```bash
# create-next-app
npx create-next-app <アプリ名> --template typescript
```

#### 依存関係をインストールする

事前に [Node.js 環境構築](/#node-js-環境構築) が終わっていることを確認する。

```bash
npm install
```

#### localhost で起動する

[http://localhost:3000](http://localhost:3000) が Web ブラウザで開けば OK

```bash
# next dev
npm run dev
```

### カスタマイズ

ルート直下に next.config.js を作成する。

ここで大体カスタマイズできる。

```js
module.exports = {
  //
}
```

#### HTTPS 環境を作る

LINE Front-end Framework を使うため HTTPS の環境下である必要がある。

それに向けて certificates を生成する。

```bash
openssl req -x509 -out localhost.crt -keyout localhost.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
```

これをもってプロジェクトルート直下に下記 2 ファイルが生成される。

- localhost.crt
- localhost.key

新たに certificates ディレクトリを切ってそこに移動させる。

Node.js 標準で入っている fs の機能と合わせ Next.js の [カスタムサーバ](https://nextjs.org/docs/advanced-features/custom-server) を使うことで Express + HTTPS モジュールで HTTPS サーバを立てられる。

```js
const express = require('express')
const next = require('next')
const https = require('https')
const fs = require('fs')

const port = parseInt(process.env.PORT || '3000')
const host = '0.0.0.0'

const app = next({
  dev: process.env.NODE_ENV !== 'production',
})
const handle = app.getRequestHandler()

;(async () => {
  await app.prepare()

  const expressApp = express()
  expressApp.get('*', (req, res) => handle(req, res))

  const hasCertificates =
    fs.existsSync('./certificates/localhost.key') && fs.existsSync('./certificates/localhost.crt')
  const useHttps = process.env.HTTPS === 'true' && hasCertificates

  if (useHttps) {
    const options = {
      cert: fs.readFileSync('./certificates/localhost.crt'),
      key: fs.readFileSync('./certificates/localhost.key'),
    }

    const server = https.createServer(options, expressApp)
    server.listen(port, host)
    console.log(`> Ready on https://localhost:${port}`)
  } else {
    expressApp.listen(port, host)
    console.log(`> Ready on http://localhost:${port}`)
  }
})()
```

あとは LINE Developers のコンソールの `Endpoint URL` で `https://localhost:3000` を設定する。

最終的に `HTTPS=true node ./server.js` を実行して Web サーバが起動することを確認してください。

## Next.js で LINE Front-end Framework を使う

[@line/liff](https://www.npmjs.com/package/@line/liff) をインストールする。

```bash
# @line/liff
npm install @line/liff
```

先に LINE Developers のコンソールで作成した LIFF ID を `.env` で読み込む。

```.env
NEXT_APP_LIFF_ID=
```

環境変数 `NEXT_APP_LIFF_ID` を `next.config.js` で読み込む。

```js
module.exports = {
  env: {
    NEXT_APP_LIFF_ID: process.env.NEXT_APP_LIFF_ID,
  },
}
```

### 勘所は `useEffect`

`useEffect` で `@line/liff` を使う点に注意する。

ユーザのログイン状況は [`liff.isLoggedIn()`](https://developers.line.biz/ja/reference/liff/#is-logged-in) を使って判定する。

```ts
import React, { useEffect } from 'react'

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    import('@line/liff').then((liff: any) => {
      liff
        .init({ liffId: process.env.NEXT_APP_LIFF_ID })
        .then(() => {
          if (!liff.isLoggedIn()) {
            liff.login({})
          }
        })
        .catch((err) => {
          console.error({ err })
        })
    })
  }, [])
}

export default MyApp
```

認証され次第、各種 API を使えるようになる。

### 各種 API の用法

LINE Front-end Framework の詳しい API リファレンスは [LINE 公式](https://developers.line.biz/ja/reference/liff/) を参照してください。

現在のプロフィール情報を [`liff.getProfile()`](https://developers.line.biz/ja/reference/liff/#get-profile) を使って取得する。

```ts
import React, { useEffect, useState } from 'react'

const MyApp = ({ Component, pageProps }) => {
  const [profileName, setProfileName] = useState<string>('')

  useEffect(() => {
    liff
      .getProfile()
      .then((profile: any) => {
        setProfileName(profile.displayName)
      })
      .catch((err: any) => {
        console.error({ err })
      })
  }, [])
}

export default MyApp
```

表示名は `profile.displayName` より取得できる。

## テスト課題

### アイコン画像を表示する

アイコン画像の表示も、現在のプロフィール情報を取得するために利用した [`liff.getProfile()`](https://developers.line.biz/ja/reference/liff/#get-profile) を使って取得する。

### メッセージを送信する

メッセージの送信は [`liff.sendMessages()`](https://developers.line.biz/ja/reference/liff/#send-messages) を使う。なお、外部の Web ブラウザからアクセスできないことに注意する。

## テスト課題の解答例

### アイコン画像を表示する

::: details 解答例
アイコン画像の URL 用にステートを準備する。

```tsx
import React, { useEffect, useState } from 'react'

const Top = () => {
  const [pictureUrl, setPictureUrl] = useState<string>('')

  useEffect(() => {
    import('@line/liff').then((liff: any) => {
      liff
        .init({ liffId: import.meta.env.VITE_APP_LIFF_ID })
        .then(() => {
          setLiffObject(liff)
          if (liff.isLoggedIn()) {
            liff
              .getProfile()
              .then((profile: any) => {
                setPictureUrl(profile.pictureUrl)
              })
              .catch((err: any) => {
                console.error({ err })
              })
          }
        })
        .catch((err: any) => {
          console.error({ err })
        })
    })
  }, [])
}
```

`liff.getProfile()` の戻り値に `pictureUrl` が存在することを確認してください。

```tsx
import React, { useEffect, useState } from 'react'

const Top = () => {
  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            {liffObject?.isLoggedIn() && (
              <img
                className="mx-auto h-12 w-auto"
                src={pictureUrl}
                alt="picture logo"
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
```

JSX で `pictureUrl` を `<img>` の `src` に設定することでアイコン画像を表示できる。

今回 Web アプリ全体に対し [Tailwind CSS](https://tailwindcss.com/) を利用しているが、よしなりに独自スタイルをあてることも可能なので、随時適応していただければ。
:::

### メッセージを送信する

::: details 解答例
ボタンとそれに付随する実行メソッド `sendMessages()` を準備する。

```tsx
import React from 'react'

const Top = () => {
  const sendMessages = async () => {
    await liffObject.sendMessages([
      {
        type: 'text',
        text: 'Hello World',
      },
    ])
  }

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {liffObject?.isLoggedIn() && (
                <button
                  onClick={sendMessages}
                  type="button"
                  className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                >
                  Send Messages
                </button>
              )}
            </h2>
          </div>
        </div>
      </div>
    </>
  )
}
```

これをもって LINE アプリ内の Web ブラウザで確認する。
:::

## 参照リポジトリ

[https://github.com/jiyuujin/nextjs-liff](https://github.com/jiyuujin/nextjs-liff)

また Next.js 上で React を動作させる [サンプル](https://github.com/nekohack-oss/nextjs) と合わせ、参考にしていただければ幸いです。

### CHANGELOG

#### [`ver.2022.4.2` branch](https://github.com/jiyuujin/nextjs-liff/tree/ver.2022.4.2)

`shareTargetPicker` を利用して外部の Web ブラウザで LINE にメッセージを送信する。

#### [`ver.2022.4.1` branch](https://github.com/jiyuujin/nextjs-liff/tree/ver.2022.4.1)

LINE アプリ内の Web ブラウザでメッセージを送信する。

#### [`ver.2022.3` branch](https://github.com/jiyuujin/nextjs-liff/tree/ver.2022.3)

LINE ログイン時にアイコン画像を表示している。

#### [`ver.2022.2` branch](https://github.com/jiyuujin/nextjs-liff/tree/ver.2022.2)

LINE Front-end Framework を利用して LINE 認証を実装している。

#### [`ver.2022.1` branch](https://github.com/jiyuujin/nextjs-liff/tree/ver.2022.1)

Firebase Authentication の Google 認証を実装している。
