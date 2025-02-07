// src/components/UserCard.js
import React from 'react';

const UserCard = ({ user, onBookmarkToggle }) => {
  return (
    <div className="bg-white shadow-md rounded p-4 flex items-center">
      <img
        src={user.avatar_url}
        alt={user.login}
        className="w-16 h-16 rounded-full mr-4"
      />
      <div className="flex-1">
        <h2 className="text-xl font-semibold">{user.login}</h2>
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500"
        >
          View Profile
        </a>
      </div>
      <button onClick={onBookmarkToggle} className="ml-4">
        {user.bookmarked ? (
          // Filled bookmark icon when bookmarked
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M5 3a2 2 0 00-2 2v16l9-4 9 4V5a2 2 0 00-2-2H5z" />
          </svg>
        ) : (
          // Outline bookmark icon when not bookmarked
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5v16l7-5 7 5V5a2 2 0 00-2-2H7a2 2 0 00-2 2z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default UserCard;
