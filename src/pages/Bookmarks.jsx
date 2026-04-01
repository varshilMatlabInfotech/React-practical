import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { toggleBookmark } from '../store/bookmarkSlice';
import UserTile from '../common/UserTile';
import SearchBar from '../common/SearchBar';
import useThrottle from '../hooks/useThrottle';

const Bookmarks = () => {
  const dispatch = useDispatch();
  const bookmarkedItems = useSelector((state) => state.bookmarks.items);
  const [searchTerm, setSearchTerm] = useState('');
  const throttledSearch = useThrottle(searchTerm, 300);

  const filteredUsers = bookmarkedItems.filter((user) =>
    user.login.toLowerCase().includes(throttledSearch.toLowerCase())
  );

  const onToggleBookmark = (user) => {
    dispatch(toggleBookmark(user));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', flex: 1 }}>
      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <UserTile
              key={user.id}
              user={user}
              isBookmarked={true}
              onToggleBookmark={onToggleBookmark}
            />
          ))
        ) : (
          <Typography variant="body1" align="center" color="text.secondary" sx={{ py: 5 }}>
            {searchTerm ? 'No bookmarked users found.' : 'No users bookmarked yet.'}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Bookmarks;
