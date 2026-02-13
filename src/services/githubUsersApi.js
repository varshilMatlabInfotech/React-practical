import axios from "axios";
import {
  GITHUB_API_VERSION,
  GITHUB_SEARCH_USERS_ENDPOINT,
  GITHUB_USERS_ENDPOINT,
} from "../utils/githubConfig";

const client = axios.create({
  headers: {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": GITHUB_API_VERSION,
  },
});

export const getUsers = async ({ since, perPage }) => {
  const response = await client.get(GITHUB_USERS_ENDPOINT, {
    params: { since, per_page: perPage },
  });

  return Array.isArray(response.data) ? response.data : [];
};

export const searchUsers = async ({ query, page, perPage }) => {
  const response = await client.get(GITHUB_SEARCH_USERS_ENDPOINT, {
    params: {
      q: `${query} in:login in:name`,
      per_page: perPage,
      page,
    },
  });

  const items = Array.isArray(response.data?.items)
    ? response.data.items
    : [];
  const totalCount = response.data?.total_count ?? 0;

  return { items, totalCount };
};

export const getUserDetails = async (login) => {
  if (!login) {
    return null;
  }

  const response = await client.get(
    `${GITHUB_USERS_ENDPOINT}/${login}`
  );

  return response.data;
};

export const getUserCollection = async ({
  login,
  path,
  page,
  perPage,
  params,
}) => {
  if (!login || !path) {
    return [];
  }

  const response = await client.get(
    `${GITHUB_USERS_ENDPOINT}/${login}/${path}`,
    {
      params: {
        per_page: perPage,
        page,
        ...(params || {}),
      },
    }
  );

  return Array.isArray(response.data) ? response.data : [];
};
