import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { useUser } from "../components/UserContext"; // Importuj kontekst użytkownika

function BorrowedBooks() {
    const [books, setBooks] = useState([]);
    const [sortBy, setSortBy] = useState<string>('title'); // Domyślnie 'title'
    const [sortOrder, setSortOrder] = useState<string>('asc'); // Domyślnie 'asc'
    const { user } = useUser(); // Użyj kontekstu użytkownika

    const fetchBorrowedBooks = async () => {
        if (!user) {
            return;
        }
        
        try {
            const params: { sortBy?: string, sortOrder?: string } = {};
            if (sortBy) {
                params.sortBy = sortBy;
                params.sortOrder = sortOrder;
            }
            const { data } = await axios.get(`http://localhost:7788/users/${user.id}/borrowed-books`, { 
                params,
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            });
            setBooks(data);
        } catch (error) {
            console.error('There was an error fetching the borrowed books!', error);
        }
    };

    useEffect(() => {
        fetchBorrowedBooks();
    }, [sortBy, sortOrder, user]);

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

export default BorrowedBooks;
