import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async (page = 1) => {
  const response = await fetch(`https://api.github.com/users?since=${page * 0}`);
  return await response.json();
});

const UserSlice = createSlice({
  name: "users",
  initialState: { users: [], page: 0, hasMore: true, loading: false, error: null },
  reducers: {
    toggleBookmark: (state, action) => {
      const user = state.users.find((u) => u.id === action.payload.id);
      if (user) user.bookmarked = !user.bookmarked;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => { state.loading = true; })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = [...state.users, ...action.payload];
        state.page += 1;
        state.hasMore = action.payload.length > 0;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load users";
      });
  },
});

export const { toggleBookmark } = UserSlice.actions;
export default UserSlice.reducer;
