import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

let since = 0;

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get(`https://api.github.com/users?since=${since}&per_page=20`);
  since = response.data[response.data.length - 1]?.id || since;
  return response.data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    status: 'idle',
  },
  reducers: {
    refreshUsers: (state) => {
      state.list = [];
      since = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.list = [...state.list, ...action.payload];
      });
  },
});

export const { refreshUsers } = usersSlice.actions;
export default usersSlice.reducer;