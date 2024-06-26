import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import { RoutePath } from 'common/enums/enumConstant';
import Page404 from 'pages/page404/index';
import Users from 'components/users/Users';
import BookedUser from 'components/bookedMark/BookedUser';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<div>React-practical</div>} />
          <Route path={RoutePath.PAGE_404} element={<Page404/>}/>
          <Route path={RoutePath.USER} element={<Users/>}/>
          <Route path={RoutePath.BOOKEDMARKS} element={<BookedUser/>}/>

          {/* <Route path={RoutePath.BOOKEDMARKS} element={<BookedUser/>}/> */}


          {/* Navigate to '/404' page when user entered unknown/non-declare path */}
          <Route path="*" element={<Navigate to={RoutePath.PAGE_404} replace/>}/>
         
        </Routes>
     
      </BrowserRouter>
 
    </div>
  );
}

export default App;
