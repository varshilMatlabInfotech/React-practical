import {
  USERS_FETCH_START,
  USERS_LOAD_MORE_START,
  USERS_FETCH_SUCCESS,
  USERS_FETCH_FAILURE,
  USERS_SET_ACTIVE_PAGE,
} from 'constants/actionTypes';
import { fetchUsersPage } from 'services/githubUsers';

function fetchNextPage() {
  return async (dispatch, getState) => {
    const { users } = getState();
    const { pages, loading, loadingMore, hasMore } = users;

    if (loading || loadingMore) return;
    if (pages.length > 0 && !hasMore) return;

    const since =
      pages.length > 0
        ? pages[pages.length - 1][pages[pages.length - 1].length - 1].id
        : undefined;

    if (pages.length === 0) {
      dispatch({ type: USERS_FETCH_START });
    } else {
      dispatch({ type: USERS_LOAD_MORE_START });
    }

    try {
      const page = await fetchUsersPage(since);
      dispatch({
        type: USERS_FETCH_SUCCESS,
        payload: {
          pageUsers: page,
          replaceAll: pages.length === 0,
        },
      });
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || 'Failed to load users';
      dispatch({ type: USERS_FETCH_FAILURE, payload: String(message) });
      throw err;
    }
  };
}

export function goToPage(targetPage) {
  return async (dispatch, getState) => {
    if (targetPage < 1) return;

    if (getState().users.pages[targetPage - 1]) {
      dispatch({ type: USERS_SET_ACTIVE_PAGE, payload: targetPage });
      return;
    }

    while (!getState().users.pages[targetPage - 1]) {
      const { pages, hasMore, loading, loadingMore } = getState().users;
      if (pages.length > 0 && !hasMore) {
        dispatch({
          type: USERS_SET_ACTIVE_PAGE,
          payload: Math.max(1, pages.length),
        });
        return;
      }
      if (loading || loadingMore) return;
      try {
        await dispatch(fetchNextPage());
      } catch {
        return;
      }
    }
    dispatch({ type: USERS_SET_ACTIVE_PAGE, payload: targetPage });
  };
}

export function loadUsersInitial() {
  return (dispatch) => dispatch(goToPage(1));
}

export function refreshUsers() {
  return async (dispatch) => {
    dispatch({ type: USERS_FETCH_START });
    try {
      const page = await fetchUsersPage(undefined);
      dispatch({
        type: USERS_FETCH_SUCCESS,
        payload: { pageUsers: page, replaceAll: true },
      });
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || 'Failed to load users';
      dispatch({ type: USERS_FETCH_FAILURE, payload: String(message) });
      throw err;
    }
  };
}
