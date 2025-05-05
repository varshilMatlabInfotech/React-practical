import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUsers } from '../api/github';

export const loadUsers = createAsyncThunk('users/load', async (since, { rejectWithValue }) => {
  try {
    const response = await fetchUsers(since);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    loading: false,
    since: 0,
  },
  reducers: {
    resetUsers: (state) => {
      state.list = [];
      state.since = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = [...state.list, ...action.payload];
        state.since = action.payload[action.payload.length - 1]?.id || state.since;
      })
      .addCase(loadUsers.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { resetUsers } = usersSlice.actions;
export default usersSlice.reducer;
