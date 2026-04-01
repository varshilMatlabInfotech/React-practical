import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';
import Home from './pages/Home';
import Loader from './common/Loader';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <Home />
      </PersistGate>
    </Provider>
  );
}

export default App;
