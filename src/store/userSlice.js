import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    cache: {}, // Key: page number, Value: list of users
    loading: false,
    error: null,
    page: 1,
  },
  reducers: {
    setUsersForPage: (state, action) => {
      const { page, users } = action.payload;
      state.cache[page] = users;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    clearCache: (state) => {
      state.cache = {};
    },
  },
});

export const { setUsersForPage, setLoading, setError, setPage, clearCache } = userSlice.actions;
export default userSlice.reducer;
