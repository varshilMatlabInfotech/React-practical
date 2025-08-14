import { createSlice } from '@reduxjs/toolkit'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    fetchUsers(state, action) {
      state.push({
        id: action.payload.id,
        name: action.payload.name,
      })
    },
  },
})

export const { fetchUsers } = usersSlice.actions
export default usersSlice.reducer