const loadInitialBookmarks = () => {
  const stored = localStorage.getItem('bookmarks');
  return stored ? JSON.parse(stored) : [];
};

import { createSlice } from '@reduxjs/toolkit';

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState: loadInitialBookmarks(),
  reducers: {
    toggleBookmark: (state, action) => {
      const index = state.findIndex((u) => u.id === action.payload.id);
      if (index >= 0) {
        state.splice(index, 1);
      } else {
        state.push(action.payload);
      }
      localStorage.setItem('bookmarks', JSON.stringify(state));
    },
  },
});

export const { toggleBookmark } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
