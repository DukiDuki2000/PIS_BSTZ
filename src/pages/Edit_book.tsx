import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface Book {
    id: string;
    title: string;
    authorName: string;
    authorSurname: string;
    category: string;
}

const EditBook: React.FC = () => {
    const { bookId } = useParams<{ bookId: string }>();
    const [book, setBook] = useState<Book>({
        id: '',
        title: '',
        authorName: '',
        authorSurname: '',
        category: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://localhost:7788/book/${bookId}`);
                const bookData: Book = response.data;
                setBook(bookData);
                setIsLoading(false);
            } catch (err) {
                setError(err as Error);
                setIsLoading(false);
            }
        };
        fetchBook();
    }, [bookId]);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:7788/book/edit/${bookId}`, {
                title: book.title,
                authorName: book.authorName,
                authorSurname: book.authorSurname,
                category: book.category
            });
            alert('Book updated successfully');
        } catch (error) {
            console.error('There was an error updating the book!', error);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBook((prevBook) => ({
            ...prevBook,
            [name]: value
        }));
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading book data: {error.message}</div>;
    }

    return (
        <div className='add_content'>
            <div className="form_group">
                <title>Edycja informacji</title>
            </div>
            <form onSubmit={handleSubmit} className="form_container">
                <div className='form_group'>
                    <label>Tytuł</label>
                    <input
                        type="text"
                        name="title"
                        value={book.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='form_group'>
                    <label>Imię autora</label>
                    <input
                        type="text"
                        name="authorName"
                        value={book.authorName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='form_group'>
                    <label>Nazwisko autora</label>
                    <input
                        type="text"
                        name="authorSurname"
                        value={book.authorSurname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='form_group'>
                    <label>Kategoria</label>
                    <input
                        type="text"
                        name="category"
                        value={book.category}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Zaktualizuj</button>
            </form>
        </div>
    );
};

export default EditBook;
