import axios from '../../node_modules/axios/index';

export const GET_ALL_USERS = 'GET_ALL_USERS';
export const GET_BOOKEDMARK_USERS = 'GET_BOOKEDMARK_USERS';
export const SET_ERROR = 'SET_ERROR';
export const SET_BOOKMARK_IDS = 'SET_BOOKMARK_IDS';
export const SET_SEARCH = 'SET_SEARCH';
export const getUser = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('https://api.github.com/users');
      if (response.status === 200) {
        if (response?.data?.length) {
          const data = response?.data.map((item) => {
            return {
              ...item,
              is_bookMarked: false,
            };
          });
          dispatch({
            type: GET_ALL_USERS,
            data: data || [],
          });
        }
      }
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        data: err.message,
      });
    }
  };
};

export const handleBookmarkAction = (id) => {
  return (dispatch, getState) => {
    const state = getState();
    const list = state.user.users;
    if (list?.length) {
      const index = list.findIndex((item) => item?.id === id);
      if (index !== -1) {
        list[index].is_bookMarked = list[index].is_bookMarked ? false : true;
      }
      dispatch({
        type: GET_ALL_USERS,
        data: list || [],
      });
    }
  };
};

export const handleSearchAction = (name) => {
  return (dispatch, getState) => {
    const state = getState();
      dispatch({
        type: SET_SEARCH,
        data: name || [],
      });
    
    
  };
};
