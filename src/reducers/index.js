import { combineReducers } from 'redux';
import usersReducer from '../features/users/usersSlice';
import bookmarkedReducer from '../features/users/BookmarkedSlice';

const rootReducer = combineReducers({
  users: usersReducer,
  bookmarks: bookmarkedReducer,
});

export default rootReducer;
