import axios from 'axios';

export const fetchUsers = (since = 0) =>
  axios.get(`https://api.github.com/users?since=${since}&per_page=20`);
