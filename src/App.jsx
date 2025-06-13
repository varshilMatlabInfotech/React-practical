import DataList from 'components/DataList';
import './index.css'
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router";

// let router = createBrowserRouter([
//   {
//     path: "/",
//     Component: <DataList/>,
//   },
// ]);


function App() {
  return (
    <>
    {/* <RouterProvider router={router}/> */}
    <div>
        <DataList/>
    </div>
    </>
  )
}

export default App;
