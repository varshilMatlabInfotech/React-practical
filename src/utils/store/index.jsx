import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../../features/usersSlice';
import bookmarksReducer from '../../features/bookmarksSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    bookmarks: bookmarksReducer,
  },
});

export default store;
