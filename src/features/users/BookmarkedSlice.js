import { createSlice } from '@reduxjs/toolkit';

const saved = JSON.parse(localStorage.getItem('bookmarked')) || [];

const bookmarkedSlice = createSlice({
  name: 'bookmarks',
  initialState: saved,
  reducers: {
    toggleBookmark: (state, action) => {
      const index = state.findIndex(u => u.id === action.payload.id);
      if (index > -1) {
        state.splice(index, 1);
      } else {
        state.push(action.payload);
      }
      localStorage.setItem('bookmarked', JSON.stringify(state));
    },
  },
});

export const { toggleBookmark } = bookmarkedSlice.actions;
export default bookmarkedSlice.reducer;
