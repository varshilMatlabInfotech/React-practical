import React, { useState } from 'react';
import UsersList from './components/UsersList';
import BookmarkedUsers from './components/BookmarkedUsers';
import { FaUsers, FaBookmark } from 'react-icons/fa';

function App() {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex mb-4 border-b">
            <button
              className={`flex items-center px-4 py-2 ${
                activeTab === 'users'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('users')}
            >
              <FaUsers className="mr-2" />
              Users
            </button>
            <button
              className={`flex items-center px-4 py-2 ${
                activeTab === 'bookmarks'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('bookmarks')}
            >
              <FaBookmark className="mr-2" />
              Bookmarked Users
            </button>
          </div>
          
          {activeTab === 'users' ? <UsersList /> : <BookmarkedUsers />}
        </div>
      </div>
    </div>
  );
}

export default App;