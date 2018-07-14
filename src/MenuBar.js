import React from 'react'
import {Link} from 'react-router-dom'

const liStyle = {
    display: 'inline',
    width: '100px'
}

const MenuBar = ({children}) => (
    <div>
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

export default MenuBar