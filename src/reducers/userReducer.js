import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: [],
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    handleAddRemoveBookMark: (state, action) => {
      state.data = state.data.map((item) => {
        if (action.payload.id === item.id) {
          return { ...item, isBookmarked: action.payload.isBookmarked };
        }
        return item;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { setData, handleAddRemoveBookMark } = userSlice.actions;

export default userSlice.reducer;
