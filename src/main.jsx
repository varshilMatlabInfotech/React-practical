import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; 
import ErrorBoundaryProvider from 'contexts/errorBoundary/index';
import { Provider } from 'react-redux';
import { store } from 'reducers/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundaryProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ErrorBoundaryProvider>,
);

