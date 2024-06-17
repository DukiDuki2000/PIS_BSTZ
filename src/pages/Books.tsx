import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import SearchBar from "../components/SearchBar";
import { useUser } from "../components/UserContext"; 
import BookStatus from "../components/BookStatus";
import BookCategory from '../components/BookCategory'; // Import the BookCategory enum

function Books() {
    const [books, setBooks] = useState([]);
    const [sortBy, setSortBy] = useState<string>('title');
    const [sortOrder, setSortOrder] = useState<string>('asc');
    const { user } = useUser();

    const fetchBooks = async () => {
        try {
            const params: { sortBy?: string, sortOrder?: string } = {};
            if (sortBy) {
                params.sortBy = sortBy;
                params.sortOrder = sortOrder;
            }
            const { data } = await axios.get('http://localhost:9002/books', { params });
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

    const handleBorrowBook = async (id: string) => {
        if (!user) {
            alert('You must be logged in to borrow a book.');
            return;
        }

        try {
            await axios.post(
                `http://localhost:9002/books/${id}/borrow`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`, // Example of adding a token in the header
                    },
                }
            );
            alert(`Book with id ${id} borrowed successfully.`);
            fetchBooks();
        } catch (error) {
            console.error('There was an error borrowing the book!', error);
            alert('Failed to borrow the book.');
        }
    };

    return (
        <div className='page_content'>
            <div className='sort_controls'>
                <SearchBar />
                <label>
                    Sort by:
                    <select value={sortBy} onChange={handleSortByChange}>
                        <option value='title'>Title</option>
                        {/*<option value='category'>Category</option>*/}
                    </select>
                </label>
                <label>
                    Sort order:
                    <select value={sortOrder} onChange={handleSortOrderChange}>
                        <option value='asc'>Ascending</option>
                        <option value='desc'>Descending</option>
                    </select>
                </label>
            </div>
            <div className='books_grid'>
                {books.map(({ id, title, author, category, description, status }) => (
                    <div key={id} className='book_tile'>
                        <h3>{title}</h3>
                        <p><strong>Author:</strong> {author}</p>
                        <p><strong>Category:</strong> {BookCategory[category as keyof typeof BookCategory]}</p>
                        <button
                            onClick={() => handleBorrowBook(id)}
                            disabled={status === BookStatus.UNAVAILABLE || status === BookStatus.ORDERED || status === BookStatus.BORROWED}
                        >
                            Borrow
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Books;
