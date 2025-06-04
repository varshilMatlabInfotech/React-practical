import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Box, Typography, Alert } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import UserCard from 'components/common/UserCard';
import usePullToRefresh from 'hooks/usePullToRefresh';
import { fetchUsersStart, fetchUsersSuccess, fetchUsersFailure } from 'redux/slices/usersSlice';
import { addBookmark, removeBookmark } from 'redux/slices/bookmarksSlice';
import { getUsers } from 'services/api';

const UserList = () => {
  const dispatch = useDispatch();
  const { 
    filteredList: users,
    list: allUsers,
    loading, 
    hasMore, 
    page, 
    error,
    isRefreshing
  } = useSelector((state) => state.users);
  const { list: bookmarkedUsers } = useSelector((state) => state.bookmarks);
  console.log("users", users);
  const fetchUsers = async (isNewPage = false) => {
    try {
      dispatch(fetchUsersStart({ isRefreshing: !isNewPage }));
      const nextPage = isNewPage ? page + 1 : 1;
      const response = await getUsers(nextPage);
      dispatch(fetchUsersSuccess({ 
        ...response,
        isNewPage 
      }));
    } catch (error) {
      dispatch(fetchUsersFailure(error.message));
    }
  };

  useEffect(() => {
    if (allUsers.length === 0) {
      fetchUsers();
    }
  }, []);

  usePullToRefresh(() => {
    fetchUsers(false);
  });

  const handleBookmark = (user) => {
    const isBookmarked = bookmarkedUsers.some((bookmark) => bookmark.login === user.login);
    if (isBookmarked) {
      dispatch(removeBookmark(user.login));
    } else {
      dispatch(addBookmark(user));
    }
  };

  if (error) {
    return (
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Typography 
          variant="body1" 
          color="textSecondary" 
          sx={{ cursor: 'pointer' }}
          onClick={() => fetchUsers(false)}
        >
          Click here to retry
        </Typography>
      </Box>
    );
  }

  if (loading && allUsers.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!loading && users.length === 0) {
    return (
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="textSecondary">
          {allUsers.length === 0 ? 'No users found' : 'No users match your search'}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 2 }}>
      <InfiniteScroll
        dataLength={allUsers.length}
        next={() => fetchUsers(true)}
        hasMore={hasMore}
        loader={
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <CircularProgress size={24} />
          </Box>
        }
        endMessage={
          <Box sx={{ textAlign: 'center', my: 2 }}>
            <Typography variant="body2" color="textSecondary">
              No more users to load
            </Typography>
          </Box>
        }
        pullDownToRefresh={true}
        pullDownToRefreshContent={
          <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center', my: 2 }}>
            Pull down to refresh
          </Typography>
        }
        releaseToRefreshContent={
          <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center', my: 2 }}>
            Release to refresh
          </Typography>
        }
        refreshFunction={() => fetchUsers(false)}
        pullDownToRefreshThreshold={50}
      >
        {users.map((user,index) => (
          <UserCard
            key={index}
            user={user}
            onBookmark={handleBookmark}
            isBookmarked={bookmarkedUsers.some((bookmark) => bookmark.login === user.login)}
          />
        ))}
      </InfiniteScroll>

      {isRefreshing && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <CircularProgress size={24} />
        </Box>
      )}
    </Box>
  );
};

export default UserList; 