import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import Go_back from '../components/Go_back';

function AddBook() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [isbn, setIsbn] = useState('');
    const [publisher, setPublisher] = useState('');
    const [publishedDate, setPublishedDate] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setSubmitting(true);
        try {
            await axios.post('http://localhost:9003/book/add', {
                title,
                author,
                isbn,
                publisher,
                publishedDate,
                description,
                category,
                amount: parseInt(amount)
            });
            setTitle('');
            setAuthor('');
            setIsbn('');
            setPublisher('');
            setPublishedDate('');
            setDescription('');
            setCategory('');
            setAmount('');
        } catch (error) {
            console.error('There was an error adding the book!', error);
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
                <h2>Dodawanie nowej książki</h2>
                <div className="form_group">
                    <label htmlFor="title">Tytuł</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form_group">
                    <label htmlFor="author">Imię i nazwisko autora</label>
                    <input
                        type="text"
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>
                <div className="form_group">
                    <label htmlFor="isbn">ISBN</label>
                    <input
                        type="text"
                        id="isbn"
                        value={isbn}
                        onChange={(e) => setIsbn(e.target.value)}
                        required
                    />
                </div>
                <div className="form_group">
                    <label htmlFor="publisher">Wydawca</label>
                    <input
                        type="text"
                        id="publisher"
                        value={publisher}
                        onChange={(e) => setPublisher(e.target.value)}
                        required
                    />
                </div>
                <div className="form_group">
                    <label htmlFor="publishedDate">Data publikacji</label>
                    <input
                        type="date"
                        id="publishedDate"
                        value={publishedDate}
                        onChange={(e) => setPublishedDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form_group">
                    <label htmlFor="description">Opis</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="form_group">
                    <label htmlFor="category">Kategoria</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">Wybierz kategorię</option>
                        <option value="FICTION">Fiction</option>
                        <option value="NON_FICTION">Non-Fiction</option>
                        <option value="SCIENCE_FICTION">Science Fiction</option>
                        <option value="FANTASY">Fantasy</option>
                        <option value="THRILLER">Thriller</option>
                        <option value="ROMANCE">Romance</option>
                        <option value="HORROR">Horror</option>
                        <option value="HISTORY">History</option>
                        <option value="BIOGRAPHY">Biography</option>
                        <option value="POETRY">Poetry</option>
                        <option value="DRAMA">Drama</option>
                        <option value="CHILDRENS">Children's</option>
                        <option value="YOUTH_LITERATURE">Youth Literature</option>
                        <option value="ADULT_LITERATURE">Adult Literature</option>
                    </select>
                </div>
                <div className="form_group">
                    <label htmlFor="amount">Ilość</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={submitting}>
                    {submitting ? 'Dodawanie...' : 'Dodaj książkę'}
                </button>
            </form>
        </div>
    );
}

export default AddBook;
