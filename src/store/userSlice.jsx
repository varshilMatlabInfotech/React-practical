import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (since, { rejectWithValue }) => {
    try {
      const res = await fetch(`https://api.github.com/users?since=${since}&per_page=30`);
      if (!res.ok) throw new Error('Failed to fetch users');
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    bookmarks: [],
    loading: false,
    error: null,
    since: 0,
  },
  reducers: {
    toggleBookmark: (state, action) => {
      const user = action.payload;
      const exists = state.bookmarks.some((u) => u.id === user.id);
      if (exists) {
        state.bookmarks = state.bookmarks.filter((u) => u.id !== user.id);
      } else {
        state.bookmarks.push(user);
      }
    },
    resetUsers: (state) => {
      state.list = [];
      state.since = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = [...state.list, ...action.payload];
        if (action.payload.length > 0) {
          state.since = action.payload[action.payload.length - 1].id;
        }
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { toggleBookmark, resetUsers } = usersSlice.actions;
export default usersSlice.reducer;