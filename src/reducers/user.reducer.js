import * as Action from '../actions/user.action';
const initialState = {
  users: [],
  error: undefined,
  bookemarkedIds:[]
};
const userReducer = (state = initialState, action) => {

  switch (action.type) {
    case Action.GET_ALL_USERS:
      return {
        ...state,
        users: action.data,
      };
      case Action.SET_BOOKMARK_IDS:
        return {
          ...state,
          bookemarkedIds: action.data,
        };
        case Action.SET_SEARCH:
        return {
          ...state,
          searchdText: action.data,
        };
    default:
      return {
        ...initialState,
      };
  }
};
export default userReducer;
