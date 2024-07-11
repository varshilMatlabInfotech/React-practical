import { GET_ALL_USERS } from './userActions';

const initialState = {
  allUsers: [],
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      state.allUsers = action.payload;
      break;

    default:
      break;
  }
}

export default userReducer;
