import React, { memo, useEffect, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { bookmark } from "../store/features/authSlice";
import { FaBookmark } from "react-icons/fa";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const UserTable = memo(
  ({ users, pagination = false, searchEnabled = false, title }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = pagination ? 7 : users.length;

    const dispatch = useDispatch();
    const bookmarkedUsers = useSelector(
      (state) => state.auth.bookmarkedUsers || []
    );

    const filteredUsers = users.filter((user) =>
      user.login.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );

    const totalUsers = filteredUsers.length;
    const totalPages = Math.ceil(totalUsers / usersPerPage);
    const startIndex = (currentPage - 1) * usersPerPage;
    const currentUsers = filteredUsers.slice(
      startIndex,
      startIndex + usersPerPage
    );

    const handleBookmark = (user) => {
      dispatch(bookmark(user));
    };

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedSearchTerm(searchTerm);
      }, 300);

      return () => {
        clearTimeout(handler);
      };
    }, [searchTerm]);

    return (
      <div className="mt-10 mb-8 container mx-auto px-4 sm:px-8 lg:px-40">
        {searchEnabled && (
          <div className="mb-4 flex justify-between items-center">
            <p className="italic text-lg">{title}</p>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by login name"
              className="px-4 py-2 border border-gray-600 rounded-md w-60 bg-gray-700"
            />
          </div>
        )}

        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                {["ID", "Avatar", "Login Name", "Bookmark"].map(
                  (title, index) => (
                    <th
                      key={index}
                      className="px-5 py-3 border-b-2 border-gray-900 bg-gray-900 text-xs font-semibold text-gray-400 uppercase text-center"
                    >
                      {title}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr
                  key={index}
                  className="bg-gray-800 hover:bg-gray-700 transition"
                >
                  <td className="px-5 py-2 border-b border-gray-900 text-sm text-center">
                    {user.id}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-900 text-sm">
                    <div className="w-full flex justify-center">
                      <img
                        src={user.avatar_url}
                        alt={user.login}
                        className="w-10 h-10 rounded-full"
                      />
                    </div>
                  </td>
                  <td className="px-5 py-2 border-b border-gray-900 text-sm text-center">
                    {user.login}
                  </td>
                  <td className="px-5 py-2 border-b border-gray-900 text-sm text-center">
                    <button onClick={() => handleBookmark(user)}>
                      {bookmarkedUsers.some((u) => u.id === user.id) ? (
                        <FaBookmark size={20} />
                      ) : (
                        <CiBookmark size={20} />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalUsers === 0 && (
            <p className="text-center py-4 text-gray-300 italic bg-gray-800">
              No users found.
            </p>
          )}
        </div>

        {pagination && totalPages > 1 && (
          <div className="flex justify-center mt-4 items-center">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1 bg-gray-600 text-white rounded-full disabled:bg-gray-800"
            >
              <GrFormPrevious />
            </button>
            <span className="mx-4 text-xs">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-1 bg-gray-600 text-white rounded-full disabled:bg-gray-800"
            >
              <GrFormNext />
            </button>
          </div>
        )}
      </div>
    );
  }
);

export default UserTable;
