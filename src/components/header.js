import React from 'react'

import './header.css'

const Header = (props) => {

    return (
        <div id="header" className="row align-center section-wrapper">
            <div className="app-name">SmartTemp</div>
            <div className="app-version">v{props.version}</div>
        </div>
    )

}

export default Header