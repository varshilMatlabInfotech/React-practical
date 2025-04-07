import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

export const fetchUsers = createAsyncThunk(
    'https://api.github.com/users',
    async () => {
        const { data } = await axios.get('https://api.github.com/users')
        return data
    },
)

const initialState = {
    users: [],
    bookedmarkUsers: [],
}

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload
        },
        addToBookmark: (state, action) => {
            state.users = state.users.filter(item => item.id !== action.payload.id)
            state.bookedmarkUsers = [...state.bookedmarkUsers, action.payload]
            toast.success('Bookmarked!')
        },
        removeFromBookmark : (state, action) => {
            state.bookedmarkUsers = state.bookedmarkUsers.filter(item => item.id !== action.payload.id)
            state.users = [...state.users, action.payload]
            toast.success('Removed from Bookmark')
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload
        })
    },
})

export const { addToBookmark, setUsers,removeFromBookmark } = userSlice.actions

export default userSlice.reducer