import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';

function Books() {
    const [books, setBooks] = useState([]);
    const [sortBy, setSortBy] = useState<string>(''); // Domyślnie pusty string
    const [sortOrder, setSortOrder] = useState<string>('asc'); // Domyślnie 'asc'

    const fetchBooks = async () => {
        try {
            const params: { sortBy?: string, sortOrder?: string } = {};
            if (sortBy) {
                params.sortBy = sortBy;
                params.sortOrder = sortOrder;
            }
            const { data } = await axios.get('http://localhost:7788/books', { params });
            setBooks(data);
        } catch (error) {
            console.error('There was an error fetching the books!', error);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, [sortBy, sortOrder]);

    const handleSortByChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSortBy(event.target.value);
    };

    const handleSortOrderChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSortOrder(event.target.value);
    };

    return (
        <div className='page_content'>
            <div className='sort_controls'>
                <label>
                    Sortuj według:
                    <select value={sortBy} onChange={handleSortByChange}>
                        <option value='title'>Tytuł</option>
                        <option value='authorName'>Imię autora</option>
                        <option value='authorSurname'>Nazwisko autora</option>
                        <option value='category'>Kategoria</option>
                    </select>
                </label>
                <label>
                    Kierunek sortowania:
                    <select value={sortOrder} onChange={handleSortOrderChange}>
                        <option value='asc'>Rosnąco</option>
                        <option value='desc'>Malejąco</option>
                    </select>
                </label>
            </div>
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
