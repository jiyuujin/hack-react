# ユニットテスト

フロントエンドには主に 3 点のユニットテストが存在する

- [Jasmine](https://jasmine.github.io)
- [Jest](https://jestjs.io)
- [Mocha](https://mochajs.org)

npm trends で見てもらっても明らかだが、最近は [Jest](https://jestjs.io) を採用しているプロジェクトは多い

[npm trends - `jasmine` vs `jest` vs `mocha`](https://www.npmtrends.com/jest-vs-mocha-vs-jasmine)

そこで今回は [Jest](https://jestjs.io) に焦点を当てる

::: tip Jest の手引き
まずは Jest 単体でその挙動を確認しつつ、下記のように段階を踏んで進めることを目指す

- Jest 単体でその挙動を確認する
- React に Jest を組み込んでその挙動を確認する
:::

## Jest 開発環境を構築する

事前に [Node.js 環境構築](/#node-js-環境構築) が終わっていることを確認する

今回も TypeScript でユニットテストを書くため、それに必要な依存関係をインストールする

```bash
npm install -D @types/jest jest ts-jest
```

`@types/***` のような prefix が付いている場合は型定義用のプラグインを表している

今回こうしたプラグインをインストールしているので `tsconfig.json` の `types` に型定義を追加する

```json
{
  "compilerOptions": {
    "types": [
      "@types/jest"
    ]
  }
}
```

`package.json` に `jest` プロパティを追加することで、最低限ユニットテストを行えるようにする

```json
{
  "jest": {
    "transform": {
      ".(ts|tsx)": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$"
  }
}
```

### ディレクトリ構成

ディレクトリ構成はざっくり下記の通り

```
+
| -- __tests__
| -- src
| -- package.json
| -- tsconfig.json
```

実行メソッドとそれに付随するユニットテスト、それぞれのディレクトリに分ける方が良い

- 実行メソッドを `src` 配下に置く
- テストメソッドを `__tests__` に置く

## React に Jest を組み込む

[Pokemon アプリ](./pokemon.md) の製作を終えていることとする

CRA (create-react-app) で構築した場合は、既にデフォルトで Jest が入っている

```bash
# react-scripts test
npm run test
```

しかしこれだけでは動かない

今回 TypeScript で書いており package.json で ts-jest を読み込む必要がある

```json
{
  "jest": {
    "transform": {
      ".(ts|tsx)": "ts-jest"
    }
  }
}
```

コンポーネントに CSS を使っており identity-obj-proxy を読み込む必要がある

```json
{
  "jest": {
    "moduleNameMapper": {
      ".+\\.(css|styl|less|sass|scss)$": "identity-obj-proxy"
    }
  }
}
```

アセット (画像) を使っている場合 mock を読み込む必要がある

```js
module.exports = 'test-file-stub'
```

```json
{
  "jest": {
    "moduleNameMapper": {
      ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/file-mock.js"
    }
  }
}
```

改めて `npm run test` を実行すると、上手くテストが動作していることを確認できる

### React Testing Library を追加する

`@testing-library/react` をインストールする

```bash
npm install -D @testing-library/react
```

ここで React Testing Library 自体にも明確な担当領域を持つため Jest の代わりとして使うことはありません

## テスト課題

### 母音を抽出する

母音を抽出しその個数を返すメソッド `findVowels()` と、それに付随するテストを作成してください

ただし、母音は `a|i|u|e|o` を表し、大文字・小文字を区別する

また `findVowels()` は文字列 `string` 型で受け取って、数値 `number` 型で返す

### 税込価格を算出する

税込価格を算出するメソッド `getPaymentTotal()` と、それに付随するテストを作成してください

ただし軽減税率有の場合は `8%` の税率を、軽減税率無の場合は `10%` の税率を付加する

また `getPaymentTotal()` は文字列 `string` 型しか受け取ることができず、文字列 `string` 型しか返すことができない

### 非同期コードをテストする

[Pokemon アプリ](./pokemon.md) でとり上げた [Pokemon API](https://pokeapi.co) における非同期通信の処理メソッドと、それに伴うテストを作成してください

ただし非同期通信の処理メソッドは [node-fetch](https://www.npmjs.com/package/node-fetch) を利用する。ここで TypeScript で書く場合は専用の型定義用プラグイン [@types/node-fetch](https://www.npmjs.com/package/@types/node-fetch) を、上記に伴うテストは [fetch-mock](https://www.npmjs.com/package/fetch-mock) も合わせてインストールしながら非同期通信に使う API のモックを使って書く

### React で Jest を扱う

React で製作した Web アプリ [Pokemon アプリ](./pokemon.md) を Jest の側面からアプローチする

- まずは snapshot を撮影しましょう、なお初期設定のまま進めていただくと snapshot の成果物は `src/__snapshots__` に吐き出される
- 続いて特定の DOM に対し props から正しく値が渡されているか、文字列を確認してください
- 最後に非同期コード (SWR) をテストしましょう

## テスト課題の解答例

### 母音を抽出する

::: details 解答例
実行メソッド `findVowels()` は下記の通り

```ts
export const findVowels = (messageText: string): number => {
    const vowelList: string[] | null = messageText.match(/A|I|U|E|O|a|i|u|e|o/g)
    return vowelList?.length !== undefined ? vowelList?.length : 0
}

const result = findVowels('HELLO')
console.log(result)
```

実行メソッド `findVowels()` に付随するユニットテストは下記の通り

```ts
import { findVowels } from '../src/main'

test('Result when input HELLO', () => {
    expect(findVowels('HELLO')).toBe(2)
})
```

:::

### 税込価格を算出する

::: details 解答例
実行メソッド `getPaymentTotal()` は下記の通り

```ts
export const getPaymentTotal = (priceTexts: Array<string>, isReducedTax: boolean): string => {
    let price: number = 0
    let errorText: string = ''

    priceTexts.forEach((priceText: string) => {
        if (isNaN(parseInt(priceText))) {
            // 数値に変換できなかった場合
            errorText = 'ERROR'
        } else {
            price += parseInt(priceText)
        }
    })

    if (errorText) {
        return errorText
    }

    const taxedPrice = getReducedTax(price, isReducedTax)

    return taxedPrice.toString()
}

export const getReducedTax = (totalPrice: number, isReducedTax: boolean): number => {
    if (isReducedTax) {
        return totalPrice * (100 + 8) / 100
    }
    return totalPrice * (100 + 10) / 100
}

const priceA = getPaymentTotal(['210', '430', '760'], true)
const priceB = getPaymentTotal(['800', '250'], false)
const priceC = getPaymentTotal(['abc'], true)
const priceD = getPaymentTotal(['abc'], false)
console.log(priceA)
console.log(priceB)
console.log(priceC)
console.log(priceD)
```

実行メソッド `getPaymentTotal()` に付随するユニットテストは下記の通り

```ts
import { getPaymentTotal } from '../src/main'

test('Result when input ¥100 with reduced tax', () => {
    expect(getPaymentTotal(['100'], true)).toBe('108')
})

test('Result when input ¥100', () => {
    expect(getPaymentTotal(['100'], false)).toBe('110')
})

test('Result when input abc with reduced tax', () => {
    expect(getPaymentTotal(['abc'], true)).toBe('ERROR')
})

test('Result when input abc', () => {
    expect(getPaymentTotal(['abc'], false)).toBe('ERROR')
})
```

:::

### 非同期コードをテストする

::: details 解答例
[Pokemon アプリ](./pokemon.md) では swr を利用したが、その代わりに node-fetch を用いることができる。

```bash
npm i @types/node-fetch node-fetch fetch-mock
```

非同期通信に使う API の mock を読み込む

```json
{
  "jest": {
    "testEnvironment": "node",
    "setupFiles": ["./setup-files.js"]
  }
}
```

Jest でも node-fetch が使えるように mock を設定する

```js
jest.mock('node-fetch', () => global.fetch)
```

`__mocks__/node-fetch.js` を作成する

```js
const nodeFetch = jest.requireActual('node-fetch')
const fetchMock = require('fetch-mock').sandbox()

Object.assign(fetchMock.config, nodeFetch, {
    fetch: nodeFetch
})

module.exports = fetchMock
```

実際の処理メソッドは下記の通り

```tsx
const fetch = require('node-fetch')

export const fetchAllPokemon = async (): Promise<any> => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100&offset=200`)
    const data = await res.json()
    return data
}
```

`https://pokeapi.co/api/v2/pokemon` から正しく届いているか、レスポンスを確認する

```tsx
import fetch from 'node-fetch'

import { fetchAllPokemon } from '../../../src/services/pokemonService'

jest.mock('node-fetch', () => {
    return jest.fn()
})

describe('fetch-mock test', () => {
    it('Check pokemon response', async () => {
        const dummyResponse: any = Promise.resolve({
            ok: true,
            status: 200,
            json: () => {
                return {
                    msg: 'Success',
                }
            },
        })

        const spyFetch = fetch as jest.MockedFunction<typeof fetch>
        spyFetch.mockImplementation(() => dummyResponse)

        await dummyResponse

        console.log(dummyResponse)

        fetchAllPokemon().then((data) => {
            console.log(data)
        }).catch((err) => {
            console.error(err.message)
        })
    })
})
```
:::

### React で Jest を扱う

::: details 解答例
snapshot を撮影する

```tsx
import React from 'react'
import renderer from 'react-test-renderer'

import { Card } from './Card'

test('Render component', () => {
    const component = renderer.create(
        <Card
            pokemon={{
                name: 'unown',
                url: 'https://pokeapi.co/api/v2/pokemon/201/',
            }}
        />
    )
    expect(component).toMatchSnapshot()
})
```

props から正しく値が渡されているか、文字列を確認する

```tsx
import React from 'react'
import renderer from 'react-test-renderer'
import { render } from '@testing-library/react'

import { Card } from './Card'

test('Confirm text', () => {
    const component = render(
        <Card
            pokemon={{
                name: 'unown',
                url: 'https://pokeapi.co/api/v2/pokemon/201/',
            }}
        />
    )
    expect(component.getAllByText('Unown')).toHaveLength(1)
})
```

非同期コード (SWR) をテストする

```tsx
import { SWRConfig } from 'swr'
import { render } from '@testing-library/react'

import App from './App'

it('Check response', async () => {
    render(
        <SWRConfig value={{ dedupingInterval: 0 }}>
            <App />
        </SWRConfig>
    )
})
```

非同期コード (SWR) をテストする際、カスタマイズして書くこともできる

```tsx
import React from 'react'
import { SWRConfig } from 'swr'
import { render } from '@testing-library/react'

import App from './App'

it('Check custom response', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => {
        return <SWRConfig value={{ dedupingInterval: 0 }}>{children}</SWRConfig>
    }

    const customRender = (ui: React.ReactElement, options?: any) =>
        render(ui, { wrapper, ...options })

    console.log(customRender)
})
```

:::

## 参照リポジトリ

- [https://github.com/jiyuujin/frontend-tests/tree/master/tests/jest](https://github.com/jiyuujin/frontend-tests/tree/master/tests/jest)
- [https://github.com/jiyuujin/pokemon](https://github.com/jiyuujin/pokemon)

### その他

今回焦点を当てなかったツール Jasmine や Mocha についてもご確認いただければ幸いです

- [https://github.com/jiyuujin/frontend-tests/tree/master/tests/jasmine](https://github.com/jiyuujin/frontend-tests/tree/master/tests/jasmine)
- [https://github.com/jiyuujin/frontend-tests/tree/master/tests/mocha](https://github.com/jiyuujin/frontend-tests/tree/master/tests/mocha)
