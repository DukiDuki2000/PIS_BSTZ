import React from 'react'
import { Link } from 'react-router-dom'

const Sign_Up_Button = () => {
    return (
            <Link to="/register">
                <button type="button" className='sign-up-form-btn' style={{ textDecoration: 'none' }} >Sign Up</button>
            </Link>
    )
}

export default Sign_Up_Button