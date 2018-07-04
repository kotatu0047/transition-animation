### プロジェクトの作成
特にwebpack.config.js等で特殊なことをする訳ではないので、環境構築は  [Create React App](https://github.com/facebookincubator/create-react-app)に丸投げします。

```sh
    $ create-react-app transition-animation
    $ cd transition-animation
```

とりあえずテスト用の環境が作成されます

### 必要なモジュールのインストール
ルーティング兼ヒストリーAPI操作用の `react-router-dom` と、アニメーション用に `react-transition-group` を使用するのでインストール

```sh
    $ sudo yarn add react-transition-group react-router-dom
```
