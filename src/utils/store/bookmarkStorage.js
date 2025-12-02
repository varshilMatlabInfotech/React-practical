const BOOKMARKS_KEY = 'github_user_bookmarks';

export const loadBookmarksFromStorage = () => {
    if (typeof window === 'undefined') return [];

    try {
        const raw = window.localStorage.getItem(BOOKMARKS_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed;
    } catch (error) {
        return [];
    }
};

export const saveBookmarksToStorage = (bookmarks) => {
    if (typeof window === 'undefined') return;

    try {
        window.localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    } catch (error) {
        return;
    }
};


