import React, { useState, FormEvent, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import Go_back from '../components/Go_back'

interface Book {
    id: string;
    title: string;
}

function BorrowBook() {
    const [cardNumber, setCardNumber] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [availableBooks, setAvailableBooks] = useState<Book[]>([]);
    const [selectedBook, setSelectedBook] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleCardNumberChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const cardNumber = event.target.value;
        setCardNumber(cardNumber);

        if (cardNumber.length === 10) { // Assuming card number length is 10
            try {
                const response = await axios.get(`http://localhost:7788/user/${cardNumber}`);
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
    };

    useEffect(() => {
        const fetchAvailableBooks = async () => {
            try {
                const response = await axios.get('http://localhost:7788/books');
                setAvailableBooks(response.data);
            } catch (error) {
                console.error('Error fetching available books:', error);
            }
        };

        fetchAvailableBooks();
    }, []);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setSubmitting(true);
        try {
            await axios.post('http://localhost:7788/borrow', {
                card_number: cardNumber,
                book_id: selectedBook,
            });
            setCardNumber('');
            setFirstName('');
            setLastName('');
            setSelectedBook('');
        } catch (error) {
            console.error('Error borrowing book:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="add_content">
            <div className='button_bar'>
                <Go_back />
            </div>
            <form onSubmit={handleSubmit} className="form_container">
                <h2>Wypożyczenie książki</h2>
                <div className="form_group">
                    <label htmlFor="cardNumber">Numer karty bibliotecznej</label>
                    <input
                        type="text"
                        id="cardNumber"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        required
                    />
                </div>
                <div className="form_group">
                    <label htmlFor="firstName">Imię</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        readOnly
                    />
                </div>
                <div className="form_group">
                    <label htmlFor="lastName">Nazwisko</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        readOnly
                    />
                </div>
                <div className="form_group">
                    <label htmlFor="selectedBook">Wybierz książkę</label>
                    <select
                        id="selectedBook"
                        value={selectedBook}
                        onChange={(e) => setSelectedBook(e.target.value)}
                        required
                    >
                        <option value="">Wybierz książkę</option>
                        {availableBooks.map((book) => (
                            <option key={book.id} value={book.id}>{book.title}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" disabled={submitting}>
                    {submitting ? 'Wypożyczanie...' : 'Wypożycz książkę'}
                </button>
            </form>
        </div>
    );
}

export default BorrowBook;
