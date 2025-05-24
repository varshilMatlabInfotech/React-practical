import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, toggleBookmark, resetUsers } from '../store/userSlice.jsx';

const UserList = ({ isBookmarkedTab, searchText }) => {
  const dispatch = useDispatch();
  const { list, bookmarks, since, loading } = useSelector((state) => state.users);
  const users = isBookmarkedTab ? bookmarks : list;

  useEffect(() => {
    if (!isBookmarkedTab && list.length === 0) {
      dispatch(fetchUsers(0));
    }
  }, [dispatch, isBookmarkedTab, list]);

  const loadMore = useCallback(() => {
    if (!loading && !isBookmarkedTab) {
      dispatch(fetchUsers(since));
    }
  }, [dispatch, since, loading, isBookmarkedTab]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      loadMore();
    }
  }, [loadMore]);

  useEffect(() => {
    if (!isBookmarkedTab) {
      window.addEventListener('scroll', handleScroll);
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll, isBookmarkedTab]);

  const handleRefresh = () => {
    dispatch(resetUsers());
    dispatch(fetchUsers(0));
  };

  const filteredUsers = users.filter(user =>
    user.login.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      {!isBookmarkedTab && (
        <button onClick={handleRefresh} style={{ margin: '1rem 0' }}>
          Refresh Users
        </button>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            style={{ border: '1px solid #ccc', padding: 10, width: 150 }}
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              style={{ width: 80, borderRadius: '50%' }}
            />
            <p>{user.login}</p>
            <button onClick={() => dispatch(toggleBookmark(user))}>
              {bookmarks.some((u) => u.id === user.id) ? 'Unbookmark' : 'Bookmark'}
            </button>
          </div>
        ))}
      </div>

      {loading && !isBookmarkedTab && <p>Loading more users...</p>}
    </div>
  );
};

export default UserList;