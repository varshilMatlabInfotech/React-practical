import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUsers } from 'utils/store/slices/usersSlice';
import UserCard from '../../components/UserCard';
import { 
  Box, 
  Typography, 
  TextField, 
  CircularProgress,
  Alert,
  Container
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Users = () => {
  const dispatch = useDispatch();
  const {
    users,
    loading,
    error,
    hasMore,
    searchQuery
  } = useSelector(state => state.users);

  const [localSearch, setLocalSearch] = useState('');

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users.length]);


  const filteredUsers = users.filter(user => 
    user.login.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          GitHub Users
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
          <TextField
            placeholder="Search users..."
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

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box>
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {!hasMore && filteredUsers.length > 0 && (
        <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 4 }}>
          No more users to load
        </Typography>
      )}

      {filteredUsers.length === 0 && !loading && (
        <Typography variant="body1" textAlign="center" sx={{ mt: 4 }}>
          No users found
        </Typography>
      )}
    </Container>
  );
};

export default Users;
