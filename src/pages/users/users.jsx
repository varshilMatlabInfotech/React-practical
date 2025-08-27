import UserList from 'components/UserList';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from 'react';
import BookmarkedUserList from 'components/BookmarkedUser';

const Users = () => {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Users" value="1" />
              <Tab label="Boomarked Users" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <UserList></UserList>
          </TabPanel>
          <TabPanel value="2">
            <BookmarkedUserList></BookmarkedUserList>
          </TabPanel>
          {/* <TabPanel value="2">Item Two</TabPanel> */}
        </TabContext>
      </Box>
    </>
  );
};

export default Users;
