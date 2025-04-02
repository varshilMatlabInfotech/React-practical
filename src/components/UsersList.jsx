import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FaBookmark } from 'react-icons/fa';
import debounce from 'lodash.debounce';
import { setUsers, setPage, setLoading, setError, toggleBookmark, clearUsers } from '../store/usersSlice';

function UsersList() {
  const dispatch = useDispatch();
  const { users, page, loading, bookmarkedUsers, error } = useSelector((state) => state.users);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [hasMore, setHasMore] = useState(true); // Track if there are more users to load

  const fetchUsers = async () => {
    try {
      dispatch(setLoading(true));
      const response = await fetch(`https://api.github.com/users?per_page=10&since=${(page - 1) * 10}`);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      dispatch(setUsers(data));
      dispatch(setPage());
      
      // Update hasMore based on the number of users returned
      if (data.length < 10) {
        setHasMore(false); // No more users to load
      }
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        user.login.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [users, searchTerm]);

  const debouncedSearch = debounce((term) => {
    setSearchTerm(term);
  }, 300);

  const handleSearch = (e) => {
    debouncedSearch(e.target.value);
  };

  const handleRefresh = () => {
    dispatch(clearUsers());
    setHasMore(true); // Reset hasMore when refreshing
    fetchUsers();
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          onChange={handleSearch}
          className="w-full p-2 border rounded-lg"
        />
      </div>
{/* 
      <button
        onClick={handleRefresh}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Refresh List
      </button> */}

      {/* Display error message */}
      {error && (
        <div className="mb-4 p-4 bg-red-500 text-white rounded-lg">
          <strong>Error:</strong> {error}
        </div>
      )}

      <InfiniteScroll
        dataLength={filteredUsers.length}
        next={fetchUsers}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        refreshFunction={handleRefresh}
        pullDownToRefreshContent={
          <div style={{ padding: '10px', textAlign: 'center' }}>
            Pull down to refresh...
          </div>
        }
      >
        <div className="space-y-4">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="w-12 h-12 rounded-full"
                />
                <span className="font-medium">{user.login}</span>
              </div>
              <button
                onClick={() => dispatch(toggleBookmark(user.id))}
                className={`p-2 rounded-full ${
                  bookmarkedUsers.includes(user.id)
                    ? 'text-yellow-500'
                    : 'text-gray-400'
                }`}
              >
                <FaBookmark />
              </button>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default UsersList;
