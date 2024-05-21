import React, { PureComponent, useState } from 'react'
import * as PiIcons from 'react-icons/pi'
import { Link } from 'react-router-dom'

function Navbar() {

    const [sidebar, setSidebar] = useState(false)

    const showSidebar = () => setSidebar(!sidebar)

    return (
        <>
            <div className="navbar">
                <Link to="#" className='menu-bars'>
                    <PiIcons.PiList onClick={showSidebar} />
                </Link>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className="nav-menu-items">
                    <li className="navbar-toggle">
                        <Link to='#' className='menu-bars'>
                            <PiIcons.PiXBold />
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar