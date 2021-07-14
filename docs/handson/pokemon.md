# Pokemon アプリ

目指すゴールはフロントエンドライブラリ [React](https://ja.reactjs.org) でひとつの Web アプリを作ること。無料で使える [Pokemon API](https://pokeapi.co) を [SWR](https://swr.vercel.app) でフェッチして多種多様なポケモンを見られるようにする

実際の成果物は [Vercel](https://vercel.com) にデプロイを済ませており [Hack Pokemon](https://hack-pokemon.vercel.app) をご確認いただければ幸いです

![](https://i.imgur.com/s66537D.jpg)

## React プロジェクトを作成する

`npx create-react-app <プロジェクト名>` コマンドで React プロジェクトを作成する。 TypeScript で書くため `--template typescript` オプションを付ける。

```bash
npx create-react-app pokemon-app --template typescript
```

### 依存関係をインストールする

事前に [Node.js 環境構築](/#node-js-環境構築) が終わっていることを確認する

```bash
npm install
```

### localhost で起動する

[http://localhost:3000](http://localhost:3000) が Web ブラウザで開けば OK

```bash
# react-scripts start
npm run start
```

## VSCode 開発環境を充実する

開発に当たって便利な設定にコード自動整形が存在する。コミット時にコードを自動整形するため [Code] - [Preferences] より [Settings] に入って `setting.json` を検索する

![](https://i.imgur.com/y65J5SA.jpg)

手始めに下記コードそのまま `setting.json` にコピー・ペーストする

```json
{
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "eslint.options": {
        "configFile": "./.eslintrc.js"
    }
}
```

![](https://i.imgur.com/KCVg59t.jpg)

ファイルを保存する際に ESLint ルールを自動的に適用できる

### コミット時にコードを自動整形する `editor.codeActionsOnSave`

かつての `eslint.autoFixOnSave` は廃止されたので注意が必要

### `.eslintrc.js` の ESLint 設定を読み込む `eslint.options`

`eslint.validate` を書く必要があったが `.eslintrc.js` に適切な設定があれば TypeScript や Vue 、 HTML ファイルも検証する

下記以外のファイルで ESLint を使いたい時は引き続き `eslint.validate` 設定が必要です

- TypeScript ... カスタムパーサとして `@typescript-eslint/parser` が設定されている
- HTML ... プラグインの設定に `eslint-plugin-html` が存在する
- Vue ... プラグインの設定に `eslint-plugin-vue` が存在する

## API をフェッチする

[Pokemon API](https://pokeapi.co) を参考に curl コマンドでレスポンスの JSON を確認してみる

```bash
curl https://pokeapi.co/api/v2/pokemon    

{"count":1118,"next":"https://pokeapi.co/api/v2/pokemon?offset=20&limit=20","previous":null,"results":[{"name":"bulbasaur","url":"https://pokeapi.co/api/v2/pokemon/1/"},{"name":"ivysaur","url":"https://pokeapi.co/api/v2/pokemon/2/"},{"name":"venusaur","url":"https://pokeapi.co/api/v2/pokemon/3/"},{"name":"charmander","url":"https://pokeapi.co/api/v2/pokemon/4/"},{"name":"charmeleon","url":"https://pokeapi.co/api/v2/pokemon/5/"},{"name":"charizard","url":"https://pokeapi.co/api/v2/pokemon/6/"},{"name":"squirtle","url":"https://pokeapi.co/api/v2/pokemon/7/"},{"name":"wartortle","url":"https://pokeapi.co/api/v2/pokemon/8/"},{"name":"blastoise","url":"https://pokeapi.co/api/v2/pokemon/9/"},{"name":"caterpie","url":"https://pokeapi.co/api/v2/pokemon/10/"},{"name":"metapod","url":"https://pokeapi.co/api/v2/pokemon/11/"},{"name":"butterfree","url":"https://pokeapi.co/api/v2/pokemon/12/"},{"name":"weedle","url":"https://pokeapi.co/api/v2/pokemon/13/"},{"name":"kakuna","url":"https://pokeapi.co/api/v2/pokemon/14/"},{"name":"beedrill","url":"https://pokeapi.co/api/v2/pokemon/15/"},{"name":"pidgey","url":"https://pokeapi.co/api/v2/pokemon/16/"},{"name":"pidgeotto","url":"https://pokeapi.co/api/v2/pokemon/17/"},{"name":"pidgeot","url":"https://pokeapi.co/api/v2/pokemon/18/"},{"name":"rattata","url":"https://pokeapi.co/api/v2/pokemon/19/"},{"name":"raticate","url":"https://pokeapi.co/api/v2/pokemon/20/"}]}
```

[swr](https://swr.vercel.app) をインストールする

```bash
npm install swr
```

今回は [swr](https://swr.vercel.app) の `useSWR` Hooks を利用してデータをフェッチする

```tsx
const { data, error } = useSWR(`https://pokeapi.co/api/v2/pokemon?limit=200&offset=200`)
```

このポイントとして読み込みに成功した場合はもちろん、読み込み中や読み込みに失敗した場合の挙動を容易に書けることが挙げられる

```tsx
{/*読み込み中*/}
if (!data) return <div>Loading..</div>

{/*読み込みに失敗した*/}
if (error) return <div>Failed</div>

{/*読み込みに成功した*/}
return (
    <React.Fragment>
        {data.results.map((pokemon: { name: string; url: string }) => (
            <div key={pokemon.name}>
                {pokemon.name}
            </div>
        ))}
    </React.Fragment>
)
```

ポケモンの名前が表示されたことを確認できれば OK

## コンポーネント設計

一つひとつのポケモンをその画像も合わせて表示したい

```tsx
return (
    <React.Fragment>
        {data.results.map((pokemon: { name: string; url: string }) => (
            <div key={pokemon.name}>
                <a
                    href={`https://www.pokemon.com/us/pokedex/${props.pokemon.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        alt={`${props.pokemon.name} image`}
                        src={`https://img.pokemondb.net/artwork/large/${props.pokemon.name}.jpg`}
                    />
                    <div>
                        {props.pokemon.name}
                    </div>
                </a>
            </div>
        ))}
    </React.Fragment>
)
```

一つのコンポーネントでも問題は無いが、それを肥大化させ過ぎてもコード全体の見通しが悪くなるばかり

```tsx
export const Card = (props: { pokemon: { name: string; url: string } }) => {
    return (
        <a
            href={`https://www.pokemon.com/us/pokedex/${props.pokemon.name}`}
            target="_blank"
            rel="noopener noreferrer"
        >
            <img
                alt={`${props.pokemon.name} image`}
                src={`https://img.pokemondb.net/artwork/large/${props.pokemon.name}.jpg`}
            />
            <div>
                {props.pokemon.name}
            </div>
        </a>
    )
}
```

作った Card コンポーネントを読み込む

```tsx
import { Card } from './components/Card'
```

props に `pokemon` を渡す

```tsx
return (
    <React.Fragment>
        {data.results.map((pokemon: { name: string; url: string }) => (
            <div key={pokemon.name}>
                <Card pokemon={pokemon} />
            </div>
        ))}
    </React.Fragment>
)
```

## 検索する

状態管理の手段に Hooks API のひとつ `useState` を利用して、親コンポーネント側 `searchText` という名目で検索ワードを保持する

```tsx
const [searchText, setSearchText] = React.useState<string>('')

return (
    <Search text={searchText} setText={handleInputClick} />
)
```

Input フォームを作成する

今回 [nekohack-ui](https://github.com/jiyuujin/nekohack-ui) を利用したが、フォーム Input を作ることができれば何でも良い

```tsx
import { NekoInput } from 'nekohack-ui'

export const Search = (props: { text: string; setText: Function }) => {
    return (
        <NekoInput
            value={props.text}
            placeholder="検索してください"
            onChange={props.setText}
        />
    )
}
```

作成した Search コンポーネントを読み込む

保持した `searchText` をリストの結果に反映させるため Hooks API のひとつ `useMemo` で再描画する

```tsx
import { Card } from './Card'

export const CardList = (props: { data: Array<{ name: string; url: string }>; search: string }) => {
    const pokemonData = React.useMemo(() => {
        if (props.search) {
            return props.data.filter(
                (pokemon: { name: string; url: string }) =>
                    pokemon.name.indexOf(props.search) !== -1
            )
        }
        return props.data
    }, [props])

    return (
        <>
            {pokemonData?.map((pokemon: { name: string; url: string }) => (
                <div key={pokemon.name}>
                    <Card pokemon={pokemon} />
                </div>
            ))}
        </>
    )
}
```

検索ワードと合わせて親コンポーネント側で呼び出せば良い

```tsx
const { data, error } = useSWR(`https://pokeapi.co/api/v2/pokemon?limit=200&offset=200`)
const [searchText, setSearchText] = React.useState<string>('')

return (
    <CardList data={data.results} search={searchText} />
)
```

## 参照リポジトリ

- [https://github.com/jiyuujin/pokemon](https://github.com/jiyuujin/pokemon)
- [https://github.com/nekohack-oss/cra-app](https://github.com/nekohack-oss/cra-app)

### 補足

React を書く際なぜ関数コンポーネントを使うべきか、また今回扱わなかった `useEffect` についても書かせていただいた。

下記アンサー記事も合わせてチェックいただければ幸いです。

[アンサー記事 - ポケモンと共に React を学ぶ](https://webneko.dev/posts/the-answer-to-react-beginners-with-pokemon)
