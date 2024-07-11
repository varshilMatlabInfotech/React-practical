import { axiosInstance } from 'utils/axios/index';

export const GET_ALL_USERS = 'GET_ALL_USERS';
export const UPDATE_USER_BOOKMARK = 'UPDATE_USER_BOOKMARK';

export const getAllUsers = () => {
  return async (dispatch, getState) => {
    const { data } = await axiosInstance.get('/users');

    dispatch({
      type: GET_ALL_USERS,
      payload: data.map((val) => {
        return { ...val, isBookmarked: false };
      }),
    });
  };
};

export const updateUserBookmark = (id, isBookmarked) => {
  return async (dispatch, getState) => {
    dispatch({
      type: UPDATE_USER_BOOKMARK,
      payload: { id, isBookmarked },
    });
  };
};
