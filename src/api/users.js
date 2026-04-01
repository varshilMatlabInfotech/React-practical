import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.github.com',
});

export const getUsers = (since = 0) => {
  return api.get(`/users?since=${since}&per_page=10`);
};

export default api;
