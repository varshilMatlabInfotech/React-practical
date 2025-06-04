import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import UserCard from 'components/common/UserCard';
import { removeBookmark } from 'redux/slices/bookmarksSlice';

const BookmarkedUsers = () => {
  const dispatch = useDispatch();
  const { filteredList: bookmarkedUsers } = useSelector((state) => state.bookmarks);

  const handleUnbookmark = (user) => {
    dispatch(removeBookmark(user.login));
  };

  if (bookmarkedUsers.length === 0) {
    return (
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="textSecondary">
          No bookmarked users found
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 2 }}>
      {bookmarkedUsers.map((user) => (
        <UserCard
          key={user.login}
          user={user}
          onBookmark={handleUnbookmark}
          isBookmarked={true}
        />
      ))}
    </Box>
  );
};

export default BookmarkedUsers; 