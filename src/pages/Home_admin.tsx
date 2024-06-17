import React from 'react';
import { Link } from 'react-router-dom';

const Home_admin = () => {
    return (
        <div className='page_container'>
            <div className='text_container'>
                <h1>Galaktyczne lektury!</h1>
                <p>System administracyjny - Galaktyczne Lektury</p>
            </div>
            <div className="tile_container">
                <Link to='/edit_book_selection' className='tile'>
                    <div className="tile_content">
                        <h2>Lista książek + edycja</h2>
                    </div>
                </Link>
                <Link to='/add_book' className='tile'>
                    <div className="tile_content">
                        <h2>Dodawanie książek</h2>
                    </div>
                </Link>
            </div>   
        </div>
    );
}

export default Home_admin;
