import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBookmarkSearchQuery } from 'utils/store/slices/bookmarksSlice';
import UserCard from '../../components/UserCard';
import { 
  Box, 
  Typography, 
  TextField, 
  Container,
  Alert
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const BookmarkedUsers = () => {
  const dispatch = useDispatch();
  const { bookmarkedUsers, searchQuery } = useSelector(state => state.bookmarks);
  const [localSearch, setLocalSearch] = useState('');

  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setLocalSearch(value);
    dispatch(setBookmarkSearchQuery(value));
  }, [  ]);

  const filteredUsers = bookmarkedUsers.filter(user => 
    user.login.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Bookmarked Users
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
          <TextField
            placeholder="Search bookmarked users..."
            value={localSearch}
            onChange={handleSearchChange}
            variant="outlined"
            size="small"
            sx={{ flexGrow: 1, maxWidth: 400 }}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} />,
            }}
          />
        </Box>
      </Box>

      {filteredUsers.length === 0 && (
        <Alert severity="info" sx={{ mb: 2 }}>
          {bookmarkedUsers.length === 0 
            ? "No bookmarked users yet. Bookmark users from the Users tab to see them here."
            : "No bookmarked users match your search criteria."
          }
        </Alert>
      )}

      <Box>
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </Box>
    </Container>
  );
};

export default BookmarkedUsers;
