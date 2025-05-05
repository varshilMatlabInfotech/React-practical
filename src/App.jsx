import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { RoutePath } from 'common/enums/enumConstant';
import Page404 from 'pages/page404/index';
import Tabs from 'components/Tabs';
import HomePage from 'pages/homePage/HomePage';
import UsersPage from 'pages/users/UsersPage';
import BookmarkedPage from 'pages/bookmarkedPage/BookmarkedPage';
import ScrollToTopButton from 'components/ScrollToTopButton';

function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="max-w-3xl mx-auto p-4">
          <Tabs />
          <Routes>
            <Route path={RoutePath.HOME} element={<HomePage />} />
            <Route path={RoutePath.USERS} element={<UsersPage />} />
            <Route path={RoutePath.BOOKMARK} element={<BookmarkedPage />} />
            <Route path={RoutePath.PAGE_404} element={<Page404 />} />
            <Route path="*" element={<Navigate to={RoutePath.PAGE_404} replace />} />
          </Routes>
          <ScrollToTopButton />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
