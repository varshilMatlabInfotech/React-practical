import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers } from 'reducers/userActions';
import DisplayUser from 'common/components/DisplayUser';

const LandingPage = () => {
  const [state, setState] = useState({
    tabValue: 0,
  });
  const dispatch = useDispatch();
  const users = useSelector((state) => state?.user?.allUsers);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <div>
      <div>
        <Tabs value={state.tabValue} onChange={(e, newValue) => setState((prev) => ({ ...prev, tabValue: newValue }))}>
          <Tab label="All Users" />
          <Tab label="Bookmarked Users" />
        </Tabs>
      </div>

      <div>
        {state.tabValue === 0 ? (
          <div>{users?.map((user) => !user.isBookmarked && <DisplayUser user={user} key={user.id} />)}</div>
        ) : (
          <div>{users?.map((user) => user.isBookmarked && <DisplayUser user={user} key={user.id} />)}</div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
