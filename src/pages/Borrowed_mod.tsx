import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { useUser } from "../components/UserContext"; 

function AllBorrowings() {
    const [borrowings, setBorrowings] = useState([]);
    const [sortBy, setSortBy] = useState<string>('title'); 
    const [sortOrder, setSortOrder] = useState<string>('asc'); 
    const { user } = useUser(); 

    const fetchAllBorrowings = async () => {
        if (!user) {
            return;
        }
        
        try {
            const params: { sortBy?: string, sortOrder?: string } = {};
            if (sortBy) {
                params.sortBy = sortBy;
                params.sortOrder = sortOrder;
            }
            const { data } = await axios.get(`http://localhost:7788/admin/borrowings`, { 
                params,
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            });
            setBorrowings(data);
        } catch (error) {
            console.error('There was an error fetching the borrowings!', error);
        }
    };

    useEffect(() => {
        fetchAllBorrowings();
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
                        <option value='user'>Nazwa użytkownika</option>
                        <option value='title'>Tytuł książki</option>
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
            <div className='borrowings_list'>
                {borrowings.map(({ id, userName, bookTitle }) => (
                    <div key={id} className='borrowing_item'>
                        <p><strong>Użytkownik:</strong> {userName}</p>
                        <p><strong>Tytuł książki:</strong> {bookTitle}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllBorrowings;
