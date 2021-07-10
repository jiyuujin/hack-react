---
home: false
footer: Created © 2021 jiyuujin LAB. All Rights Reserved.
---

# はじめに

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

## 行動規範

[Code Of Conduct](https://github.com/nekohack/Code-of-Conduct)
