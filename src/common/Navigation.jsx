import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {useSelector } from 'react-redux';

const Navigation = ({ activeTab, setActiveTab }) => {
  const bookmarkedItems = useSelector((state) => state.bookmarks.items)
  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
      <Tabs 
        value={activeTab} 
        onChange={handleChange} 
        variant="fullWidth" 
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab icon={<PeopleIcon />} label="Users" value="users" />
        <Tab icon={<BookmarkIcon />} label={`Bookmarks (${bookmarkedItems.length})`} value="bookmarks" />
      </Tabs>
    </Box>
  );
};

export default Navigation;
