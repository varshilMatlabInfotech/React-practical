import { configureStore } from '@reduxjs/toolkit';
import bookmarkReducer from './Redux/BookMarkSlice';

export const store = configureStore({
  reducer: {
    bookMark: bookmarkReducer,
  },
});
