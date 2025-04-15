import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBookmark } from '../features/users/BookmarkedSlice';

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const bookmarks = useSelector(state => state.bookmarks);
  const isBookmarked = bookmarks.find(u => u.id === user.id);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between hover:shadow-lg transition">
      <div className="flex items-center space-x-4">
        <img
          src={user.avatar_url}
          alt={user.login}
          className="w-14 h-14 rounded-full border-2 border-gray-200"
        />
        <span className="text-lg font-medium text-gray-800">{user.login}</span>
      </div>

      <button
        onClick={() => dispatch(toggleBookmark(user))}
        className={`text-2xl focus:outline-none transition-colors ${
          isBookmarked ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-300'
        }`}
        title={isBookmarked ? 'Remove Bookmark' : 'Add to Bookmarks'}
      >
        {isBookmarked ? '★' : '☆'}
      </button>
    </div>
  );
};

export default UserCard;
