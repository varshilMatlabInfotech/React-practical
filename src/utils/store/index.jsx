import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import rootReducer from 'reducers/index';
import PropTypes from 'prop-types';

let reduxStore;

const createStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
  });
};

reduxStore = createStore();

const Store = ({children}) => <Provider store={reduxStore}>{children}</Provider>;
Store.propTypes = {
  children: PropTypes.node,
};

export default Store;
