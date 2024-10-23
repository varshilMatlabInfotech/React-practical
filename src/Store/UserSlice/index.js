import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import userResponse from './../response.json'

const initialState = {
  user: [],
  loading: 'pending',
  error: null
}
 export const fetchUser = createAsyncThunk(
    'users',
    async ( ) => {
     
      // const response = await axios.get(`https://api.github.com/users`, {
      // })
      return Promise.resolve(userResponse)
    },
  )

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setBookmark: (state, action) => {
     state.user = action.payload
    },
  },
    extraReducers: (builder) => {
        builder
          .addCase(fetchUser.pending, (state, action) => {
              state.loading = 'pending'

          })
      
          .addCase(fetchUser.fulfilled, (state, action) => {
             state.loading = 'idle'
              const data = action.payload.map((item) => { return { ...item, bookmark: false } })
              state.user = data

            
          })
          
          .addCase(fetchUser.rejected, (state, action) => {
            console.log("action.payload",action.payload)

              state.loading = 'idle'
                state.error = action.error
          })
      },
   
    
  
})

// Action creators are generated for each case reducer function
export const { setBookmark } = userSlice.actions

export default userSlice.reducer




