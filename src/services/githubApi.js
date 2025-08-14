import axios from 'axios';

const API_BASE_URL = 'https://api.github.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const githubApi = {
  getUsers: async (since = 0, perPage = 30) => {
    try {
      const response = await api.get(`/users`, {
        params: {
          since,
          per_page: perPage,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch users');
    }
  },

  getUserByLogin: async (login) => {
    try {
      const response = await api.get(`/users/${login}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user');
    }
  },
};

export default githubApi;
