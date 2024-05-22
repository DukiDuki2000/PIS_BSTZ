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
            <ul>
                {books.map(({ id, title, author_name, author_surname, category }) => (
                    <li key={id}>
                        <p>Title: {title}</p>
                        <p>Author name: {author_name}</p>
                        <p>Author surname: {author_surname}</p>
                        <p>Category: {category}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Books;
