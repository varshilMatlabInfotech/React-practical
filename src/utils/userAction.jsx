import axios from 'axios';

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export const fetchUsers = () => async (dispatch) => {
  dispatch({ type: FETCH_USERS_REQUEST });

  try {
    const response = await axios.get('https://api.github.com/users');
    dispatch({ type: FETCH_USERS_SUCCESS, payload: response.data });
    localStorage.setItem('fetchedUsers', JSON.stringify(response.data));
  } catch (error) {
    dispatch({
      type: FETCH_USERS_FAILURE,
      payload: error.message || 'Something went wrong',
    });
  }
};
