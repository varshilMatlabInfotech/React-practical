import TextField from '@mui/material/TextField';
const SearchBar = (handleSearch, searchTerm) => {
  return (
    <TextField label="Search by username" variant="outlined" fullWidth value={searchTerm} onChange={handleSearch} style={{ marginBottom: '20px' }} />
  );
};
export default SearchBar;
