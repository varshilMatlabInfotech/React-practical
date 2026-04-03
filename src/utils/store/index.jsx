import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import PropTypes from 'prop-types';
import rootReducer from 'reducers/index';
import { bookmarksPersistenceMiddleware } from 'middleware/bookmarksPersistence';

const reduxStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookmarksPersistenceMiddleware),
  devTools: true,
});

const Store = ({ children }) => <Provider store={reduxStore}>{children}</Provider>;

Store.propTypes = {
  children: PropTypes.node,
};

export default Store;
