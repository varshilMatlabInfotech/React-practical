import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PullToRefresh from 'react-pull-to-refresh'; // Import the library

import { fetchUsers, refreshUsers } from 'features/users/usersSlice';
import SearchBar from 'components/SearchBar';
import UserCard from 'components/UserCard';

const UsersPage = () => {
  const dispatch = useDispatch();
  const { list } = useSelector(state => state.users);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (list.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch, list.length]);

  const filteredUsers = list.filter(user =>
    user.login.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLoadMore = () => {
    dispatch(fetchUsers());
  };

  const handleRefresh = () => {
    // Reset the list and `since` value for a fresh fetch
    dispatch(refreshUsers());
    dispatch(fetchUsers());
  };

  return (
    <PullToRefresh
      onRefresh={handleRefresh} // Trigger the refresh action
      pullingText="Pull down to refresh..." // Text while pulling
      refreshingText="Refreshing..." // Text while refreshing
      releasedText="Release to refresh..." // Text when released
    >
      <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            User Directory
          </h1>

          <div className="mb-6">
            <SearchBar onSearch={setSearchTerm} />
          </div>

          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              🔄 Refresh
            </button>
            <button
              onClick={handleLoadMore}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              ➕ Load More
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredUsers.map(user => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </div>
      </div>
    </PullToRefresh>
  );
};

export default UsersPage;
