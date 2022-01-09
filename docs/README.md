---
home: false
footer: Created © 2021 jiyuujin LAB. All Rights Reserved.
---

# はじめに

## 執筆者のご紹介

<Profile image="https://pbs.twimg.com/profile_images/1154037739035119620/IX0vq03C_400x400.jpg" name="jiyuujin (Yuma Kitamura)" description="Web の改善を進めている Web デベロッパです。" />

### 詳しくは

プロフィールサイト並びに技術ブログをご確認いただければ幸いです。

- [Web Developer | Yuma Kitamura](https://yuma-kitamura.nekohack.me)
- [Web猫ブログ](https://webneko.dev)

## Node.js 環境構築

Node.js バージョン管理のため [nodenv](https://github.com/nodenv/nodenv) をインストールする

```bash
git clone https://github.com/nodenv/nodenv.git ~/.nodenv
git clone https://github.com/nodenv/node-build.git $(nodenv root)/plugins/node-build
cd ~/.nodenv && src/configure && make -C src
```

PATH を設定するため Vim に入る

```badh
sudo vi ~/.zshrc
```

下記コードを `.zshrc` へ入力する

```bash
# ~/.zshrc
export PATH="$HOME/.nodenv/bin:$PATH" >> ~/.zshrc

eval "$(nodenv init -)" >> ~/.zshrc
```

[ESC] + [:wq] を押して Vim を終了した後、保存も忘れずにやっておく

```bash
source ~/.zshrc
```

適宜バージョンを選択してインストールする、この際ターミナルのセッションを一度切ってから進めると進めやすそうです

```bash
nodenv install -l
nodenv install 14.17.0
nodenv global 14.17.0
nodenv rehash
node -v
```

## プライバシーポリシー

学習機会の場として Hack React をご利用いただき誠にありがとうございます。 Hack React はお客様のプライバシーを尊重しており、お客様のデータの収集・利用及び共有方法をお客様にご理解いただきたいと考えております。本プライバシーポリシーは nekohack 社 (以下「当社」) においてお客様のデータを収集することは一切ありません。

当社が別のポリシーにリンクするか又は別段の定めをしない限り、本プライバシーポリシーはお客様が Hack React のウェブサイト (以下「本サービス」) を利用する場合に適用されます。本サービスを利用することによりお客様は本プライバシーポリシーの条件に同意したことになります。本プライバシーポリシー又は本サービスのご利用について定めるその他の合意条件に同意いただけない場合は、本サービスのご利用をお控えください。

2021 年 7 月 23 日策定

## 行動規範

[Code Of Conduct](https://github.com/nekohack/Code-of-Conduct)
