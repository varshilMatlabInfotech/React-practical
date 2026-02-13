import { combineReducers } from "redux";
import usersReducer from "./UserReducer";

const rootReducer = combineReducers({
  users: usersReducer,
});

export default rootReducer;
