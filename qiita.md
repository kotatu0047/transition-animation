### 結論
とりあえずそれっぽい動きができた

プロジェクトの作成から`react-router-dom`の使い方まで順を追って説明するので、アニメーションのとこだけ見たいってひとは　　まで飛ばしてつかぁさい

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

元々あったApp.jsの中のコンテンツは不要なので消しておきましょう

```js : App.js
```js
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      {/*この中にあったものを削除*/}
     </div>
    );
  }
}

  export default App;
```

### メニュー画面の作成
App.jsがあった場所と同じディレクトリに、Menu.jsを作成します。一先ず雛形だけ作成します。

```js : Menu.js
```js
import React from "react";

const Menu = () => {
    const liStyle = {
        display: 'inline-block',
        width: '100px'
    }

    return(<div >
        <ul>
            <li style={liStyle}>page1</li>
            <li style={liStyle}>page2</li>
            <li style={liStyle}>page3</li>
        </ul>
    </div>)
}

export default  Menu
```

作成したメニュー画面を、さっきのApp.jsで読み込みます
```js : App.js
```js
import React, { Component } from 'react';
import './App.css';
import Menu from "./Menu";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Menu/>
      </div>
    );
  }
}

  export default App;
```

サーバーを起動すると、以下のような画面が表示されます
```sh
    $ npm run start
```

ここから、`react-router-dom`を使用して、 『top page1 page2 page3 』 をクリックした時に、画面遷移が発生するようにしていきます。
