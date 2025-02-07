// src/components/UsersTab.js
import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, refreshUsers, clearRefresh, updateBookmarkStatus } from '../slices/usersSlice';
import { addBookmark, removeBookmark } from '../slices/bookmarksSlice';
import UserCard from './UserCard';
import SearchBar from './SearchBar';
import PullToRefresh from 'react-simple-pull-to-refresh';
import throttle from 'lodash.throttle';

const UsersTab = () => {
  const dispatch = useDispatch();
  const { list, status } = useSelector(state => state.users);
  const bookmarks = useSelector(state => state.bookmarks.list);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(list);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Number of items to display per page

  // Initial load on first mount
  useEffect(() => {
    if (list.length === 0) {
      dispatch(fetchUsers(0));
    }
  }, [dispatch, list.length]);

  // Update filtered users whenever the list or search term changes.
  useEffect(() => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = list.filter(user =>
      user.login.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredUsers(filtered);
    // Reset to the first page when filtering
    setCurrentPage(1);
  }, [list, searchTerm]);

  // Compute pagination values
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Pull-to-refresh: refreshes the list from the API
  const handleRefresh = async () => {
    dispatch(refreshUsers());
    await dispatch(fetchUsers(0));
    dispatch(clearRefresh());
    setCurrentPage(1);
  };

  // Toggle bookmarking on a user
  const handleBookmarkToggle = (user) => {
    const isBookmarked = bookmarks.find(b => b.login === user.login);
    if (isBookmarked) {
      dispatch(removeBookmark(user));
      dispatch(updateBookmarkStatus({ login: user.login, bookmarked: false }));
    } else {
      dispatch(addBookmark(user));
      dispatch(updateBookmarkStatus({ login: user.login, bookmarked: true }));
    }
  };

  // Throttle the search input change by 300ms.
  const throttledSearch = useCallback(
    throttle((value) => {
      setSearchTerm(value);
    }, 300),
    []
  );

  const handleSearchChange = (e) => {
    throttledSearch(e.target.value);
  };

  // Pagination handlers
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Determine the page numbers to display (a sliding window of 4 pages)
  const visiblePages = 4;
  let startPage = 1;
  if (totalPages > visiblePages) {
    startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    if (startPage + visiblePages - 1 > totalPages) {
      startPage = totalPages - visiblePages + 1;
    }
  }
  const pageNumbers = [];
  for (let i = startPage; i <= Math.min(totalPages, startPage + visiblePages - 1); i++) {
    pageNumbers.push(i);
  }

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="p-4">
        <SearchBar onChange={handleSearchChange} placeholder="Search Users..." />

        {/* User Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {currentUsers.map(user => (
            <UserCard
              key={user.id}
              user={user}
              onBookmarkToggle={() => handleBookmarkToggle(user)}
            />
          ))}
        </div>

        {status === 'loading' && (
          <p className="text-center mt-4">Loading...</p>
        )}

        {/* Pagination Controls */}
        {totalPages > 0 && (
          <div className="flex justify-center items-center mt-6 space-x-2">
            {/* Left Arrow */}
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-3 py-1 border rounded transition-colors 
                ${currentPage === 1
                  ? 'text-gray-400 border-gray-300 cursor-not-allowed'
                  : 'text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white'
                }`}
            >
              &larr;
            </button>

            {/* Page Number Buttons */}
            {pageNumbers.map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 border rounded transition-colors 
                  ${currentPage === page
                    ? 'bg-blue-500 text-white'
                    : 'text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white'
                  }`}
              >
                {page}
              </button>
            ))}

            {/* Right Arrow */}
            <button
              onClick={handleNextPage}
              disabled={totalPages === 0 || currentPage === totalPages}
              className={`px-3 py-1 border rounded transition-colors 
                ${currentPage === totalPages
                  ? 'text-gray-400 border-gray-300 cursor-not-allowed'
                  : 'text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white'
                }`}
            >
              &rarr;
            </button>
          </div>
        )}
      </div>
    </PullToRefresh>
  );
};

export default UsersTab;
