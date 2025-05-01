import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const Home = lazy(() => import("./screens/Home"));
const BookMarked = lazy(() => import("./screens/BookMarked"));
const PageNotFound = lazy(() => import("./screens/PageNotFound"));
import MainLayout from "./components/MainLayout";
import Loader from "./components/Loader";

function App() {
  const appRoutes = [
    {
      path: "/",
      element: MainLayout,
      children: [
        { path: "", element: Home },
        { path: "/bookmarked", element: BookMarked },
      ],
    },
    {
      path: "*",
      element: PageNotFound,
    },
  ];

  const allRoutes = (routes) => {
    return routes.map(({ path, element: Element, children }) => ({
      path,
      element: (
        <Suspense
          fallback={
            <div className="w-full h-screen flex justify-center items-center">
              <Loader />
            </div>
          }
        >
          <Element />
        </Suspense>
      ),
      children: children ? allRoutes(children) : undefined,
    }));
  };

  const router = createBrowserRouter(allRoutes(appRoutes));

  return <RouterProvider router={router} />;
}

export default App;
