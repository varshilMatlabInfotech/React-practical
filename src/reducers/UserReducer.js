import {
  SEARCH_USERS_PER_PAGE,
  USERS_PER_PAGE,
} from "../utils/githubConfig";

const readStoredBookmarks = () => {
  if (typeof window === "undefined" || !window.localStorage) {
    return [];
  }

  try {
    const raw = localStorage.getItem("bookmarks");
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error("Failed to parse bookmarks from storage.", error);
    return [];
  }
};

const initialState = {
  users: [],
  since: 0,
  loading: false,
  error: null,
  usersPageIndex: 0,
  usersPageHistory: [],
  usersHasNext: true,
  usersPerPage: USERS_PER_PAGE,
  searchResults: [],
  searchPage: 1,
  searchHasMore: true,
  searchLoading: false,
  searchError: null,
  searchQuery: "",
  searchTotal: 0,
  searchPerPage: USERS_PER_PAGE,
  detailsLoading: false,
  detailsLoadingLogin: null,
  detailsError: null,
  userDetailsByLogin: {},
  userCollections: {},
  bookmarks: readStoredBookmarks(),
  searchTerm: "",
};

const createCollectionState = () => ({
  items: [],
  page: 1,
  hasMore: true,
  loading: false,
  error: null,
});

const getCollectionState = (state, login, key) =>
  state.userCollections?.[login]?.[key] ||
  createCollectionState();

const setCollectionState = (state, login, key, next) => {
  const existing = state.userCollections?.[login] || {};

  return {
    ...state,
    userCollections: {
      ...state.userCollections,
      [login]: {
        ...existing,
        [key]: next,
      },
    },
  };
};

function usersReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_USERS_REQUEST":
      return { ...state, loading: true, error: null };

    case "FETCH_USERS_SUCCESS": {
      const {
        users,
        reset,
        pageIndex,
        since,
        lastId,
        hasNext,
      } = action.payload;
      const nextUsers = users;
      const nextHistory = reset
        ? [
            {
              users: nextUsers,
              since,
              lastId,
              hasNext,
            },
          ]
        : [
            ...state.usersPageHistory,
            {
              users: nextUsers,
              since,
              lastId,
              hasNext,
            },
          ];

      return {
        ...state,
        users: nextUsers,
        since: lastId,
        loading: false,
        error: null,
        usersPageHistory: nextHistory,
        usersPageIndex: pageIndex,
        usersHasNext: hasNext,
      };
    }

    case "FETCH_USERS_FAILURE":
      return { ...state, loading: false, error: action.payload };

    case "SET_USERS_PAGE": {
      const pageIndex = action.payload;
      const page = state.usersPageHistory[pageIndex];

      if (!page) {
        return state;
      }

      return {
        ...state,
        users: page.users,
        usersPageIndex: pageIndex,
        usersHasNext: page.hasNext,
        since: page.lastId ?? state.since,
      };
    }

    case "SEARCH_USERS_REQUEST":
      return {
        ...state,
        searchLoading: true,
        searchError: null,
      };

    case "SEARCH_USERS_SUCCESS": {
      const {
        items,
        query,
        page,
        hasMore,
        totalCount,
      } = action.payload;

      return {
        ...state,
        searchResults: items,
        searchQuery: query,
        searchPage: page,
        searchHasMore: hasMore,
        searchLoading: false,
        searchError: null,
        searchTotal: totalCount,
      };
    }

    case "SEARCH_USERS_FAILURE":
      return {
        ...state,
        searchLoading: false,
        searchError: action.payload,
      };

    case "CLEAR_SEARCH_RESULTS":
      return {
        ...state,
        searchResults: [],
        searchQuery: "",
        searchPage: 1,
        searchHasMore: true,
        searchLoading: false,
        searchError: null,
        searchTotal: 0,
      };

    case "SET_USERS_PER_PAGE": {
      const nextPerPage = action.payload;

      return {
        ...state,
        usersPerPage: nextPerPage,
        searchPerPage: nextPerPage,
        users: [],
        since: 0,
        loading: false,
        error: null,
        usersPageIndex: 0,
        usersPageHistory: [],
        usersHasNext: true,
        searchResults: [],
        searchPage: 1,
        searchHasMore: true,
        searchLoading: false,
        searchError: null,
        searchQuery: "",
        searchTotal: 0,
      };
    }

    case "FETCH_USER_DETAILS_REQUEST":
      return {
        ...state,
        detailsLoading: true,
        detailsLoadingLogin: action.payload.login,
        detailsError: null,
      };

    case "FETCH_USER_DETAILS_SUCCESS": {
      const { login, details } = action.payload;

      return {
        ...state,
        detailsLoading: false,
        detailsLoadingLogin: null,
        detailsError: null,
        userDetailsByLogin: {
          ...state.userDetailsByLogin,
          [login]: details,
        },
      };
    }

    case "FETCH_USER_DETAILS_FAILURE":
      return {
        ...state,
        detailsLoading: false,
        detailsLoadingLogin: null,
        detailsError: action.payload.error,
      };

    case "FETCH_USER_COLLECTION_REQUEST": {
      const { login, collectionKey } = action.payload;
      const collectionState = getCollectionState(
        state,
        login,
        collectionKey
      );

      return setCollectionState(state, login, collectionKey, {
        ...collectionState,
        loading: true,
        error: null,
      });
    }

    case "FETCH_USER_COLLECTION_SUCCESS": {
      const {
        login,
        collectionKey,
        items,
        hasMore,
        page,
      } = action.payload;
      const collectionState = getCollectionState(
        state,
        login,
        collectionKey
      );

      return setCollectionState(state, login, collectionKey, {
        ...collectionState,
        items,
        loading: false,
        error: null,
        hasMore,
        page,
      });
    }

    case "FETCH_USER_COLLECTION_FAILURE": {
      const { login, collectionKey, error } = action.payload;
      const collectionState = getCollectionState(
        state,
        login,
        collectionKey
      );

      return setCollectionState(state, login, collectionKey, {
        ...collectionState,
        loading: false,
        error,
      });
    }

    case "TOGGLE_BOOKMARK":
      const exists = state.bookmarks.find(
        (u) => u.id === action.payload.id
      );

      const updated = exists
        ? state.bookmarks.filter((u) => u.id !== action.payload.id)
        : [...state.bookmarks, action.payload];

      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("bookmarks", JSON.stringify(updated));
      }

      return { ...state, bookmarks: updated };

    case "SYNC_BOOKMARKS":
      return { ...state, bookmarks: action.payload || [] };

    case "SET_SEARCH":
      return { ...state, searchTerm: action.payload };

    default:
      return state;
  }
}

export default usersReducer;
