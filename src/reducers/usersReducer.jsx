import { createslice } from '@reduxjs/toolkit';
import { fetchUsers } from '/usersSlice';

const usersSlice = createslice({
  name: 'users',
  initialState: {
    users: [],
    Bookmarks: JSON.parse(localStorage.getItem('bookmakes')) || [],
    status: 'idle',
  },
  reducers:{},
  extraReducers:(builder) => {

    builder.addCase(fetchUsers,fulfilled,
        (state,action) => {
            state.users =
            [...state.users , ...action.payload];
        });
  },

});
export default usersSlice.reducers;