// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/usersSlice';
import bookmarksReducer from './slices/bookmarksSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    bookmarks: bookmarksReducer,
  },
});

export default store;
