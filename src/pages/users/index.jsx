import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchUsers,
    setActiveTab,
    setSearchQuery,
    toggleBookmark,
} from 'reducers/users';
import UserList from 'components/users/UserList';
import { UsersListContext } from 'contexts/usersListContext';
import useThrottledValue from 'components/users/useThrottledValue';

const TABS = {
    USERS: 'users',
    BOOKMARKS: 'bookmarks',
};

const PAGE_SIZE = 15;

const UsersPage = () => {
    const dispatch = useDispatch();
    const { users, bookmarks, activeTab, isLoading, error, searchQuery, hasMore } = useSelector(
        (state) => state.usersState,
    );

    const [rawSearch, setRawSearch] = useState(searchQuery);
    const [bookmarkPage, setBookmarkPage] = useState(1);
    const throttledSearch = useThrottledValue(rawSearch, 300);

    useEffect(() => {
        dispatch(setSearchQuery(throttledSearch));
    }, [dispatch, throttledSearch]);

    useEffect(() => {
        if (!users.length) {
            dispatch(fetchUsers());
        }
    }, [dispatch, users.length]);

    const handleTabChange = (tab) => {
        dispatch(setActiveTab(tab));
        if (tab === TABS.BOOKMARKS) {
            setBookmarkPage(1);
        }
    };

    const handleLoadMore = () => {
        if (activeTab === TABS.BOOKMARKS) {
            setBookmarkPage((prev) => prev + 1);
        } else {
            if (!isLoading && hasMore) {
                dispatch(fetchUsers());
            }
        }
    };

    const handleToggleBookmark = (user) => {
        dispatch(toggleBookmark(user));
    };

    const handleSearchChange = (event) => {
        setRawSearch(event.target.value);
    };

    const normalizedSearch = searchQuery.trim().toLowerCase();

    const filteredUsers = useMemo(() => {
        const list = activeTab === TABS.USERS ? users : bookmarks;
        if (!normalizedSearch) return list;

        return list.filter((user) => user.login.toLowerCase().includes(normalizedSearch));
    }, [activeTab, bookmarks, normalizedSearch, users]);

    const isBookmarksTab = activeTab === TABS.BOOKMARKS;

    const visibleUsers = useMemo(() => {
        if (!isBookmarksTab) return filteredUsers;

        const maxCount = bookmarkPage * PAGE_SIZE;
        return filteredUsers.slice(0, maxCount);
    }, [filteredUsers, isBookmarksTab, bookmarkPage]);

    const hasMoreBookmarksToShow = isBookmarksTab && visibleUsers.length < filteredUsers.length;

    const showLoadMore =
        (!isBookmarksTab && hasMore && filteredUsers.length >= PAGE_SIZE) || hasMoreBookmarksToShow;

    const isLoadMoreDisabled = isBookmarksTab
        ? !hasMoreBookmarksToShow
        : !hasMore;

    return (
        <div className="max-w-[900px] mx-auto px-4">
            <h1 className="mb-3 text-xl">Users</h1>

            <div className="flex gap-4 border-b border-gray-300 mb-3 text-sm">
                <button
                    type="button"
                    className={`border-none bg-transparent px-0 pb-1.5 cursor-pointer ${activeTab === TABS.USERS
                        ? 'text-blue-600 border-b-2 border-blue-600 font-semibold'
                        : 'text-gray-500'
                        }`}
                    onClick={() => handleTabChange(TABS.USERS)}
                >
                    Users
                </button>
                <button
                    type="button"
                    className={`border-none bg-transparent px-0 pb-1.5 cursor-pointer ${activeTab === TABS.BOOKMARKS
                        ? 'text-blue-600 border-b-2 border-blue-600 font-semibold'
                        : 'text-gray-500'
                        }`}
                    onClick={() => handleTabChange(TABS.BOOKMARKS)}
                >
                    Bookmarked ({bookmarks.length})
                </button>
            </div>

            <div className="mb-3">
                <div className="relative inline-block w-full">
                    <input
                        type="text"
                        className="w-full px-2 py-1.5 pr-6 border border-gray-300 text-sm"
                        placeholder="Search..."
                        value={rawSearch}
                        onChange={handleSearchChange}
                    />
                    {rawSearch && (
                        <button
                            type="button"
                            className="absolute right-1.5 top-1/2 -translate-y-1/2 border-none bg-transparent cursor-pointer p-0 text-sm text-gray-500"
                            onClick={() => setRawSearch('')}
                            aria-label="Clear search"
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>

            <UsersListContext.Provider
                value={{
                    users: visibleUsers,
                    bookmarks,
                    loading: isLoading,
                    error,
                    onLoadMore: handleLoadMore,
                    onToggleBookmark: handleToggleBookmark,
                    showLoadMore,
                    isLoadMoreDisabled,
                }}
            >
                <UserList />
            </UsersListContext.Provider>
        </div>
    );
};

export default UsersPage;

