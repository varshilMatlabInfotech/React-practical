// src/components/BookmarksTab.js
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserCard from './UserCard';
import SearchBar from './SearchBar';
import { removeBookmark } from '../slices/bookmarksSlice';
import { updateBookmarkStatus } from '../slices/usersSlice';
import throttle from 'lodash.throttle';

const BookmarksTab = () => {
  const dispatch = useDispatch();
  const bookmarks = useSelector(state => state.bookmarks.list);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBookmarks, setFilteredBookmarks] = useState(bookmarks);

  useEffect(() => {
    const lowercasedTerm = searchTerm.toLowerCase();
    setFilteredBookmarks(
      bookmarks.filter(user => user.login.toLowerCase().includes(lowercasedTerm))
    );
  }, [bookmarks, searchTerm]);

  const handleBookmarkToggle = (user) => {
    dispatch(removeBookmark(user));
    dispatch(updateBookmarkStatus({ login: user.login, bookmarked: false }));
  };

  const throttledSearch = useCallback(
    throttle((value) => {
      setSearchTerm(value);
    }, 300),
    []
  );

  const handleSearchChange = (e) => {
    throttledSearch(e.target.value);
  };

  return (
    <div>
      <SearchBar onChange={handleSearchChange} placeholder="Search Bookmarked Users..." />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filteredBookmarks.map(user => (
          <UserCard
            key={user.id}
            user={user}
            onBookmarkToggle={() => handleBookmarkToggle(user)}
          />
        ))}
      </div>
      {filteredBookmarks.length === 0 && (
        <p className="text-center mt-4">No bookmarked users found.</p>
      )}
    </div>
  );
};

export default BookmarksTab;
