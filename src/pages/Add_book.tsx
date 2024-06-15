import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import Go_back from '../components/Go_back';

function AddBook() {
    const [title, setTitle] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [authorSurname, setAuthorSurname] = useState('');
    const [category, setCategory] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setSubmitting(true);
        try {
            await axios.post('http://localhost:7788/book/add', {
                title: title,
                author_name: authorName,
                author_surname: authorSurname,
                category: category
            });
            setTitle('');
            setAuthorName('');
            setAuthorSurname('');
            setCategory('');
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
                    <label htmlFor="authorName">Imię autora</label>
                    <input
                        type="text"
                        id="authorName"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        required
                    />
                </div>
                <div className="form_group">
                    <label htmlFor="authorSurname">Nazwisko autora</label>
                    <input
                        type="text"
                        id="authorSurname"
                        value={authorSurname}
                        onChange={(e) => setAuthorSurname(e.target.value)}
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
                        <option value="fantasy">Fantasy</option>
                        <option value="sci-fi">Science Fiction</option>
                        <option value="non-fiction">Non-Fiction</option>
                        <option value="biography">Biografia</option>
                        <option value="history">Historia</option>
                        <option value="mystery">Kryminał</option>
                    </select>
                </div>
                <button type="submit" disabled={submitting}>
                    {submitting ? 'Dodawanie...' : 'Dodaj książkę'}
                </button>
            </form>
        </div>
    );
}

export default AddBook;
