import {
  BOOKMARK_ADD,
  BOOKMARK_REMOVE,
  BOOKMARKS_SYNC_FROM_STORAGE,
} from 'constants/actionTypes';
import { BOOKMARKS_STORAGE_KEY } from 'constants/github';

function readStoredUsers() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

const initialState = {
  users: readStoredUsers(),
};

export default function bookmarksReducer(state = initialState, action) {
  switch (action.type) {
    case BOOKMARK_ADD: {
      const user = action.payload;
      if (state.users.some((u) => u.id === user.id)) return state;
      return { users: [...state.users, user] };
    }
    case BOOKMARK_REMOVE: {
      const id = action.payload;
      return { users: state.users.filter((u) => u.id !== id) };
    }
    case BOOKMARKS_SYNC_FROM_STORAGE: {
      const users = action.payload;
      return Array.isArray(users) ? { users } : state;
    }
    default:
      return state;
  }
}
