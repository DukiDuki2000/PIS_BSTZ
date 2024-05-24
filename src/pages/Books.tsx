import React, { useState, useEffect } from 'react';
import axios from "axios";

function Books() {
    const [books, setBooks] = useState([]);

    const fetchBooks = async () => {
        try {
            const { data } = await axios.get('http://localhost:7788/books');
            setBooks(data);
        } catch (error) {
            console.error('There was an error fetching the books!', error);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <div className='page_content'>
            <div className='books_grid'>
                {books.map(({ id, title, authorName, authorSurname, category }) => (
                    <div key={id} className='book_tile'>
                        <h3>{title}</h3>
                        <p><strong>Author:</strong> {authorName} {authorSurname}</p>
                        <p><strong>Category:</strong> {category}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Books;
