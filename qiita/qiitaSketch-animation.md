### 結論

とりあえずそれっぽい動きができた。

ここに動画

この記事は[react-router-dom v4 入門してみた](https://qiita.com/acl/items/81253b54b6b6713e1332)の続きになります。

### react-transition-group　のインストール

アニメーション用のライブラリ、 `react-transition-group` をインストールします。

```sh
   sudo yarn add react-transition-group
```

それではMenu.jsを編集して、画面切り替え時にアニメーションが挿入されるようにしましょう。

```js
import React from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import {TransitionGroup, CSSTransition} from 'react-transition-group'

const topPage = () => <div><h1>Top Page</h1>ここがトップページです</div>
const page1 = () => <div><h1>page1</h1>1枚目のページです</div>
const page2 = () => <div><h1>page2</h1>2枚目のページです</div>
const page3 = () => <div><h1>page3</h1>3枚目のページです</div>
const page404 = () => <div><h1>404</h1>存在しないページです</div>

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

                {/*TransitionGroup と CSSTransition を追加*/}
                <TransitionGroup>
                    <CSSTransition classNmaes='fade' timeout={500}>
                        <div style={{marginLeft: '50px'}}>
                            <Switch>
                                <Route path='/' exact component={topPage}/>
                                <Route path='/page1' exact component={page1}/>
                                <Route path='/page2' exact component={page2}/>
                                <Route path='/page3' exact component={page3}/>
                                <Route exact component={page404}/>
                            </Switch>
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            </div>
        </Router>)
}

export default Menu
```

ページ全体が `CSSTransition`と `TransitionGroup`でラップされています。`CSSTransition`は、classNmaesを指定することで、子コンポーネントに自動的にクラス名をセットしてくれるコンポーネントです。 セットされるクラス名は次の通りです。

| クラス名がセットされるタイミング | セットされるクラス名                          |
| ---------------- | ----------------------------------- |
| 追加時              | classNmaes +   "-enter"             |
| 追加開始             | classNmaes +   "-enter-active"      |
| 追加完了             | classNmaes +   "-enter-active-done" |
| 削除時              | classNmaes +   "-exit"              |
| 削除開始             | classNmaes +   "-exit-active"       |
| 削除完了             | classNmaes +   "-exit-active-done"  |
| マウント時            | classNmaes +   "-appear"            |
| マウント開始           | classNmaes +   "-appear-active"     |

#### 参考

-   [【React】react-transition-groupを使ってCSSのアニメーションを実装する](http://hydro-pump.hatenablog.com/entry/2018/05/18/061601)

なお、追加や削除は、timeoutに指定した時間分ゆっくり行われます。

`TransitionGroup`は、子コンポーネントの中でマウント-アンマウントや削除、追加が行われていないかをtrackingし、発見した場合、`CSSTransition`の機能を適用する役割をここでは持ちます。

### CSSの定義

`CSSTransition`によって指定されるスタイルの中身を定義していきます。アニメーションさせたいプロパティに対して、　**transition** プロパティを定義していきます。

Menu.jsと同じディレクトリにanimation.cssを作成します。

```css
.fade-enter {
    opacity: 0;
}
.fade-enter-active {
    transition: opacity 500ms linear;
    opacity: 1;
}
.fade-exit {
    transition: opacity 500ms linear;
    opacity: 1;
}
.fade-exit-active {
    opacity: 0;
}
```

上記のCSSでは、DOMが追加(fade-enter-active)のとき、透過度を100%にした状態で追加され、500msかけて、透過度0%(fade-enter)になりフェードインする記述になっています。
なお今回は、classNmaesに"fade"を指定したので、`CSSTransition`が付けてくれるクラス名は、"fade"+ "-enter"や、"fade" + "-enter-active"等になります。

記述したCSSを読み込む記述をします。

```js
import './animation.css'
```

ここまでの書いたコードを実行しても、ページが一瞬で遷移してしまいます。これあくまで私の予測なのですが、`TransitionGroup`が、ページのマウント/アンマウントをtrackingできていないのではないかと思っています。

### withRouterで、アニメーションのトリガーを作る

`react-router-dom v4`には、`withRouter`というコンポーネントがあります。これで囲ったコンポーネントには、遷移時にlocationオブジェクトを引数に渡してくれるので、これを使用して、遷移時に`CSSTransition` のkeyを変更することで、アニメーション開始のトリガーとします。

アニメーションのトリガーを作る前に、メニューボタンを配置している部分を独立させて、`prps.children`を描写させるようにします。どうも、こうしないと上手く動かいみたいです。理由は…よく分かりませんでした(´；ω；｀)

```js
import React from 'react';
import {Link, Route, Switch, withRouter} from 'react-router-dom';
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import './animation.css'

const liStyle = {
    display: 'inline',
    width: '100px'
}

const MenuBar = ({children ,style}) => (　　
    <div style={style}>
        <div>
            <ul style={{display: 'flex'}}>
                <li style={liStyle}><Link to='/'>top</Link></li>
                <li style={liStyle}><Link to='/page1'>page1</Link></li>
                <li style={liStyle}><Link to='/page2'>page2</Link></li>
                <li style={liStyle}><Link to='/page3'>page3</Link></li>
            </ul>
            {children} 
        </div>
    </div>
)

const topPage = () => <div><h1>Top Page</h1>ここがトップページです</div>
const page1 = () => <div><h1>page1</h1>1枚目のページです</div>
const page2 = () => <div><h1>page2</h1>2枚目のページです</div>
const page3 = () => <div><h1>page3</h1>3枚目のページです</div>
const page404 = () => <div><h1>404</h1>存在しないページです</div>


const Menu =  ({ location }) => {
    const currentkey = location.pathname.split("/")[1] || ""

    return (
        <MenuBar style={{width: '500px', textAlign: 'left'}}>
            <TransitionGroup>
                <CSSTransition key={currentkey} classNames='fade' timeout={500}>
                    <div style={{marginLeft: '50px'}}>
                        <Switch>
                            <Route path='/' exact component={topPage}/>
                            <Route path='/page1' exact component={page1}/>
                            <Route path='/page2' exact component={page2}/>
                            <Route path='/page3' exact component={page3}/>
                            <Route exact component={page404}/>
                        </Switch>
                    </div>
                </CSSTransition>
            </TransitionGroup>
        </MenuBar>)
}

export default withRouter(Menu)
```

```js
import React, {Component} from 'react';
import './App.css';
import Menu from "./Menu";
import { BrowserRouter  as Router } from "react-router-dom";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>  //  <= withRouter 自身をRouterで囲むのを忘れないで下さい
                    <Menu />
                </Router>
            </div>
        );
    }
}

export default App;
```

#### 予防線

この記事を書くにあたり、aclは公式のドキュメントを何回か読み返しましたが、未だに自分でもいまいち理解できないまま、『とりあえず成功したコードがあるから』という軽い気持ちでこの記事を作ってしまたので、もしかしたらどこか間違いがあるかもしれません。

#### 参考

-   <https://github.com/reactjs/react-transition-group/issues/136>
