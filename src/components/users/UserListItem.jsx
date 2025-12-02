import React from 'react';
import PropTypes from 'prop-types';

const UserListItem = ({ user, isBookmarked, onToggleBookmark }) => {
    const displayName =
        user.login && user.login.length > 0
            ? user.login.charAt(0).toUpperCase() + user.login.slice(1)
            : user.login;

    return (
        <div className="flex justify-between items-center py-1.5 px-1 border-b border-gray-200">
            <div className="flex items-center gap-2">
                <img
                    className="w-8 h-8 rounded-full"
                    src={user.avatar_url}
                    alt={user.login}
                />
                <div className="flex flex-col">
                    <div className="font-semibold text-sm">{displayName}</div>
                </div>
            </div>
            <button
                type="button"
                className={`border-none bg-transparent cursor-pointer text-xl leading-none p-0 ${isBookmarked ? 'text-yellow-500' : 'text-gray-400'
                    }`}
                onClick={() => onToggleBookmark(user)}
            >
                <span aria-hidden="true">{isBookmarked ? '★' : '☆'}</span>
            </button>
        </div>
    );
};

UserListItem.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        login: PropTypes.string.isRequired,
        avatar_url: PropTypes.string.isRequired,
    }).isRequired,
    isBookmarked: PropTypes.bool.isRequired,
    onToggleBookmark: PropTypes.func.isRequired,
};

export default UserListItem;


