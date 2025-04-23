import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slices/usersSlice";
import bookmarksReducer from "./slices/bookmarksSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    bookmarks: bookmarksReducer,
  }
});
