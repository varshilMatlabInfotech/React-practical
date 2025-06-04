import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import store from './redux/store';
import ErrorBoundaryProvider from 'contexts/errorBoundary/index';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundaryProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ErrorBoundaryProvider>,
);

