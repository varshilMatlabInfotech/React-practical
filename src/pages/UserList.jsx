import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, IconButton, Pagination, Typography, Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { getUsers } from '../api/users';
import { setUsersForPage, setLoading, setError, setPage, clearCache } from '../store/userSlice';
import { toggleBookmark } from '../store/bookmarkSlice';
import UserTile from '../common/UserTile';
import SearchBar from '../common/SearchBar';
import Loader from '../common/Loader';
import useThrottle from '../hooks/useThrottle';

const UserList = () => {
  const dispatch = useDispatch();
  const { cache, loading, error, page } = useSelector((state) => state.users);
  const bookmarkedItems = useSelector((state) => state.bookmarks.items);
  const [searchTerm, setSearchTerm] = useState('');
  const throttledSearch = useThrottle(searchTerm, 300);

  const fetchUsers = useCallback(async (targetPage) => {
    if (cache[targetPage]) return;

    dispatch(setLoading(true));
    try {
      const since = (targetPage - 1) * 10;
      const response = await getUsers(since);
      dispatch(setUsersForPage({ page: targetPage, users: response.data }));
      dispatch(setError(null));
    } catch (err) {
      dispatch(setError('Failed to fetch users. Please try again later.'));
      console.error(err);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, cache]);

  useEffect(() => {
    fetchUsers(page);
  }, [fetchUsers, page]);

  const handlePageChange = (event, value) => {
    dispatch(setPage(value));
  };

  const handleRefresh = () => {
    dispatch(clearCache());
    fetchUsers(page);
  };

  const currentUsers = cache[page] || [];
  const filteredUsers = currentUsers.filter((user) =>
    user.login.toLowerCase().includes(throttledSearch.toLowerCase())
  );

  const isBookmarked = (userId) => {
    return bookmarkedItems.some((item) => item.id === userId);
  };

  const onToggleBookmark = (user) => {
    dispatch(toggleBookmark(user));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', flex: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
        <Box sx={{ flex: 1 }}>
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </Box>
        <IconButton 
          onClick={handleRefresh} 
          disabled={loading}
          color="primary"
          sx={{ 
            p: 1.5, 
            backgroundColor: 'action.hover',
            '&:hover': { backgroundColor: 'action.selected' }
          }}
        >
          <RefreshIcon sx={{ animation: loading ? 'spin 1s infinite linear' : 'none' }} />
        </IconButton>
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </Box>

      {loading ? (
        <Loader text="Fetching GitHub Users..." />
      ) : error ? (
        <Box sx={{ textAlign: 'center', py: 5 }}>
          <Typography color="error" gutterBottom>{error}</Typography>
          <Button variant="contained" onClick={() => fetchUsers(page)}>Retry</Button>
        </Box>
      ) : (
        <Box sx={{ flex: 1, overflowY: 'auto', mb: 2 }}>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <UserTile
                key={user.id}
                user={user}
                isBookmarked={isBookmarked(user.id)}
                onToggleBookmark={onToggleBookmark}
              />
            ))
          ) : (
            <Typography variant="body1" align="center" color="text.secondary" sx={{ py: 5 }}>
              {searchTerm ? 'No matching users found.' : 'No users available.'}
            </Typography>
          )}
        </Box>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 'auto', pt: 2, borderTop: 1, borderColor: 'divider' }}>
        <Pagination 
          count={100} // GitHub allows up to page 100 for public listings usually
          page={page} 
          onChange={handlePageChange} 
          color="primary" 
          size="large"
        />
      </Box>
    </Box>
  );
};

export default UserList;
