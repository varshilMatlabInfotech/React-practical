import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Tabs = () => {
  const bookmarks = useSelector((state) => state.bookmarks);
  const bookmarkedCount = bookmarks?.length || 0;

  const { list: users } = useSelector((state) => state.users);
  const usersCount = users?.length || 0;

  const baseClasses = 'relative whitespace-nowrap flex-1 text-center px-4 py-2 font-medium rounded-md transition-all duration-200';
  const activeClasses = 'bg-blue-600 text-white shadow-md';
  const inactiveClasses = 'bg-gray-100 text-gray-600 hover:bg-blue-100';

  const getLinkClasses = (isActive) => `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex gap-2 sm:gap-4 justify-center py-3 overflow-x-auto flex-wrap">
          <NavLink to="/" end className={({ isActive }) => getLinkClasses(isActive)}>
            Home
          </NavLink>

          <NavLink to="/users" className={({ isActive }) => getLinkClasses(isActive)}>
            <div className="flex items-center justify-center gap-1 sm:gap-2">
              Users
              {usersCount > 0 && (
                <span
                  aria-label={`${usersCount} users`}
                  className="text-xs bg-red-500 text-white rounded-full px-1.5 py-0.5 leading-none min-w-[20px] text-center"
                >
                  {usersCount}
                </span>
              )}
            </div>
          </NavLink>

          <NavLink to="/bookmarked" className={({ isActive }) => getLinkClasses(isActive)}>
            <div className="flex items-center justify-center gap-1 sm:gap-2">
              Bookmarked
              {bookmarkedCount > 0 && (
                <span
                  aria-label={`${bookmarkedCount} bookmarked items`}
                  className="text-xs bg-red-500 text-white rounded-full px-1.5 py-0.5 leading-none min-w-[20px] text-center"
                >
                  {bookmarkedCount}
                </span>
              )}
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
