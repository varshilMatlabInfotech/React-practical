export const USERS_PER_PAGE = 10;

export const SEARCH_USERS_PER_PAGE = 20;

export const GITHUB_API_BASE_URL = "https://api.github.com";

export const GITHUB_API_VERSION = "2022-11-28";

export const GITHUB_USERS_ENDPOINT = `${GITHUB_API_BASE_URL}/users`;

export const GITHUB_SEARCH_USERS_ENDPOINT = `${GITHUB_API_BASE_URL}/search/users`;

export const USER_COLLECTION_CONFIG = {
  followers: { path: "followers", perPage: 20 },
  following: { path: "following", perPage: 20 },
  repos: {
    path: "repos",
    perPage: 10,
    params: { sort: "updated", direction: "desc" },
  },
};
