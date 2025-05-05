import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import UserCard from '../../components/UserCard';
import SearchBar from '../../components/SearchBar';

const BookmarkedPage = () => {
  const bookmarks = useSelector(state => state.bookmarks);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBookmarks = bookmarks.filter(user =>
    user.login.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <SearchBar type={"bookmarks"} onSearch={setSearchQuery} />
      {filteredBookmarks.length > 0 ? (
        filteredBookmarks.map(user => <UserCard key={user.id} user={user} />)
      ) : (
        <p className="text-center text-sm text-gray-500 mt-4">
          No bookmarked users found.
        </p>
      )}
    </div>
  );
};

export default BookmarkedPage;
