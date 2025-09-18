import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useEffect } from 'react';
import { fetchUsers } from 'reducers/userSlice';
import { useDispatch } from 'react-redux';
const Layout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  return (
    <>
      <div className={'sidebar'}>
        <Sidebar />
      </div>
      <div className={'main-content'}>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
