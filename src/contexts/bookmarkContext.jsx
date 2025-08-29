import React, { createContext, useState, useEffect } from 'react';

export const BookmarkContext = createContext({
  bookmarkedUsers: [],
  addBookmark: () => {},
  removeBookmark: () => {},
});

export const BookmarkProvider = ({ children }) => {
  const [bookmarkedUsers, setBookmarkedUsers] = useState(() => {
    try {
      const stored = localStorage.getItem('bookmarkedUsers');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('bookmarkedUsers', JSON.stringify(bookmarkedUsers));
  }, [bookmarkedUsers]);

  useEffect(() => {
    const sync = (event) => {
      if (event.key === 'bookmarkedUsers') {
        setBookmarkedUsers(event.newValue ? JSON.parse(event.newValue) : []);
      }
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  const addBookmark = (user) => {
    setBookmarkedUsers((prev) => {
      if (prev.some((u) => u.id === user.id)) return prev;
      return [...prev, user];
    });
  };

  const removeBookmark = (userId) => {
    setBookmarkedUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  return <BookmarkContext.Provider value={{ bookmarkedUsers, addBookmark, removeBookmark }}>{children}</BookmarkContext.Provider>;
};
