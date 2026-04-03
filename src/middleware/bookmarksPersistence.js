import { BOOKMARK_ADD, BOOKMARK_REMOVE } from 'constants/actionTypes';
import { BOOKMARKS_STORAGE_KEY } from 'constants/github';

export const bookmarksPersistenceMiddleware =
  (store) => (next) => (action) => {
    const result = next(action);
    if (action.type === BOOKMARK_ADD || action.type === BOOKMARK_REMOVE) {
      try {
        const { users } = store.getState().bookmarks;
        localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(users));
      } catch (err) {
        console.error('Error saving bookmarks to storage', err);
      }
    }
    return result;
  };
