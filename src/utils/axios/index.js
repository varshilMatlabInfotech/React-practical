import axios from '../../../node_modules/axios/index';

export const axiosInstance = axios.create({ baseURL: 'https://api.github.com' });
