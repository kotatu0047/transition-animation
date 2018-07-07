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

App.jsがあった場所と同じディレクトリに、Menu.jsを作成します。一先ず何の動きもないメニュー画面の雛形だけ作成します。

```js
import React from "react";

const Menu = () => {
    const liStyle = {
        display: 'inline',
        width: '100px'
    }

    return (
        <div style={{width: '500px', textAlign: 'left'}}>
            <ul style={{display: 'flex'}}>
                <li style={liStyle}>top</li>
                <li style={liStyle}>page1</li>
                <li style={liStyle}>page2</li>
                <li style={liStyle}>page3</li>
            </ul>
        </div>)
}

export default Menu
```

作成したメニュー画面を、さっきのApp.jsで読み込みます

```js
import React, { Component } from 'react';
import './App.css';
import Menu from "./Menu"; // <= 作成したメニュー画面を読み込み

class App extends Component {
  render() {
    return (
      <div className="App">
        <Menu/> //<= さっきコンテンツを削除した場所にメニュー画面を配置
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

![ひながた](https://qiita-image-store.s3.amazonaws.com/0/222400/3bac2c1b-f10e-ccfe-e125-f90c3243077c.png)

ここから、`react-router-dom`を使用して、 『top page1 page2 page3 』 をクリックした時に、画面遷移が発生するようにしていきます。

### react-router-domでルーティングさせる

react-router-domから必要なモジュールをインポートします。

```js
   import {BrowserRouter as Router, Link, Route} from "react-router-dom";
```

-   `BrowserRouter`が、画面遷移時に[ヒストリーAPI](https://developer.mozilla.org/ja/docs/Web/Guide/DOM/Manipulating_the_browser_history)に履歴情報を追加してくれるコンポーネントになります。 `Router`とエイリアスを定義されることが多いです。`BrowserRouter`の子要素に`Route`と`Link`を入れて使用します。
-   `Link` いわゆるaタグです。(というか実際aタグに変換される)クリックすると、`to`要素に指定した[localtion.pathname](https://syncer.jp/javascript-reference/location/pathname)へUrlを変更します。
-   `Route` localtion.pathnameが、`path`要素に指定したものとマッチしていた場合、`component`に渡されたReactコンポーネントを描写します。
-   基本的な使い方は、`Link`のtoと`Route`のpathを合わせて、それを`BrowseRouter`の中に入れて使う感じです。

まずは全体を`BrowseRouter`でラップ

```js
    return (
      <Router>
        <div style={{width: '500px', textAlign: 'left'}}>
            <ul style={{display: 'flex'}}>
                <li style={liStyle}>top</li>
                <li style={liStyle}>page1</li>
                <li style={liStyle}>page2</li>
                <li style={liStyle}>page3</li>
            </ul>
        </div>
      </Router>)
}
```

次に ページの中身用のコンポーネントを作成し、`Route`の `component`に渡してやります。

```js
import React from "react";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";

//ページの中身用のコンポーネントを作成
const topPage = () => <div><h1>Top Page</h1>ここがトップページです</div>
const page1 = () => <div><h1>page1</h1>1枚目のページです</div>
const page2 = () => <div><h1>page2</h1>2枚目のページです</div>
const page3 = () => <div><h1>page3</h1>3枚目のページです</div>

const Menu = () => {
    const liStyle = {
        display: 'inline',
        width: '100px'
    }

    return (
        <Router>
            <div style={{width: '500px', textAlign: 'left'}}>
                <ul style={{display: 'flex'}}>
                  <li style={liStyle}>top</li>
                  <li style={liStyle}>page1</li>
                  <li style={liStyle}>page2</li>
                  <li style={liStyle}>page3</li>
                </ul>

                //Routeaを配置 exactそ指定してマッチングを厳密に
                <div style={{marginLeft: '50px'}}>
                    <Route path='/' exact component={topPage}/>
                    <Route path='/page1' exact component={page1}/>
                    <Route path='/page2' exact component={page2}/>
                    <Route path='/page3' exact component={page3}/>
                </div>
            </div>
        </Router>)
}

