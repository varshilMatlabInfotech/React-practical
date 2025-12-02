import { createContext } from 'react';

export const UsersListContext = createContext({
    users: [],
    bookmarks: [],
    loading: false,
    error: null,
    onLoadMore: () => { },
    onToggleBookmark: () => { },
    showLoadMore: false,
    isLoadMoreDisabled: false,
});
