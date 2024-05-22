import React from 'react'
import { Link } from 'react-router-dom'

const Books_Button = () => {
    return (
        <span id="header_books">
            <Link to="/books">
                <button type="button" id='books_button'>Książki</button>
            </Link>
        </span>
    )
}

export default Books_Button