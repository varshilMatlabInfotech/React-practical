import { ADD_BOOKMARK_USERS, GET_BOOKMARK_USERS, GET_USERS } from 'redux/types/userTypes';

const initialState = {
  items: [],
  bookMarksUsers: [],
  loading: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return { ...state, items: action.payload };
    case GET_BOOKMARK_USERS:
      return { ...state, items: action.payload };
    case ADD_BOOKMARK_USERS:
      return { ...state, bookMarksUsers: action.payload };
    default:
      return state;
  }
};
