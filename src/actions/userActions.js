import {
  SEARCH_USERS_PER_PAGE,
  USERS_PER_PAGE,
  USER_COLLECTION_CONFIG,
} from "../utils/githubConfig";
import {
  getUserCollection,
  getUserDetails,
  getUsers,
  searchUsers,
} from "../services/githubUsersApi";

const emptyCollection = {
  items: [],
  page: 1,
  hasMore: true,
  loading: false,
  error: null,
};

export const loadUsers = async (
  dispatch,
  usersState,
  options = {}
) => {
  const { reset = false } = options;
  const perPage =
    usersState.usersPerPage || USERS_PER_PAGE;

  if (usersState.loading) {
    return;
  }

  const currentIndex = usersState.usersPageIndex || 0;
  const history = usersState.usersPageHistory || [];
  const nextIndex = reset ? 0 : currentIndex + 1;

  if (!reset && history[nextIndex]) {
    dispatch({
      type: "SET_USERS_PAGE",
      payload: nextIndex,
    });
    return;
  }

  dispatch({ type: "FETCH_USERS_REQUEST" });

  try {
    const fallbackSince =
      usersState.users[usersState.users.length - 1]?.id ||
      0;
    const sinceValue = reset
      ? 0
      : history[currentIndex]?.lastId ?? fallbackSince;

    const nextUsers = await getUsers({
      since: sinceValue,
      perPage,
    });
    const lastUser = nextUsers[nextUsers.length - 1];
    const hasNext = nextUsers.length === perPage;

    dispatch({
      type: "FETCH_USERS_SUCCESS",
      payload: {
        users: nextUsers,
        reset,
        pageIndex: nextIndex,
        since: sinceValue,
        lastId: lastUser?.id ?? sinceValue,
        hasNext,
      },
    });
  } catch (error) {
    dispatch({
      type: "FETCH_USERS_FAILURE",
      payload: error?.message || "Failed to load users.",
    });
  }
};

export const loadUserDetails = async (
  dispatch,
  detailState,
  login
) => {
  if (!login) {
    return;
  }

  if (
    detailState.detailsLoading &&
    detailState.detailsLoadingLogin === login
  ) {
    return;
  }

  const cachedDetails = detailState.cachedDetails;
  if (cachedDetails) {
    return;
  }

  dispatch({
    type: "FETCH_USER_DETAILS_REQUEST",
    payload: { login },
  });

  try {
    const details = await getUserDetails(login);
    if (!details) {
      throw new Error("User details not available.");
    }

    dispatch({
      type: "FETCH_USER_DETAILS_SUCCESS",
      payload: { login, details },
    });
  } catch (error) {
    dispatch({
      type: "FETCH_USER_DETAILS_FAILURE",
      payload: {
        login,
        error: error?.message || "Failed to load user details.",
      },
    });
  }
};

export const loadUserCollection = async (
  dispatch,
  login,
  collectionKey,
  collectionState = emptyCollection,
  options = {}
) => {
  const { reset = false, page: pageOverride } = options;
  if (!login) {
    return;
  }

  const config = USER_COLLECTION_CONFIG[collectionKey];
  if (!config) {
    return;
  }

  if (collectionState.loading) {
    return;
  }

  if (pageOverride == null && !collectionState.hasMore && !reset) {
    return;
  }

  const page = pageOverride ?? (reset ? 1 : collectionState.page);
  if (!page || page < 1) {
    return;
  }

  dispatch({
    type: "FETCH_USER_COLLECTION_REQUEST",
    payload: { login, collectionKey },
  });

  try {
    const items = await getUserCollection({
      login,
      path: config.path,
      page,
      perPage: config.perPage,
      params: config.params,
    });
    const hasMore = items.length === config.perPage;

    dispatch({
      type: "FETCH_USER_COLLECTION_SUCCESS",
      payload: {
        login,
        collectionKey,
        items,
        hasMore,
        page,
      },
    });
  } catch (error) {
    dispatch({
      type: "FETCH_USER_COLLECTION_FAILURE",
      payload: {
        login,
        collectionKey,
        error:
          error?.message || "Failed to load user information.",
      },
    });
  }
};

export const loadSearchUsers = async (
  dispatch,
  searchState,
  query,
  options = {}
) => {
  const {
    searchLoading = false,
    searchHasMore = true,
    searchQuery = "",
    searchPage = 1,
    searchPerPage = SEARCH_USERS_PER_PAGE,
  } = searchState || {};
  const { reset = false, page: pageOverride } = options;
  const trimmed = query?.trim() || "";
  if (!trimmed) {
    dispatch({ type: "CLEAR_SEARCH_RESULTS" });
    return;
  }

  const isNewQuery = trimmed !== searchQuery;
  const shouldReset = reset || isNewQuery;

  if (searchLoading) {
    return;
  }

  if (
    pageOverride == null && !searchHasMore && !shouldReset
  ) {
    return;
  }

  const page = pageOverride ?? (shouldReset ? 1 : searchPage);

  dispatch({
    type: "SEARCH_USERS_REQUEST",
    payload: { query: trimmed },
  });

  try {
    const { items, totalCount } = await searchUsers({
      query: trimmed,
      page,
      perPage: searchPerPage,
    });

    const totalPages =
      totalCount > 0
        ? Math.ceil(
            Math.min(totalCount, 1000) / searchPerPage
          )
        : 0;
    const hasMore =
      totalPages > 0
        ? page < totalPages
        : items.length === searchPerPage;

    dispatch({
      type: "SEARCH_USERS_SUCCESS",
      payload: {
        items,
        query: trimmed,
        page,
        hasMore,
        totalCount,
      },
    });
  } catch (error) {
    dispatch({
      type: "SEARCH_USERS_FAILURE",
      payload:
        error?.message || "Failed to search users. Try again.",
    });
  }
};
