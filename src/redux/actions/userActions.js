import { ADD_BOOKMARK_USERS, GET_BOOKMARK_USERS, GET_USERS } from 'redux/types/userTypes';

export const getUsers = (users) => ({
  type: GET_USERS,
  payload: users,
});

export const getBookmarkUsers = (users) => ({
  type: GET_BOOKMARK_USERS,
  payload: users,
});

export const addBookmarkUsers = (users) => ({
  type: ADD_BOOKMARK_USERS,
  payload: users,
});
