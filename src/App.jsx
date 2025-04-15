import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RoutePath } from 'common/enums/enumConstant';
import Page404 from 'pages/page404/index';
import UsersPage from 'pages/user/UsersPage';
import BookmarkedPage from 'pages/user/BookmarkedPage';
import TabsPage from 'pages/tabPage/TabsPage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<TabsPage />} />
          <Route path={RoutePath.PAGE_404} element={<Page404 />} />
          {/* <Route path={RoutePath.TABS} element={<TabsPage />} />  */}
          {/* Fallback route for unknown paths */}
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
