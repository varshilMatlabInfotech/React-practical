import React, { useEffect, useState, useMemo, useCallback } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import DataTable from 'contexts/Table';
import AllBookmarkedUsers from 'components/AllBookmarkedUsers';

const Row = React.memo(({ row, onBookmarkClick }) => {
  return (
    <tr>
      <td>{row.id}</td>
      <td>{row.login}</td>
      <td>
        <Avatar src={row.avatar_url || ''}>{!row.avatar_url && row.login.charAt(0)}</Avatar>
      </td>
      <td>
        <span onClick={() => onBookmarkClick(row.id)}>{row.isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}</span>
      </td>
    </tr>
  );
});

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [value, setValue] = useState(0);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://api.github.com/users');
      const data = response?.data?.map((user) => ({
        ...user,
        isBookmarked: false,
      }));
      setAllUsers(data);
    } catch (error) {
      console.error('Error while fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const toggleBookmark = useCallback((userId) => {
    setAllUsers((prevUsers) => prevUsers.map((user) => (user.id === userId ? { ...user, isBookmarked: !user.isBookmarked } : user)));
  }, []);

  const columns = useMemo(
    () => [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'login', headerName: 'Name', width: 130 },
      {
        field: 'avatar_url',
        headerName: 'Avatar',
        sortable: false,
        width: 160,
        renderCell: (params) => <Avatar src={params?.value || ''}>{!params?.value && params?.row?.login?.charAt(0)}</Avatar>,
      },
      {
        headerName: 'Bookmark',
        width: 130,
        sortable: false,
        renderCell: ({ row }) => <span onClick={() => toggleBookmark(row.id)}>{row.isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}</span>,
      },
    ],
    [toggleBookmark],
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="All Users" {...a11yProps(0)} />
          <Tab label="Bookmarked Users" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <DataTable rows={allUsers} columns={columns} Row={Row} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <AllBookmarkedUsers allUsers={allUsers.filter((user) => user.isBookmarked)} setAllUsers={setAllUsers} />
      </CustomTabPanel>
    </Box>
  );
};

export default AllUsers;
