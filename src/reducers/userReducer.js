import { GET_ALL_USERS, UPDATE_USER_BOOKMARK } from './userActions';

const initialState = {
  allUsers: [],
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return { ...state, allUsers: action.payload };
    case UPDATE_USER_BOOKMARK:
      return {
        ...state,
        allUsers: state.allUsers?.map((val) => {
          if (val.id === action.payload.id) {
            val.isBookmarked = action.payload.isBookmarked;
          }
          return val;
        }),
      };

    default:
      return state;
  }
}
