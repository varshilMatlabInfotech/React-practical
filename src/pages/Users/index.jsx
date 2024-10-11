import { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import UserList from './Users';
import BookmarksList from './Bookmarks';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, handleSearchAction } from 'actions/user.action';
import TextField from '@mui/material/TextField';
// import { useDebounce } from 'use-debounce';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const Users = (props) => {
  const [state, setState] = useState({ value: 0, allUsers: [], bookMarkedUser: [] });
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    setState((prev) => ({ ...prev, value: newValue }));
  };
  useEffect(() => {
    dispatch(getUser());
  }, []);

  const handleSearch = (e) => {
    dispatch(handleSearchAction(e.target.value));
  };

  return (
    <div>
      {/* <TextField id="outlined-basic" label="Search" variant="outlined" onChange={handleSearch} /> */}

      <Tabs value={state?.value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="Users" {...a11yProps(0)} />
        <Tab label="Bookmarks users" {...a11yProps(1)} />
      </Tabs>
      <div>
        {state?.value === 0 && <UserList />}
        {state?.value === 1 && <BookmarksList />}
      </div>
    </div>
  );
};

export default Users;
