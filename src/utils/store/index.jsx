import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from 'reducers/index';
import PropTypes from 'prop-types';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import { PersistGate } from 'redux-persist/integration/react';


const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk)) 
);

const persistor = persistStore(store);



const Store = ({ children }) => <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    {children}
  </PersistGate>
</Provider>

Store.propTypes = {
  children: PropTypes.node,
};

export default Store;
