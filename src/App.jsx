import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { RoutePath } from 'common/enums/enumConstant';
import Page404 from 'pages/page404/index';
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from 'common/Header';
import Home from 'pages/Home';
import Bookmark from 'pages/Bookmark';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/bookmark" element={<Bookmark/>} />
          <Route path={RoutePath.PAGE_404} element={<Page404/>}/>

          {/* Navigate to '/404' page when user entered unknown/non-declare path */}
          <Route path="*" element={<Navigate to={RoutePath.PAGE_404} replace/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
