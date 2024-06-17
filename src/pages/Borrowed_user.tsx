import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { useUser } from "../components/UserContext"; 

function BorrowedBooks() {
    const [books, setBooks] = useState([]);
    const [sortBy, setSortBy] = useState<string>('title'); 
    const [sortOrder, setSortOrder] = useState<string>('asc'); 
    const { user } = useUser(); 

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
            const { data } = await axios.get(`http://localhost:9000/loan/${user.id}`, { 
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
                {books.map(({ id, title, author, category }) => (
                    <div key={id} className='book_tile'>
                        <h3>{title}</h3>
                        <p><strong>Author:</strong> {author} </p>
                        <p><strong>Category:</strong> {category}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BorrowedBooks;
