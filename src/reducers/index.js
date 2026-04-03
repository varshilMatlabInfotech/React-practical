import { combineReducers } from 'redux';
import usersReducer from 'reducers/usersReducer';
import bookmarksReducer from 'reducers/bookmarksReducer';

const rootReducer = combineReducers({
  users: usersReducer,
  bookmarks: bookmarksReducer,
});

export default rootReducer;
