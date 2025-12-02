import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadBookmarksFromStorage, saveBookmarksToStorage } from 'utils/store/bookmarkStorage';

const initialState = {
    users: [],
    isLoading: false,
    error: null,
    since: 0,
    hasMore: true,
    activeTab: 'users',
    searchQuery: '',
    bookmarks: loadBookmarksFromStorage(),
};

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async ({ refresh = false } = {}, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const {
                usersState: { since: currentSince },
            } = state;

            const since = refresh ? 0 : currentSince;
            const url = `https://api.github.com/users?since=${since}&per_page=15`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Failed to fetch users: ${response.status}`);
            }

            const data = await response.json();

            return { data, refresh };
        } catch (error) {
            const message = error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        toggleBookmark: (state, action) => {
            const user = action.payload;
            const exists = state.bookmarks.find((u) => u.id === user.id);
            const updatedBookmarks = exists
                ? state.bookmarks.filter((u) => u.id !== user.id)
                : [...state.bookmarks, user];

            saveBookmarksToStorage(updatedBookmarks);

            state.bookmarks = updatedBookmarks;
        },
        setActiveTab: (state, action) => {
            state.activeTab = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.isLoading = false;

                const { data, refresh } = action.payload;
                const mergedUsers =
                    refresh || state.users.length === 0 ? data : [...state.users, ...data];

                const lastUser = mergedUsers[mergedUsers.length - 1];

                state.users = mergedUsers;
                state.since = lastUser ? lastUser.id : state.since;
                state.hasMore = data.length > 0;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Something went wrong while fetching users';
            });
    },
});

export const { toggleBookmark, setActiveTab, setSearchQuery } = usersSlice.actions;

export default usersSlice.reducer;
