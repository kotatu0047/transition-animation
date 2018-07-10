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

//中略

const Menu = () => {
    const liStyle = {
        display: 'inline',
        width: '100px'
    }

    return (
        <Router>
            <TransitionGroup>
                <CSSTransition classNmaes='fade' timeout={500}>
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
                                <Route exact component={page404}/>
                            </Switch>
                        </div>
                    </div>
                </CSSTransition>
            </TransitionGroup>
        </Router>)
}

export default Menu
```

#### 参考

-   <https://github.com/reactjs/react-transition-group/issues/136>
