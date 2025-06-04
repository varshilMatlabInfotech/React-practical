import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/usersSlice';
import bookmarksReducer from './slices/bookmarksSlice';
import searchReducer from './slices/searchSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    bookmarks: bookmarksReducer,
    search: searchReducer,
  },
});

export default store; 