import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { RoutePath } from 'common/enums/enumConstant';
import Page404 from 'pages/page404/index';
import UsersPage from 'pages/users/index';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UsersPage />} />
        <Route path={RoutePath.PAGE_404} element={<Page404 />} />
        <Route path="*" element={<Navigate to={RoutePath.PAGE_404} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
