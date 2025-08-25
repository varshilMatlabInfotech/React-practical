import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from 'reducers/index';
import PropTypes from 'prop-types';
import { thunk } from '../../../node_modules/redux-thunk/dist/redux-thunk';

let reduxStore;

const configureStore = () => {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
};

reduxStore = configureStore();

const Store = ({ children }) => <Provider store={reduxStore}>{children}</Provider>;
Store.propTypes = {
  children: PropTypes.node,
};

export default Store;
