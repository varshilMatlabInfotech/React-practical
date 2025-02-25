import React from 'react';
import bookmakesReducer from 'reducers/bookmarksReducer';
import usersReducer from 'reducers/usersReducer';
import  {configureStore} from "@reduxjs/toolkit";
const Store = configureStore ({
  reducer :{
    users :usersReducer ,
    Bookmarks : bookmakesReducer,

  },
});

export default Store;
