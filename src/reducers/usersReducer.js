import { listUsers, getNextSinceFromUsers } from 'api/userAPI';

// Action types
const USERS_FETCH_START = 'users/fetchStart';
const USERS_FETCH_SUCCESS = 'users/fetchSuccess';
const USERS_FETCH_FAILURE = 'users/fetchFailure';
const USERS_RESET = 'users/reset';
const USERS_SET_QUERY = 'users/setQuery';

// Action creators
export const usersFetchStart = () => ({ type: USERS_FETCH_START });
export const usersFetchSuccess = (payload) => ({ type: USERS_FETCH_SUCCESS, payload });
export const usersFetchFailure = (payload) => ({ type: USERS_FETCH_FAILURE, payload });
export const usersReset = () => ({ type: USERS_RESET });
export const usersSetQuery = (query) => ({ type: USERS_SET_QUERY, payload: query });

const initialState = {
  items: [],
  loading: false,
  error: null,
  since: 0,
  perPage: 10,
  query: '',
  refreshedAt: null,
  hasMore: true,
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case USERS_FETCH_START:
      return { ...state, loading: true, error: null };
    case USERS_FETCH_SUCCESS: {
      const { users, append, nextSince, hasMore } = action.payload;
      const merged = append ? [...state.items, ...users] : users;
      const computedNextSince = nextSince ?? getNextSinceFromUsers(merged);
      return {
        ...state,
        loading: false,
        items: merged,
        since: computedNextSince,
        refreshedAt: Date.now(),
        hasMore: typeof hasMore === 'boolean' ? hasMore : true,
      };
    }
    case USERS_FETCH_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case USERS_RESET:
      return { ...initialState };
    case USERS_SET_QUERY:
      return { ...state, query: action.payload };
    default:
      return state;
  }
}

// Thunks
export const fetchUsers =
  (opts = {}) =>
  async (dispatch, getState) => {
    const { append = false, reset = false } = opts;
    const { users } = getState();
    try {
      dispatch(usersFetchStart());
      const since = reset ? 0 : append ? users.since : 0;
      const perPage = users.perPage;
      const { users: newUsers, nextSince, hasMore } = await listUsers({ since, perPage });

      const existingIds = new Set(append ? users.items.map((u) => u.id) : []);
      const unique = append ? newUsers.filter((u) => !existingIds.has(u.id)) : newUsers;
      dispatch(usersFetchSuccess({ users: unique, append: append && !reset, nextSince, hasMore }));
    } catch (err) {
      dispatch(usersFetchFailure(err?.message || 'Failed to load users'));
    }
  };

export const refreshUsers = () => async (dispatch) => {
  await dispatch(fetchUsers({ reset: true }));
};
