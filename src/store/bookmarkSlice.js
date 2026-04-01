import { createSlice } from '@reduxjs/toolkit';

const bookmarkSlice = createSlice({
  name: 'bookmarks',
  initialState: {
    items: [],
  },
  reducers: {
    toggleBookmark: (state, action) => {
      const user = action.payload;
      const index = state.items.findIndex((item) => item.id === user.id);
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(user);
      }
    },
    removeBookmark: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { toggleBookmark, removeBookmark } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
