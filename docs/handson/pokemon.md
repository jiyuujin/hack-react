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
    "eslint.autoFixOnSave": true,
    "eslint.options": {
        "configFile": "./.eslintrc.js"
    },
    "eslint.validate": [
        "javascript",
        {
            "language": "typescript",
            "autoFix": true
        }
    ]
}
```

![](https://i.imgur.com/YXrogHY.jpg)

ファイルを保存する際に ESLint ルールを自動的に適用できる

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

今回は [swr](https://swr.vercel.app) の `useSWR` hooks を利用してデータをフェッチする

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

## 参照リポジトリ

- [https://github.com/jiyuujin/pokemon](https://github.com/jiyuujin/pokemon)
- [https://github.com/nekohack-oss/cra-app](https://github.com/nekohack-oss/cra-app)
