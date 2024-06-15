import React from 'react'
import * as PiIcons from 'react-icons/pi'
import Sign_In_Button from './Sign_In_Button'
import Books_Button from './Books_Button'
import About_Us_Button from './About_Us_Button'

const Header = () => {
    return (
        <header>
            <nav className='header'>
                <a href="/" id="logo">
                    <PiIcons.PiBooks id="logo_books" size={40} />
                    <span id="logo_text">Galaktyczne Lektury</span>
                    <PiIcons.PiShootingStar id="logo_star" size={40} />
                </a>
                <Books_Button />
                <About_Us_Button />
                <Sign_In_Button />
            </nav>
        </header>
    )
}

export default Header