import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import Store from 'utils/store';
import ErrorBoundaryProvider from 'contexts/errorBoundary/index';
import GlobalProvider from 'contexts/userContext/index';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundaryProvider>
<GlobalProvider>
     {/* <Store> */}
      <App />
    {/* </Store> */}
</GlobalProvider>
 
   
  </ErrorBoundaryProvider>,
);

