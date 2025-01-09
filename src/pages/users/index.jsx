import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';

function CustomTabPanel(props) {
  const { children, value, index, data, handleUserChange, handlePageClick, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box
          sx={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
            gap: 2,
          }}
        >
          {data?.map((user, index) => {
            return (
              <Card sx={{ maxWidth: 200 }} key={index}>
                <CardHeader
                  avatar={<Avatar alt={`${user?.login}`} src={`${user?.avatar_url}`}></Avatar>}
                  action={
                    <Checkbox
                      checked={user?.bookmarked_User}
                      onChange={(e) => {
                        handleUserChange(e, user);
                      }}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  }
                  title={`${user?.login} `}
                />
              </Card>
            );
          })}
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Users = () => {
  const [value, setValue] = React.useState(0);
  const [userList, setUserList] = useState([]);
  const [dummyUserList, setDummyUserList] = useState([]);
  const [bookMarkedUserList, setBookMarkedUserList] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleUserChange = (event, user) => {
    let responseData = dummyUserList?.map((data) => {
      return data?.id === user?.id ? { ...data, bookmarked_User: event.target.checked } : { ...data };
    });
    setDummyUserList(responseData);
    let newUserList = responseData?.filter((data) => data?.bookmarked_User !== true);
    setUserList(newUserList);
    let bookMarkedUser = responseData?.filter((data) => data?.bookmarked_User === true);
    setBookMarkedUserList(bookMarkedUser);
  };

  useEffect(() => {
    async function getData() {
      let newData = await axios.get('https://api.github.com/users');
      let responseData = newData?.data?.map((user) => {
        return { ...user, bookmarked_User: false };
      });
      setUserList(responseData);
      setDummyUserList(responseData);
    }
    getData();
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Users" {...a11yProps(0)} />
          <Tab label="Bookmarked Users" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0} data={userList} handleUserChange={handleUserChange}>
        Users
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1} data={bookMarkedUserList} handleUserChange={handleUserChange}>
        Bookmarked Users
      </CustomTabPanel>
    </Box>
  );
};
export default Users;
