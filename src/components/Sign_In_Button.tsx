import React from 'react'
import { Link } from 'react-router-dom'

const Sign_In_Button = () => {
    return (
        <span id="header_sign_in">
            <Link to="/sign-in">
                <button type="button" id='sign_in_button'>Sign in</button>
            </Link>
        </span>
    )
}

export default Sign_In_Button