import React from 'react';
import { Link } from 'react-router-dom';

const BackToHomeButton = () => {
    return (
        <Link to="/" className="back_button">
            <button>Home</button>
        </Link>
    );
}

export default BackToHomeButton;