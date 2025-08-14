import { createSlice } from '@reduxjs/toolkit'

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState: [],
  reducers: {
    setBookmarkSearchQuery(state, action) {
      state.push({
        id: action.payload.id,
        search: action.payload.searchVal
      })
    },
  },
})

export const { setBookmarkSearchQuery } = bookmarksSlice.actions
export default bookmarksSlice.reducer