// import { createSlice } from "../../node_modules/@reduxjs/toolkit/dist/index";

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  try {
    const response = await axios.get('https://api.github.com/users');

    if (response?.data) {
      return response?.data;
    }
  } catch (e) {
    console.error(e);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    bookmarkUsers: [],
    loading: false,
  },
  reducers: {
    addBookmark: (state, action) => {
      let id = action.payload;
      let newUser = state.users?.filter((user) => user?.id === id);

      state.users = state.users?.filter((user) => user?.id !== id);
      state.bookmarkUsers = [state.bookmarkUsers, ...newUser].flat();
    },
    removeBookmark: (state, action) => {
      let id = action.payload;
      let newUser = state.bookmarkUsers?.filter((user) => user?.id === id);
      state.bookmarkUsers = state.bookmarkUsers?.filter((user) => user?.id !== id);
      state.users = [state.users, ...newUser].flat();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
  },
});

export const { addBookmark, removeBookmark } = userSlice.actions;
export default userSlice.reducer;
