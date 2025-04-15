import SearchBar from 'components/SearchBar';
import UserCard from 'components/UserCard';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const BookmarkedPage = () => {
  const bookmarks = useSelector(state => state.bookmarks);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = bookmarks.filter(user =>
    user.login.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          ⭐ Bookmarked Users
        </h1>

        <div className="mb-6">
          <SearchBar onSearch={setSearchTerm} />
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-gray-500">No bookmarked users found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filtered.map(user => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarkedPage;
