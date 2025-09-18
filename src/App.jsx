import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { RoutePath } from 'common/enums/enumConstant';
import Page404 from 'pages/page404/index';
import Users from 'modules/users/index';
import Bookmarks from 'modules/bookmarks/index';
import Layout from 'layout/index';
import { RouterProvider } from '../node_modules/react-router-dom/dist/index';
import router from './routes/index';

function App() {
  return (
    <div>
      <RouterProvider router={router} />
      {/* <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Layout />} />
          <Route path="/users" element={<Users />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path={RoutePath.PAGE_404} element={<Page404 />} />

          <Route path="*" element={<Navigate to={RoutePath.PAGE_404} replace />} />
        </Routes>
      </BrowserRouter> */}
    </div>
  );
}

export default App;
