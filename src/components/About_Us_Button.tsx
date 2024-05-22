import React from 'react'
import { Link } from 'react-router-dom'

const About_Us_Button = () => {
    return (
        <span id="header_about_us">
            <Link to="/about_us">
                <button type="button" id='about_us_button'>About Us</button>
            </Link>
        </span>
    )
}

export default About_Us_Button