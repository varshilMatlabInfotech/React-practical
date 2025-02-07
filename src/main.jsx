import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
 import store from './store';
import ErrorBoundaryProvider from 'contexts/errorBoundary/index';
import { Provider } from '../node_modules/react-redux/es/exports';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundaryProvider>
    < Provider store={store}>
      <App />
    </Provider>
  </ErrorBoundaryProvider>,
);

