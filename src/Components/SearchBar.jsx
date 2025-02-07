// src/components/SearchBar.js
import React from 'react';

const SearchBar = ({ onChange, placeholder }) => {
  return (
    <input
      type="text"
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-2 border rounded focus:outline-none"
    />
  );
};

export default SearchBar;
