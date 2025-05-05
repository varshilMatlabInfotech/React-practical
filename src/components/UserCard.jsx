import { toggleBookmark } from 'features/bookmarksSlice';
import { useDispatch, useSelector } from 'react-redux';

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.bookmarks);

  const isBookmarked = bookmarks.some((bookmarked) => bookmarked.id === user.id);

  const handleBookmark = () => {
    dispatch(toggleBookmark(user));
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white border rounded-xl p-4 mb-4 shadow hover:shadow-md transition-shadow">
      <div className="flex justify-center sm:justify-start mb-4 sm:mb-0">
        <img src={user.avatar_url} alt={user.login} className="w-16 h-16 rounded-full border object-cover shadow-sm" />
      </div>

      <div className="flex-1 text-center sm:text-left sm:ml-6">
        <div className="text-lg font-semibold text-gray-800">
          <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {user.login.charAt(0).toUpperCase() + user.login.slice(1)}
          </a>
        </div>
        <div className="text-sm text-gray-500">{user.site_admin ? 'Admin' : 'User'}</div>
      </div>

      <div className="mt-3 sm:mt-0 sm:ml-6 text-center sm:text-right">
        <button
          onClick={handleBookmark}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
            isBookmarked ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
          }`}
        >
          {isBookmarked ? 'Unbookmark' : 'Bookmark'}
        </button>
      </div>
    </div>
  );
};

export default UserCard;
