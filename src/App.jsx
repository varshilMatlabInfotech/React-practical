import Bookmark from 'pages/Bookmark';
import User from 'pages/user';
import React from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';

function AppRoutes() {
  let routes = useRoutes([
    { path: '/', element: <User /> },
    { path: '/bookmark', element: <Bookmark /> },
  ]);
  return routes;
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
