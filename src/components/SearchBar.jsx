import React, { useState, useMemo } from 'react';
import { debounce } from 'lodash-es';

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState('');

  const debouncedSearch = useMemo(
    () => debounce(val => onSearch(val), 300),
    [onSearch]
  );

  const handleChange = (e) => {
    setTerm(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <input
      placeholder="Search users..."
      value={term}
      onChange={handleChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
    />
  );
};

export default SearchBar;
