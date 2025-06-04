import { createSlice } from '@reduxjs/toolkit';
import { saveBookmarks, loadBookmarks } from 'utils/storage';

const initialState = {
  list: loadBookmarks(),
  filteredList: loadBookmarks(),
  searchQuery: '',
};

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    addBookmark: (state, action) => {
      const user = action.payload;
      if (!state.list.some(bookmark => bookmark.id === user.id)) {
        state.list = [...state.list, user];
        state.filteredList = state.searchQuery
          ? state.list.filter(user => 
              user.login.toLowerCase().includes(state.searchQuery.toLowerCase())
            )
          : state.list;
        saveBookmarks(state.list);
      }
    },
    removeBookmark: (state, action) => {
      const userId = action.payload;
      state.list = state.list.filter(user => user.id !== userId);
      state.filteredList = state.searchQuery
        ? state.list.filter(user => 
            user.login.toLowerCase().includes(state.searchQuery.toLowerCase())
          )
        : state.list;
      saveBookmarks(state.list);
    },
    searchBookmarks: (state, action) => {
      state.searchQuery = action.payload;
      state.filteredList = action.payload
        ? state.list.filter(user => 
            user.login.toLowerCase().includes(action.payload.toLowerCase())
          )
        : state.list;
    },
    resetBookmarks: (state) => {
      state.list = [];
      state.filteredList = [];
      state.searchQuery = '';
      saveBookmarks([]);
    },
  },
});

export const {
  addBookmark,
  removeBookmark,
  searchBookmarks,
  resetBookmarks,
} = bookmarksSlice.actions;

export default bookmarksSlice.reducer; 