import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './userSlice.jsx';

const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export default store;