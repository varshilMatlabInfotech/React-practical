const STORAGE_KEY = 'bookmarkedUsers';
const BOOKMARKS_TOGGLE = 'bookmarks/toggle';
const BOOKMARKS_HYDRATE = 'bookmarks/hydrate';

export const bookmarksToggle = (user) => ({ type: BOOKMARKS_TOGGLE, payload: user });
export const bookmarksHydrate = () => ({ type: BOOKMARKS_HYDRATE });

const readFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (_) {
    return {};
  }
};

const writeToStorage = (map) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch (_) {}
};

const initialState = {
  // id -> minimal user snapshot {id, login, avatar_url}
  byId: readFromStorage(),
};

export default function bookmarksReducer(state = initialState, action) {
  switch (action.type) {
    case BOOKMARKS_HYDRATE:
      return { ...state, byId: readFromStorage() };
    case BOOKMARKS_TOGGLE: {
      const user = action.payload;
      const next = { ...state.byId };
      if (user?.id && next[user.id]) {
        delete next[user.id];
      } else if (user?.id) {
        next[user.id] = { id: user.id, login: user.login, avatar_url: user.avatar_url };
      }
      writeToStorage(next);
      return { ...state, byId: next };
    }
    default:
      return state;
  }
}

export const selectIsBookmarked = (state, id) => Boolean(state.bookmarks.byId[id]);
export const selectBookmarksArray = (state) => Object.values(state.bookmarks.byId);
