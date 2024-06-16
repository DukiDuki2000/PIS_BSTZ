import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import SearchBar from "../components/SearchBar";
import { useUser } from "../components/UserContext"; // Importuj kontekst użytkownika

function Books() {
    const [books, setBooks] = useState([]);
    const [sortBy, setSortBy] = useState<string>('title'); // Domyślnie 'title'
    const [sortOrder, setSortOrder] = useState<string>('asc'); // Domyślnie 'asc'
    const { user } = useUser(); // Użyj kontekstu użytkownika

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

    const handleBorrowBook = async (id: string) => {
        if (!user) {
            alert('Musisz być zalogowany, aby wypożyczyć książkę.');
            return;
        }

        try {
            await axios.post(
                `http://localhost:7788/books/${id}/borrow`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`, // Przykład dodania tokenu w nagłówku
                    },
                }
            );
            alert(`Book with id ${id} borrowed successfully.`);
            fetchBooks(); // Aktualizacja listy książek po wypożyczeniu
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
                {books.map(({ id, title, authorName, authorSurname, category, availability }) => (
                    <div key={id} className='book_tile'>
                        <h3>{title}</h3>
                        <p><strong>Author:</strong> {authorName} {authorSurname}</p>
                        <p><strong>Category:</strong> {category}</p>
                        <button 
                            onClick={() => handleBorrowBook(id)} 
                            disabled={availability <= 0}
                        >
                            {availability > 0 ? 'Wypożycz' : 'Niedostępna'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Books;
