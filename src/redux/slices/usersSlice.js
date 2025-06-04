import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  filteredList: [],
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
  searchQuery: '',
  isRefreshing: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUsersStart: (state, action) => {
      const isRefreshing = action.payload?.isRefreshing;
      state.loading = !isRefreshing;
      state.isRefreshing = isRefreshing;
      state.error = null;
    },
    fetchUsersSuccess: (state, action) => {
      const { users, hasNextPage, currentPage, isNewPage } = action.payload;
      state.loading = false;
      state.isRefreshing = false;
      state.error = null;
      
      if (isNewPage) {
        state.list = [...state.list, ...users];
      } else {
        state.list = users;
      }
      
      state.filteredList = state.searchQuery
        ? state.list.filter(user => 
            user.login.toLowerCase().includes(state.searchQuery.toLowerCase())
          )
        : state.list;
      
      state.hasMore = hasNextPage;
      state.page = currentPage;
    },
    fetchUsersFailure: (state, action) => {
      state.loading = false;
      state.isRefreshing = false;
      state.error = action.payload;
    },
    searchUsers: (state, action) => {
      state.searchQuery = action.payload;
      state.filteredList = action.payload
        ? state.list.filter(user => 
            user.login.toLowerCase().includes(action.payload.toLowerCase())
          )
        : state.list;
    },
    resetUsers: (state) => {
      state.list = [];
      state.filteredList = [];
      state.page = 1;
      state.hasMore = true;
      state.searchQuery = '';
      state.error = null;
      state.isRefreshing = false;
    },
  },
});

export const {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
  searchUsers,
  resetUsers,
} = usersSlice.actions;

export default usersSlice.reducer; 