import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
    return (
        <div className='page_content'>
            <div className="sign-form">
                <form>
                    <h1>Sign up:</h1>
                    <span className="sign-form-label">Username:</span>
                    <div className="input-box">
                        <input type="text" placeholder='Username' required />
                    </div>
                    <span className="sign-form-label">Password:</span>
                    <div className="input-box">
                        <input type="password" placeholder='Password' required />
                    </div>
                    <span className="sign-form-label">E-mail address:</span>
                    <div className="input-box">
                        <input type="text" placeholder='E-mail address' required />
                    </div>
                    <span className="sign-form-label">First name:</span>
                    <div className="input-box">
                        <input type="text" placeholder='First name' required />
                    </div>
                    <span className="sign-form-label">Last name:</span>
                    <div className="input-box">
                        <input type="text" placeholder='Last name' required />
                    </div>
                    <span className="sign-form-label">Phone number:</span>
                    <div className="input-box">
                        <input type="text" placeholder='Phone number' required />
                    </div>
                    <br />
                    <button type="submit" className='sign-form-btn'>Sign Up</button>
                </form>
            </div>
        </div >
    )
}

export default Register