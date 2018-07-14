import React from 'react';
import MenuBar from './MenuBar'
import {BrowserRouter as Router, Link, Route, Switch, withRouter} from 'react-router-dom';
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import './animation.css'

const topPage = () => <div><h1>Top Page</h1>ここがトップページです</div>
const page1 = () => <div><h1>page1</h1>1枚目のページです</div>
const page2 = () => <div><h1>page2</h1>2枚目のページです</div>
const page3 = () => <div><h1>page3</h1>3枚目のページです</div>
const page404 = () => <div><h1>404</h1>存在しないページです</div>

const Menu =  ({ location }) => {
    const currentkey = location.pathname.split("/")[1] || ""

    return (
        <MenuBar>
            {/*<div style={{width: '500px', textAlign: 'left'}}>*/}
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
            {/*</div>*/}
        </MenuBar>)
}

export default withRouter(Menu)