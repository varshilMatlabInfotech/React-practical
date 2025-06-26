import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { RoutePath } from 'common/enums/enumConstant';
import Page404 from 'pages/page404/index';
import BookMark from 'pages/BookMark/BookMark';
import SavedBookmark from 'pages/SavedBookmark/SavedBookmark';
import Tabs from 'Components/Tabs/Tabs';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Tabs/>} />
          <Route path={RoutePath.PAGE_404} element={<Page404/>}/>
         
          {/* <Route path={RoutePath.PAGE_BOOKMARK} element={<BookMark/>}/>
          <Route path={RoutePath.PAGE_SAVEDBOOKMARK} element={<SavedBookmark/>}/> */}

          {/* Navigate to '/404' page when user entered unknown/non-declare path */}
          <Route path="*" element={<Navigate to={RoutePath.PAGE_404} replace/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
