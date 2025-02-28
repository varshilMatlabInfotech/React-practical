import { configureStore } from '@reduxjs/toolkit'
import BookmarkSlice from './BookmarkReducer'
 

export const store = configureStore({
  reducer: {
    bookmarkApp: BookmarkSlice,
  },
})