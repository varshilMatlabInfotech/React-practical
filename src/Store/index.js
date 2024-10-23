import { configureStore } from '@reduxjs/toolkit'
import userReducer from './UserSlice/index'

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
})