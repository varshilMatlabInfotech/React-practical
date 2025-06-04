import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, Tab, Box } from '@mui/material';
import TabPanel from 'components/common/TabPanel';
import UserList from 'components/users/UserList';
import BookmarkedUsers from 'components/users/BookmarkedUsers';
import SearchBar from 'components/common/SearchBar';
import { searchUsers } from 'redux/slices/usersSlice';
import { searchBookmarks } from 'redux/slices/bookmarksSlice';

const Users = () => {
  const [tabValue, setTabValue] = useState(0);
  const [resetSearch, setResetSearch] = useState(false);
  const dispatch = useDispatch();

  const handleTabChange = (_, newValue) => {
    setTabValue(newValue);
    dispatch(searchUsers(''));
    dispatch(searchBookmarks(''));
    setResetSearch(true);
  };

  useEffect(() => {
    if (resetSearch) {
      setResetSearch(false);
    }
  }, [resetSearch]);

  const handleSearch = (query) => {
    if (tabValue === 0) {
      dispatch(searchUsers(query));
    } else {
      dispatch(searchBookmarks(query));
    }
  };

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <SearchBar onSearch={handleSearch} reset={resetSearch} />
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Users" />
          <Tab label="Bookmarked Users" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <UserList />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <BookmarkedUsers />
      </TabPanel>
    </Box>
  );
};

export default Users; 