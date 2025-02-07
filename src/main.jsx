import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// import ErrorBoundaryProvider from 'contexts/errorBoundary/index';
import { Provider } from 'react-redux';
import { persistor, store } from 'redux/store';
import { PersistGate } from 'redux-persist/integration/react';
ReactDOM.createRoot(document.getElementById('root')).render(
  // <ErrorBoundaryProvider>
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  // </ErrorBoundaryProvider>,
);
