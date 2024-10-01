import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import Store from 'utils/store';
import ErrorBoundaryProvider from 'contexts/errorBoundary/index';
import { MyContextProvider } from 'contexts/Provider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundaryProvider>
    <Store>
      <MyContextProvider>
        <App />
      </MyContextProvider>
    </Store>
  </ErrorBoundaryProvider>,
);
