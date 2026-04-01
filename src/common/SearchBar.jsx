import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ value, onChange }) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search users..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{ mb: 2 }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }
      }}
    />
  );
};

export default SearchBar;
