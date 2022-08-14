# ユニットテスト

<HistoryTags :tags="['TypeScript', 'Jest', 'Vitest', 'Mocha', 'Jasmine']" />

フロントエンドには主に 4 点のユニットテストが存在する。

- [Jest](https://jestjs.io)
- [Vitest](https://vitest.dev/)
- [Mocha](https://mochajs.org)
- [Jasmine](https://jasmine.github.io)

npm trends で見てもらっても明らかだが、最近は [Jest](https://jestjs.io) を採用しているプロジェクトが多い。さらに [Vitest](https://vitest.dev/) に注目している方も多い。

- [npm trends - `jasmine` vs `jest` vs `mocha`](https://www.npmtrends.com/jest-vs-mocha-vs-jasmine)
- [npm trends - `jasmine` vs `jest` vs `mocha` vs `vitest`](https://npmtrends.com/jasmine-vs-jest-vs-mocha-vs-vitest)

そこで今回、まずは [Jest](https://jestjs.io) に焦点を当てる。

::: tip Jest の手引き
[Pokemon アプリ (CRA)](https://github.com/jiyuujin/pokemon) や [Pokemon アプリ (Vite)](https://github.com/jiyuujin/pokemon-vite) のユニットテストを書いていくことを目指す。

それに向けてまずは Jest 単体でその挙動を確認しつつ、下記のように段階を踏んで進めることとする。

- Jest 単体でその挙動を確認する
- React に Jest を組み込んでその挙動を確認する
:::

## 執筆済みの教材

TBD

## テスト課題

- 母音を抽出する
- 税込価格を算出する
- 非同期コードを検証する
- snapshot を撮影する

## 参照リポジトリ

Jest については、主に下記リポジトリで作業を進めている。

- [https://github.com/jiyuujin/frontend-tests/tree/master/tests/jest](https://github.com/jiyuujin/frontend-tests/tree/master/tests/jest)
- [https://github.com/jiyuujin/pokemon](https://github.com/jiyuujin/pokemon)

また Vitest については、主に下記リポジトリで作業を進めている。

- [https://github.com/jiyuujin/frontend-tests/tree/master/tests/vitest](https://github.com/jiyuujin/frontend-tests/tree/master/tests/vitest)
- [https://github.com/jiyuujin/pokemon-vite](https://github.com/jiyuujin/pokemon-vite)

他 Jasmine や Mocha についてもご確認いただければ幸いです。

- [https://github.com/jiyuujin/frontend-tests/tree/master/tests/jasmine](https://github.com/jiyuujin/frontend-tests/tree/master/tests/jasmine)
- [https://github.com/jiyuujin/frontend-tests/tree/master/tests/mocha](https://github.com/jiyuujin/frontend-tests/tree/master/tests/mocha)
