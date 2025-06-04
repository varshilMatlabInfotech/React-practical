import React, { useState, useCallback, useEffect } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { debounce } from 'lodash';

const DEBOUNCE_DELAY = 300;

const SearchBar = ({ onSearch, reset }) => {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (reset) {
      setSearchQuery('');
    }
  }, [reset]);

  const debouncedSearch = useCallback(
    debounce((value) => {
      onSearch(value);
    }, DEBOUNCE_DELAY),
    [onSearch]
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
      onSearch('');
    };
  }, [onSearch, debouncedSearch]);

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    if (value === '') {
      debouncedSearch.cancel();
      onSearch('');
    } else {
      debouncedSearch(value);
    }
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search users..."
      value={searchQuery}
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar; 