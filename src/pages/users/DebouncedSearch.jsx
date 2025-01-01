import { useMemo, useState } from 'react';
import { TextField } from '@mui/material';
import { debounce } from 'lodash';

export default ({ onSearch, delay = 300, ...props }) => {
  const [value, setValue] = useState('');

  const debouncedSearch = useMemo(
    () =>
      debounce((query) => {
        onSearch(query);
      }, delay),
    [onSearch, delay],
  );

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedSearch(newValue);
  };

  return <TextField {...props} value={value} onChange={handleChange} placeholder="Search..." fullWidth />;
};
