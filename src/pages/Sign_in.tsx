import React from 'react'
import { Link } from 'react-router-dom'
import Sign_Up_Button from '../components/Sign_Up_Button';

const SignIn = () => {
    return (
        <div className='page_content'>
            <div className="sign-form">
                <form>
                    <h1>Sign in:</h1>
                    <span className="sign-form-label">Username:</span>
                    <div className="input-box">
                        <input type="text" placeholder='Username' required />
                    </div>
                    <span className="sign-form-label">Password:</span>
                    <div className="input-box">
                        <input type="password" placeholder='Password' required />
                    </div>
                    <br />
                    <button type="submit" className='sign-form-btn'>Sign In</button>
                </form>
                <h1>Don't have account?</h1>
                <div>
                    <Sign_Up_Button />
                </div>
            </div>
        </div >
    );
};

export default SignIn;