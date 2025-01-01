import { FETCH_USERS_SUCCESS, FETCH_USERS_ERROR, ADD_BOOKMARK, REMOVE_BOOKMARK } from './actionTypes';

export const fetchUsers = () => async (dispatch) => {
    try {
        const response = await fetch('https://api.github.com/users');
        const data = await response.json();
        dispatch({ type: FETCH_USERS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_USERS_ERROR, payload: error.message });
    }
};

export const addBookmark = (user) => ({
    type: ADD_BOOKMARK,
    payload: user,
});

export const removeBookmark = (id) => ({
    type: REMOVE_BOOKMARK,
    payload: id,
});
