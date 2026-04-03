import {
  BOOKMARK_ADD,
  BOOKMARK_REMOVE,
  BOOKMARKS_SYNC_FROM_STORAGE,
} from 'constants/actionTypes';

export function syncBookmarksFromStorage(users) {
  return { type: BOOKMARKS_SYNC_FROM_STORAGE, payload: users };
}

export function toggleBookmark(user) {
  return (dispatch, getState) => {
    const exists = getState().bookmarks.users.some((u) => u.id === user.id);
    if (exists) {
      dispatch({ type: BOOKMARK_REMOVE, payload: user.id });
    } else {
      dispatch({ type: BOOKMARK_ADD, payload: user });
    }
  };
}
