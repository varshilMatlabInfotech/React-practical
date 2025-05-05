import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import store from 'utils/store';
import ErrorBoundaryProvider from 'contexts/errorBoundary/index';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundaryProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ErrorBoundaryProvider>,
);

