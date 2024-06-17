import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

interface SearchResult {
  id: string;
  public_books_title: string;
  public_books_author: string;
  public_books_description: string;
  public_books_category: string;
  public_books_status: string;
}

const SearchResults: React.FC = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const location = useLocation();
  const searchTerm = new URLSearchParams(location.search).get('term');

  useEffect(() => {
    if (searchTerm) {
      const fetchSearchResults = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const encodedTerm = encodeURIComponent(searchTerm);
          const result = await axios.get(`http://localhost:9003/api/search?term=${encodedTerm}`, {
            withCredentials: true,
          });
          setSearchResults(result.data);
        } catch (error: any) {
          console.error('Error fetching search results:', error);
          setError(error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchSearchResults();
    }
  }, [searchTerm]);

  return (
    <div className='page_content'>
      <h1>Search Results</h1>
      {isLoading && <p>Searching...</p>}
      {error && <p>Error: {error.message}</p>}
      {searchResults.length > 0 ? (
        <div className='books_grid'>
          {searchResults.map((result) => (
            <div key={result.id} className='book_tile'>
              <h3>{result.public_books_title}</h3>
              <p><strong>Author:</strong> {result.public_books_author}</p>
              <p><strong>Description:</strong> {result.public_books_description}</p>
              <p><strong>Category:</strong> {result.public_books_category}</p>
              <p><strong>Status:</strong> {result.public_books_status}</p>
            </div>
          ))}
        </div>
      ) : (
        !isLoading && <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
