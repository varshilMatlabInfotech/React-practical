import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import rootReducer from 'reducers/index';
import { createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'user',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(persistedReducer);
let persistor = persistStore(store);

const Store = ({ children }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  </Provider>
);
Store.propTypes = {
  children: PropTypes.node,
};

export default Store;
