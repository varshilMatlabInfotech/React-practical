import { combineReducers } from 'redux';
import userReducer from './userReducer';
import bookmarkReducer from './bookmarkReducer'

const rootReducer = combineReducers({
  users: userReducer,
  bookmark: bookmarkReducer
});

export default rootReducer;
