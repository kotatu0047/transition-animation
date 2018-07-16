import React from 'react';
import {Link, Route, Switch, withRouter} from 'react-router-dom';
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import './animation.css'

const liStyle = {
    display: 'inline',
    width: '100px'
}

const MenuBar = ({children, style}) => (
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

const Menu = ({location}) => {
    const currentkey = location.pathname.split("/")[1] || ""

    return (
        <MenuBar style={{width: '500px', textAlign: 'left'}}>
            <TransitionGroup >
                <CSSTransition key={currentkey} classNames='fade' timeout={800} >
                    <div style={{marginLeft: '50px', position: 'absolute'}}>
                        <Switch location={location}>
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