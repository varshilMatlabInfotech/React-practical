import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const API_URL = import.meta.env.VITE_GITHUB_API_URL;
const PER_PAGE = import.meta.env.VITE_GITHUB_PER_PAGE || 20;

export const fetchUsers = async (page = 1, perPage = PER_PAGE) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        since: (page - 1) * perPage,
        per_page: perPage
      },
      headers: {
        Accept: 'application/vnd.github.v3+json'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error.response?.data?.message || error.message;
  }
};

export const loadUsers = createAsyncThunk(
  'users/loadUsers',
  async (page, { rejectWithValue }) => {
    try {
      const response = await fetchUsers(page);
      return { data: response, page };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    loading: false,
    error: null,
    page: 1,
    hasMore: true,
    searchTerm: '',
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    resetUsers: (state) => {
      state.data = [];
      state.page = 1;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [...state.data, ...action.payload.data];
        state.page = action.payload.page + 1;
        state.hasMore = action.payload.data.length > 0;
      })
      .addCase(loadUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSearchTerm, resetUsers } = usersSlice.actions;
export default usersSlice.reducer;