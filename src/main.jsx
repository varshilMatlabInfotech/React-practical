 import ReactDOM from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import App from './App';
import './index.css';
import Store from 'utils/store';
import ErrorBoundaryProvider from 'contexts/errorBoundary/index';
import { appTheme } from 'theme/appTheme';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundaryProvider>
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Store>
        <App />
      </Store>
    </ThemeProvider>
  </ErrorBoundaryProvider>,
);

