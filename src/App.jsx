import React, { useCallback, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { RoutePath } from 'common/enums/enumConstant';
import Page404 from 'pages/page404/index';
import UserList from 'pages/usersList/index';
import PageHeader from 'pages/PageHeader/PageHeader';
import { GetUserAction } from 'store/actions/userAction';
import { useDispatch } from 'react-redux';
import BookMark from 'pages/bookMark/bookMark';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    usersInfo()
  }, [])

  const usersInfo = useCallback(() => {
    dispatch(GetUserAction())
  }, [dispatch])


  return (
    <div>
      <BrowserRouter>
        <PageHeader />
        <Routes>
          <Route exact path="/" element={<>React app..</>} />
          <Route exact path={RoutePath.USER} element={<UserList />} />
          <Route exact path={RoutePath.BOOKMARK} element={<BookMark />} />
          <Route path={RoutePath.PAGE_404} element={<Page404 />} />
          <Route path="*" element={<Navigate to={RoutePath.PAGE_404} replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
