import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: null,
}

export const BookmarkSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    bookmark:(state,action)=>{
        state.value = action.payload;
        localStorage.setItem('bookmark',action.payload)
    },
    reset: (state) => {
      state.value = null;
    },
  },
})
 
export const { bookmark, reset} = BookmarkSlice.actions

export default BookmarkSlice.reducer