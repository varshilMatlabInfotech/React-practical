import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { RoutePath } from 'common/enums/enumConstant';
import Page404 from 'pages/page404/index';
import { Provider } from "react-redux";
import store from "./store/store";
import { Home } from 'pages/Home/index';

function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path={RoutePath.PAGE_404} element={<Page404 />} />
            <Route path="*" element={<Navigate to={RoutePath.PAGE_404} replace />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
