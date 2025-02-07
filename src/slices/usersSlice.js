// src/slices/usersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk to fetch users. We use the "since" parameter for pagination.
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (since = 0, thunkAPI) => {
    const response = await fetch(`https://api.github.com/users?since=${since}`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
    since: 0,
    refreshing: false,
  },
  reducers: {
    // Called when doing pull-to-refresh.
    refreshUsers(state) {
      state.list = [];
      state.since = 0;
      state.refreshing = true;
    },
    clearRefresh(state) {
      state.refreshing = false;
    },
    // Update the bookmarked property on a user in the list.
    updateBookmarkStatus(state, action) {
      const { login, bookmarked } = action.payload;
      state.list = state.list.map(user =>
        user.login === login ? { ...user, bookmarked } : user
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
         state.list = [
          ...state.list,
          ...action.payload.map(user => ({ ...user, bookmarked: false })),
        ];
        if (action.payload.length > 0) {
           state.since = action.payload[action.payload.length - 1].id;
        }
        state.refreshing = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.refreshing = false;
      });
  },
});

export const { refreshUsers, clearRefresh, updateBookmarkStatus } = usersSlice.actions;
export default usersSlice.reducer;