export default Menu
```

最後に『top page1 page2 page3』のテキストを`Link`でラップしたものを配置して画面遷移を行う仕組みができました。

```js
import React from "react";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";

const topPage = () => <div><h1>Top Page</h1>ここがトップページです</div>
const page1 = () => <div><h1>page1</h1>1枚目のページです</div>
const page2 = () => <div><h1>page2</h1>2枚目のページです</div>
const page3 = () => <div><h1>page3</h1>3枚目のページです</div>

const Menu = () => {
    const liStyle = {
        display: 'inline',
        width: '100px'
    }

    return (
        <Router>
            <div style={{width: '500px', textAlign: 'left'}}>
                <ul style={{display: 'flex'}}>
                    <li style={liStyle}><Link to='/'>top</Link></li>
                    <li style={liStyle}><Link to='/page1'>page1</Link></li>
                    <li style={liStyle}><Link to='/page2'>page2</Link></li>
                    <li style={liStyle}><Link to='/page3'>page3</Link></li>
                </ul>

                <div style={{marginLeft: '50px'}}>
                    <Route path='/' exact component={topPage}/>
                    <Route path='/page1' exact component={page1}/>
                    <Route path='/page2' exact component={page2}/>
                    <Route path='/page3' exact component={page3}/>
                </div>
            </div>
        </Router>)
}

export default Menu
```

![リンク](https://qiita-image-store.s3.amazonaws.com/0/222400/a8f0454c-75db-ccbc-c229-8e2c2b753bab.png)
クリックすると画面が切り替わると同時に、ブラウザのurlも変わっているはずです。

### Switchでどのurlにもヒットしない場合のページを表示

`react-router-dom`には`Switch`というコンポーネントが存在します。このコンポーネントの動作は、一般的なプログラミング言語のSwitch文と似たようなもので、上から順にpathにマッチする`Route`を探して見つかればそれだけを描写します。`Route`を`switch`でラップ + 末尾にpathの指定がない`Route`を配置することで、どのurlにもヒットしない場合、任意のページを表示させることができます。

```js
import React from "react";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";

const topPage = () => <div><h1>Top Page</h1>ここがトップページです</div>
const page1 = () => <div><h1>page1</h1>1枚目のページです</div>
const page2 = () => <div><h1>page2</h1>2枚目のページです</div>
const page3 = () => <div><h1>page3</h1>3枚目のページです</div>
const page404 = () => <div><h1>404</h1>存在しないページです</div>  //<= ヒットしなかった時用のページを追加

const Menu = () => {
    const liStyle = {
        display: 'inline',
        width: '100px'
    }

    return (
        <Router>
            <div style={{width: '500px', textAlign: 'left'}}>
                <ul style={{display: 'flex'}}>
                    <li style={liStyle}><Link to='/'>top</Link></li>
                    <li style={liStyle}><Link to='/page1'>page1</Link></li>
                    <li style={liStyle}><Link to='/page2'>page2</Link></li>
                    <li style={liStyle}><Link to='/page3'>page3</Link></li>
                </ul>

                <div style={{marginLeft: '50px'}}>
                    <Switch>
                        <Route path='/' exact component={topPage}/>
                        <Route path='/page1' exact component={page1}/>
                        <Route path='/page2' exact component={page2}/>
                        <Route path='/page3' exact component={page3}/>
                        <Route exact component={page404}/> //<= 一番末尾に追加 pathの指定も、対応するLinkの追加も必要ない
                    </Switch>
                </div>
            </div>
        </Router>)
}

export default Menu
```

もちろん、

```js
<Switch>
    <Route path='/' exact component={topPage}/>
    <Route path='/page1' exact component={page1}/>
    <Route path='/page2' exact component={page2}/>
    <Route path='/page3' exact component={page3}/>
    <Route exact component={topPage}/>
</Switch>
```

のようにすれば、topPageに戻らせることも可能です。

次は画面遷移時にアニメーションを挿入する方法を解説します。
