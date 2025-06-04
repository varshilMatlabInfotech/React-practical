import axios from 'axios';

const GITHUB_API_BASE_URL = 'https://api.github.com';
const PER_PAGE = 10; 

const api = axios.create({
  baseURL: GITHUB_API_BASE_URL,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    'Authorization': `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 429) {
      return Promise.reject(new Error('GitHub API rate limit exceeded. Please try again later.'));
    }
    return Promise.reject(error);
  }
);

export const getUsers = async (page = 1) => {
  console.log("page", page);
  try {
    const response = await api.get('/users', {
      params: {
        since: (page - 1) * PER_PAGE,
        per_page: PER_PAGE,
      },
    });

    const linkHeader = response.headers.link;
    let hasNextPage = false;

    if (linkHeader) {
      const links = linkHeader.split(',').map(link => {
        const [url, rel] = link.split(';');
        return {
          url: url.trim().slice(1, -1),
          rel: rel.trim().split('=')[1].slice(1, -1)
        };
      });

      hasNextPage = links.some(link => link.rel === 'next');
    }

    return {
      users: response.data,
      hasNextPage,
      currentPage: page
    };
  } catch (error) {
    if (error.response?.status === 403) {
      throw new Error('GitHub API rate limit exceeded. Please try again later.');
    }
    throw new Error(error.message || 'Failed to fetch users');
  }
};

export default api; 