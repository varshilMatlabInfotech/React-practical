import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useDebounce } from '../../hooks/useDebounce';

const SearchInput = ({ onSearch, placeholder = 'Search...' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  return (
    <Form.Group className="mb-3">
      <Form.Control
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </Form.Group>
  );
};

export default SearchInput;