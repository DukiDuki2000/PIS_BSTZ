import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Go_back from '../components/Go_back';

function Books() {
    const [books, setBooks] = useState([]);
    const [sortBy, setSortBy] = useState<string>('title'); // Domyślnie pusty string
    const [sortOrder, setSortOrder] = useState<string>('asc'); // Domyślnie 'asc'

    const fetchBooks = async () => {
        try {
            const params: { sortBy?: string, sortOrder?: string } = {};
            if (sortBy) {
                params.sortBy = sortBy;
                params.sortOrder = sortOrder;
            }
            const { data } = await axios.get('http://localhost:9002/book/all', { params });
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

    const handleDeleteBook = async (id: string) => {
        if (window.confirm('Czy na pewno chcesz usunąć tę książkę?')) {
            try {
                await axios.delete(`http://localhost:9002/book/all/delete/${id}`);
                // Po usunięciu książki, ponownie pobierz listę książek
                fetchBooks();
            } catch (error) {
                console.error('There was an error deleting the book!', error);
            }
        }
    };

    return (
        <div className='page_content'>
            <div className='button_bar'>
                <Go_back />
            </div>
            <div className='books_container'>
                <div className='sort_controls'>
                    <div className='sort_by'>
                        <label>
                            Sortuj według: 
                            <select value={sortBy} onChange={handleSortByChange}>
                                <option value='title'>Tytuł</option>
                            </select>
                        </label>
                    </div>
                    <div className='sort_order'>
                        <label>
                            Kierunek sortowania:    
                            <select value={sortOrder} onChange={handleSortOrderChange}>
                                <option value='asc'>Rosnąco</option>
                                <option value='desc'>Malejąco</option>
                            </select>
                        </label>
                    </div>
                </div>
                <div className='books_grid'>
                    {books.map(({ id, title, author, category, status }) => (
                        <div key={id} className='book_tile'>
                            <h3>{title}</h3>
                            <p><strong>Author:</strong> {author}</p>
                            <p><strong>Category:</strong> {category}</p>
                            <Link to={`/edit_book/${id}`} className="edit_button">
                                <button>Edytuj</button>
                            </Link>
                            <button onClick={() => handleDeleteBook(id)} className="delete_button">
                                Usuń
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
    );
}

export default Books;
