import React, { useState } from 'react';
import './StudentSearch.css';

function StudentSearch({ onSearchResults, onClearSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      onClearSearch();
      return;
    }

    try {
      const response = await fetch(`/api/students/search/by-name?name=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      onSearchResults(data);
    } catch (error) {
      console.error('Error searching students:', error);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    onClearSearch();
  };

  return (
    <form onSubmit={handleSearch} className="search-form">
      <div className="search-input-group">
        <input
          type="text"
          placeholder="Search student by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="btn btn-search">
          Search
        </button>
        {searchQuery && (
          <button type="button" className="btn btn-clear" onClick={handleClear}>
            Clear
          </button>
        )}
      </div>
    </form>
  );
}

export default StudentSearch;
