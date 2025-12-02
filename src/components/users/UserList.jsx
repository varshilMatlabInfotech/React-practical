import React, { useContext } from 'react';
import UserListItem from './UserListItem';
import { UsersListContext } from 'contexts/usersListContext';

const UserList = () => {
    const {
        users,
        bookmarks,
        loading,
        error,
        onLoadMore,
        onToggleBookmark,
        showLoadMore,
        isLoadMoreDisabled,
    } = useContext(UsersListContext);
    const isBookmarked = (user) => bookmarks.some((b) => b.id === user.id);

    return (
        <div className="bg-white border border-gray-300 p-2">
            {error && (
                <div className="mb-2 px-2 py-1.5 text-xs text-red-700 bg-red-50">
                    {error}
                </div>
            )}

            <div className="max-h-[400px] overflow-y-auto">
                {users.map((user) => (
                    <UserListItem
                        key={user.id}
                        user={user}
                        isBookmarked={isBookmarked(user)}
                        onToggleBookmark={onToggleBookmark}
                    />
                ))}

                {!loading && users.length === 0 && !error && (
                    <div className="py-3 text-sm text-center text-gray-500">
                        No users to show.
                    </div>
                )}
            </div>

            <div className="text-center mt-2">
                {loading && <div className="text-xs text-gray-500">Loading...</div>}
                {!loading && showLoadMore && (
                    <button
                        type="button"
                        className={`border-none bg-transparent text-sm ${isLoadMoreDisabled
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-blue-600 underline cursor-pointer'
                            }`}
                        onClick={isLoadMoreDisabled ? undefined : onLoadMore}
                        disabled={isLoadMoreDisabled}
                    >
                        Load more
                    </button>
                )}
            </div>
        </div>
    );
};

export default UserList;

