import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookMark: [],
};

export const bookmarkSlice = createSlice({
  name: 'bookMark',
  initialState,
  reducers: {
    handleBookMark: (state, action) => {
      state.bookMark = action.payload;
    },
  },
});

export const { handleBookMark } = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
