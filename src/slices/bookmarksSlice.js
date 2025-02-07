// src/slices/bookmarksSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: JSON.parse(localStorage.getItem('bookmarkedUsers')) || [],
};

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    addBookmark(state, action) {
      state.list.push(action.payload);
      localStorage.setItem('bookmarkedUsers', JSON.stringify(state.list));
    },
    removeBookmark(state, action) {
      state.list = state.list.filter(user => user.login !== action.payload.login);
      localStorage.setItem('bookmarkedUsers', JSON.stringify(state.list));
    },
     setBookmarks(state, action) {
      state.list = action.payload;
    },
  },
});

export const { addBookmark, removeBookmark, setBookmarks } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
