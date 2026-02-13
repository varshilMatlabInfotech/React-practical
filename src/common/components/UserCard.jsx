import { useDispatch, useSelector } from "react-redux";

export default function UserCard({ user, onSelect }) {
  const dispatch = useDispatch();
  const bookmarks = useSelector(
    (state) => state.users.bookmarks
  );

  const isBookmarked = bookmarks.find(
    (u) => u.id === user.id
  );

  return (
    <div
      className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-gray-300"
      onClick={() => onSelect?.(user)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect?.(user);
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="flex items-center gap-4">
        <img
          src={user.avatar_url}
          alt={user.login}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div>
          <p className="text-xs text-gray-500">GitHub User</p>
          <p className="text-base font-semibold text-gray-900">
            @{user.login}
          </p>
        </div>
      </div>

      <button
        onClick={(event) => {
          event.stopPropagation();
          dispatch({
            type: "TOGGLE_BOOKMARK",
            payload: user,
          });
        }}
        className={`rounded-lg px-3 py-2 text-xs font-semibold ${
          isBookmarked
            ? "bg-red-500 text-white"
            : "border border-gray-200 bg-white text-gray-700"
        }`}
      >
        {isBookmarked ? "Unbookmark" : "Bookmark"}
      </button>
    </div>
  );
}
