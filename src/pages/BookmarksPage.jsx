import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import useThrottle from "../utils/useThrottle";
import SearchBar from "../common/components/SearchBar";
import UserCard from "../common/components/UserCard";

export default function BookmarksPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookmarks, searchTerm } = useSelector(
    (state) => state.users
  );

  const throttledSearch = useThrottle(searchTerm, 300);

  const filtered = bookmarks.filter((user) =>
    user.login
      .toLowerCase()
      .includes(throttledSearch.toLowerCase())
  );

  const handleSelect = (user) => {
    navigate(`/user/${user.login}`, {
      state: { from: location.pathname || "/" },
    });
  };

  return (
    <>
      <SearchBar />

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
        <div className="scroll-panel max-h-[58vh] space-y-4 pr-2 sm:max-h-[60vh] md:max-h-[65vh] lg:max-h-[70vh]">
          {filtered.length === 0 ? (
            <p className="text-sm text-gray-500">
              No bookmarked users yet.
            </p>
          ) : (
            filtered.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onSelect={handleSelect}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
