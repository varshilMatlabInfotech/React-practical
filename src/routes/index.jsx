import Layout from 'layout/index';
import Bookmarks from 'modules/bookmarks/index';
import Users from 'modules/users/index';
import Page404 from 'pages/page404/index';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Users userType={1} />,
      },
      {
        path: 'bookmarks',
        element: <Users userType={2} />,
      },
    ],
  },
  {
    path: '*',
    element: <Page404 />,
  },
]);

export default router;
