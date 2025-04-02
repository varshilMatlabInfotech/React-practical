import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaBookmark } from 'react-icons/fa';
import { toggleBookmark } from '../store/usersSlice';

function BookmarkedUsers() {
  const dispatch = useDispatch();
  const { users, bookmarkedUsers } = useSelector((state) => state.users);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBookmarks, setFilteredBookmarks] = useState([]);

  // Use Set to ensure unique users
  const uniqueBookmarkedUsers = Array.from(
    new Set(bookmarkedUsers)
  ).map(userId => 
    users.find(user => user.id === userId)
  ).filter(Boolean);

  useEffect(() => {
    setFilteredBookmarks(
      uniqueBookmarkedUsers.filter((user) =>
        user.login.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [uniqueBookmarkedUsers, searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleBookmarkToggle = (userId) => {
    // Toggle bookmark for a user
    dispatch(toggleBookmark(userId));
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search bookmarked users..."
          onChange={handleSearch}
          className="w-full p-2 border rounded-lg"
        />
      </div>

      <div className="space-y-4">
        {filteredBookmarks.length === 0 ? (
          <p className="text-center text-gray-500">No bookmarked users found</p>
        ) : (
          filteredBookmarks.map((user) => (
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
                onClick={() => handleBookmarkToggle(user.id)}
                className="text-yellow-500 p-2 rounded-full"
              >
                <FaBookmark />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BookmarkedUsers;
