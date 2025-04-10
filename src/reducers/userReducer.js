import { ActionType } from "common/action/actionType";

const initialState = {
  user: []
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.ALL_BOOKMARK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
    case ActionType.ADD_BOOKMARK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
    case ActionType.DELETE_BOOKMARK:
      return {
        ...state,
        // tasks: state.tasks.filter(task => task !== action.payload)
        tasks: [...state.tasks, action.payload]
      };
    default:
      return state;
  }
};

export default userReducer;