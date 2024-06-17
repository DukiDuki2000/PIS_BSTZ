import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import '../App.css';

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchTerm) {
      navigate(`/search?term=${searchTerm}`);
    }
  };

  return (
    <form className="searchBarContainer" onSubmit={handleSearch}>
      <div className="searchInputWrapper">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="searchInput"
        />
        <button type="submit" className="searchButton">
          <FiSearch className="searchIcon" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;