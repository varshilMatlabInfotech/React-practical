import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookmarkedUsers: [],
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    bookmark: (state, action) => {
      const user = action.payload;
      const existingIndex = state.bookmarkedUsers.findIndex(
        (u) => u.id === user.id
      );
      if (existingIndex === -1) {
        state.bookmarkedUsers.push(user);
      } else {
        state.bookmarkedUsers.splice(existingIndex, 1);
      }
    },
  },
});

export const { bookmark } = authSlice.actions;
export default authSlice.reducer;
