import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ErrorBoundaryProvider from 'contexts/errorBoundary/index';
import rootReducer from 'reducers/index';
import './index.css';

const store = createStore(rootReducer);

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundaryProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ErrorBoundaryProvider>,
);

