import { createSlice } from '@reduxjs/toolkit';

// Helper function to load bookmarked users from localStorage
const loadBookmarkedUsers = () => {
  const savedBookmarks = localStorage.getItem('bookmarkedUsers');
  return savedBookmarks ? JSON.parse(savedBookmarks) : [];
};

// Helper function to save bookmarked users to localStorage
const saveBookmarkedUsers = (bookmarkedUsers) => {
  localStorage.setItem('bookmarkedUsers', JSON.stringify(bookmarkedUsers));
};

const initialState = {
  users: [],
  bookmarkedUsers: loadBookmarkedUsers(), // Load bookmarked users from localStorage
  page: 1,
  loading: false,
  error: null
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      // Prevent duplicate users when adding new ones
      const newUsers = action.payload.filter(newUser =>
        !state.users.some(existingUser => existingUser.id === newUser.id)
      );
      state.users = [...state.users, ...newUsers];
    },
    setPage: (state) => {
      state.page += 1;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    toggleBookmark: (state, action) => {
      const userId = action.payload;
      const isBookmarked = state.bookmarkedUsers.includes(userId);

      if (isBookmarked) {
        // Remove from bookmarks
        state.bookmarkedUsers = state.bookmarkedUsers.filter(id => id !== userId);
      } else {
        // Add to bookmarks
        state.bookmarkedUsers.push(userId);
      }

      // Save updated bookmarks to localStorage
      saveBookmarkedUsers(state.bookmarkedUsers);
    },
    clearUsers: (state) => {
      state.users = [];
      state.page = 1;
    }
  }
});

export const {
  setUsers,
  setPage,
  setLoading,
  setError,
  toggleBookmark,
  clearUsers
} = usersSlice.actions;

export default usersSlice.reducer;
