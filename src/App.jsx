import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { RoutePath } from 'common/enums/enumConstant';
import Page404 from 'pages/page404/index';
import Users from 'pages/Users/index'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path={RoutePath.PAGE_404} element={<Page404/>}/>
          <Route path="*" element={<Navigate to={RoutePath.PAGE_404} replace/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
