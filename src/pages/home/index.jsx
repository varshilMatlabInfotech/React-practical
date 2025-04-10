import React, { useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from "axios";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Bookmark from 'pages/bookmark/index';

const Home = () => {
  const [userData, setUserData] = useState([]);
  const [userDataBookmark, setUserDataBookmark] = useState([]);
  const [value, setValue] = React.useState('1');
  const baseURL = "https://api.github.com/users";
  console.log(userDataBookmark, 'userDataBookmark')

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    // User API call
    axios.get(baseURL).then((response) => {
      setUserData(response?.data);
    });
  }, []);

  // User bookmark to use this function
  const handleButtonClick = (data) => {
    setUserData(userData.filter(task => task.id !== data.id));
    setUserDataBookmark([...userDataBookmark, userData.find(task => task.id === data.id)]);
  };

  // Table in data dynamic set
  const columns = useMemo(
    () => [
      {
        name: 'Id',
        selector: row => row.id,
        sortable: true,
      },
      {
        name: 'User View Type',
        selector: row => row.user_view_type,
        sortable: true,
      },
      {
        name: 'Login Name',
        selector: row => row.login,
        sortable: true,
      },
      {
        cell: (row) => <img src={row?.avatar_url} alt={row?.avatar_url} style={{ height: "80px", width: "80px", border: "1px solid black", borderRadius: "50%" }} />,
      },
      {
        name: 'Action',
        cell: (row) => <Button variant="outlined" onClick={() => handleButtonClick(row)}><BookmarkBorderIcon /></Button>,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
    ],
    [userData],
  );

  return (
    <>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="User unbookmark" value="1" />
              <Tab label="User bookmark" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            {/* Table */}
            <DataTable
              title="User unbookmark"
              data={userData}
              columns={columns}
            />
          </TabPanel>
          <TabPanel value="2">
            <Bookmark setValue={setValue} setUserDataBookmark={setUserDataBookmark} userDataBookmark={userDataBookmark} />
          </TabPanel>
        </TabContext>
      </Box>

    </>
  )
}

export default Home;