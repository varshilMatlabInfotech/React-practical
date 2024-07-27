import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import Store from 'utils/store';
import ErrorBoundaryProvider from 'contexts/errorBoundary/index';
import { store } from './store.js'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  {/* <ErrorBoundaryProvider> */}
    {/* <Store> */}
      <App />
    {/* </Store> */}
  {/* </ErrorBoundaryProvider> */}
  </Provider>
);

