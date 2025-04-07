import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { RoutePath } from 'common/enums/enumConstant';
import Page404 from 'pages/page404/index';
import Home from 'Components/Home';
import Header from 'Components/Header';
import Bookmarks from 'Components/Bookmarks';
import { UsersProvider } from 'contexts/users/userContext';
import { store } from './app/store'
import { Provider } from 'react-redux'

function App() {
  return (
    <div>
      <Provider store={store}>
        <UsersProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/bookmarks" element={<Bookmarks />} />
              <Route path={RoutePath.PAGE_404} element={<Page404 />} />

              {/* Navigate to '/404' page when user entered unknown/non-declare path */}
              <Route path="*" element={<Navigate to={RoutePath.PAGE_404} replace />} />
            </Routes>
          </BrowserRouter>
        </UsersProvider>
      </Provider>
    </div>
  );
}

export default App;
