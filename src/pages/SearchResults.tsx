import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

interface SearchResult {
  id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  status: string;
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
          const result = await axios.get(`http://localhost:9002/api/search?term=${encodedTerm}`, {
            withCredentials: true,
          });
          setSearchResults(result.data);
        } catch (error: any) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchSearchResults();
    }
  }, [searchTerm]);

  return (
    <div>
      <h1>Search Results</h1>
      {isLoading && <p>Searching...</p>}
      {error && <p>Error: {error.message}</p>}
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((result) => (
            <li key={result.id}>
              <strong>{result.title}</strong> - {result.author} - {result.description} - {result.category} - {result.status}
            </li>
          ))}
        </ul>
      ) : (
        !isLoading && <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
