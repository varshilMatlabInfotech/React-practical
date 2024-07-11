import { axiosInstance } from 'utils/axios/index';

export const GET_ALL_USERS = 'GET_ALL_USERS';

const getAllUsers = () => {
  return async (dispatch, getState) => {
    const { data } = await axiosInstance.get('/users');
    console.log('data', data);
  };
};
