import axios from 'axios';
import { GITHUB_USERS_API, USERS_PER_PAGE } from 'constants/github';

export async function fetchUsersPage(since) {
  const params = { per_page: USERS_PER_PAGE };
  if (since != null) params.since = since;
  const { data } = await axios.get(GITHUB_USERS_API, { params });
  return data;
}
