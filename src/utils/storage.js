const STORAGE_KEY = 'github_users_bookmarks';

export const saveBookmarks = (bookmarks) => {
  try {
    const minimalBookmarks = bookmarks.map(user => ({
      login: user.login,
      avatar_url: user.avatar_url,
      id: user.id,
      html_url: user.html_url
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(minimalBookmarks));
  } catch (error) {
    console.error('Error saving bookmarks:', error);
  }
};

export const loadBookmarks = () => {
  try {
    const bookmarks = localStorage.getItem(STORAGE_KEY);
    return bookmarks ? JSON.parse(bookmarks) : [];
  } catch (error) {
    console.error('Error loading bookmarks:', error);
    return [];
  }
};

export const isOffline = () => {
  return !navigator.onLine;
};

export const getBookmarkedUser = (login) => {
  try {
    const bookmarks = loadBookmarks();
    return bookmarks.find(user => user.login === login);
  } catch (error) {
    console.error('Error getting bookmarked user:', error);
    return null;
  }
}; 