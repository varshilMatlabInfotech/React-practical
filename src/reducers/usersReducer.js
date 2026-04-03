import {
  USERS_FETCH_START,
  USERS_LOAD_MORE_START,
  USERS_FETCH_SUCCESS,
  USERS_FETCH_FAILURE,
  USERS_SET_ACTIVE_PAGE,
} from 'constants/actionTypes';
import { USERS_PER_PAGE } from 'constants/github';

const initialState = {
  pages: [],
  activePage: 1,
  loading: false,
  loadingMore: false,
  error: null,
  hasMore: true,
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case USERS_SET_ACTIVE_PAGE:
      return { ...state, activePage: action.payload };
    case USERS_FETCH_START:
      return { ...state, loading: true, error: null };
    case USERS_LOAD_MORE_START:
      return { ...state, loadingMore: true, error: null };
    case USERS_FETCH_SUCCESS: {
      const { pageUsers, replaceAll } = action.payload;
      const chunkHasMore = pageUsers.length >= USERS_PER_PAGE;
      if (replaceAll) {
        return {
          ...state,
          pages: [pageUsers],
          activePage: 1,
          loading: false,
          loadingMore: false,
          error: null,
          hasMore: chunkHasMore,
        };
      }
      return {
        ...state,
        pages: [...state.pages, pageUsers],
        loading: false,
        loadingMore: false,
        error: null,
        hasMore: chunkHasMore,
      };
    }
    case USERS_FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        loadingMore: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
