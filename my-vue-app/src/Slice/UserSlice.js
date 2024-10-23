import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userJson from './users.json';

export const getUsers = createAsyncThunk('user/getUsers', async () => {
  // const response = await axios.get('https://api.github.com/users');
  return userJson;
});

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: 0,
    usersData: [],
    status: null,
    users: '',
    userBookMark: [],
  },
  reducers: {
    setUsersBookMark: (state, action) => {
      state.userBookMark = action?.payload;
    },
    setUsers: (state, action) => {
      state.users = action?.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        console.log('actionnn', action);
        state.usersData = action?.payload;
        state.status = 'succeeded';

        // Add any fetched posts to the array
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown Error';
      });
  },
});

// Action creators are generated for each case reducer function
export const { setUsersBookMark, setUsers } = userSlice.actions;

export default userSlice.reducer;
