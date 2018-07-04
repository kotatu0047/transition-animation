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