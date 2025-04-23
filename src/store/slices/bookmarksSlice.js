import { createSlice } from "@reduxjs/toolkit";

const loadBookmarksFromStorage = () => {
  try {
    const serializedState = localStorage.getItem("bookmarkedUsers");
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return [];
  }
};

export const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState: {
    data: loadBookmarksFromStorage(),
    searchTerm: "",
  },
  reducers: {
    addBookmark: (state, action) => {
      const existingIndex = state.data.findIndex((user) => user.id === action.payload.id);
      if (existingIndex === -1) {
        state.data.push(action.payload);
        localStorage.setItem("bookmarkedUsers", JSON.stringify(state.data));
      }
    },
    removeBookmark: (state, action) => {
      state.data = state.data.filter((user) => user.id !== action.payload);
      localStorage.setItem("bookmarkedUsers", JSON.stringify(state.data));
    },
    setBookmarkSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { addBookmark, removeBookmark, setBookmarkSearchTerm } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
