import React, { useState, useEffect, FormEvent } from 'react';
import axios from "axios";

function Add_book() {
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [authorSurname, setAuthorSurname] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:7788/book/add', {
                title,
                author_name: authorName,
                author_surname: authorSurname,
                category
            });
            setTitle('');
            setAuthorName('');
            setAuthorSurname('');
            setCategory('');
        } catch (error) {
            console.error('There was an error adding the book!', error);
        }
    };

    useEffect(() => {
    }, []);

    return (
        <div className='page_content'>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Author Name</label>
                    <input
                        type="text"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Author Surname</label>
                    <input
                        type="text"
                        value={authorSurname}
                        onChange={(e) => setAuthorSurname(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Category</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Book</button>
            </form>
        </div>
    );
}

export default Add_book;
