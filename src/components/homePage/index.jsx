import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import Card from '@mui/material/Card';
import styles from 'components/homePage/HomePage.module.scss';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const HomePage = () => {
  const [value, setValue] = useState(0);
  const [usersData, setUsersData] = useState([]);
  const [bookMarkedUsers, setBookMarkedUsers] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    getUsers();
    const bookMakedUsersData = localStorage.getItem('bookMarkedUsers');
    if (bookMakedUsersData !== null) {
      setBookMarkedUsers(JSON.parse(bookMakedUsersData));
    }
  }, []);

  const getUsers = () => {
    axios.get('https://api.github.com/users').then((response) => {
      const data = response.data.map((res) => {
        return {
          ...res,
          isBookMarked: false,
        };
      });
      setUsersData(data);
    });
  };
  const handleBookMark = (userId) => {
    const bookmarkedUserData = usersData.find((res) => res.id === userId);
    bookmarkedUserData.isBookMarked = true;
    setBookMarkedUsers((preVal) => [...preVal, bookmarkedUserData]);
  };

  useEffect(() => {
    localStorage.setItem('bookMarkedUsers', JSON.stringify(bookMarkedUsers));
  }, [bookMarkedUsers]);

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

  const handleUnBookMark = (userId) => {
    const filteredData = bookMarkedUsers.filter((res) => res.id !== userId);
    setBookMarkedUsers(filteredData);
    const clone = [...usersData];
    const bookmarkedUserData = clone.find((res) => res.id === userId);
    bookmarkedUserData.isBookMarked = false;
    setUsersData(clone);
  };

  const handleUserUnBookMark = (userId) => {
    const clone = [...usersData];
    const bookmarkedUserData = clone.find((res) => res.id === userId);
    bookmarkedUserData.isBookMarked = false;
    setUsersData(clone);
    const filteredData = bookMarkedUsers.filter((res) => res.id !== userId);
    setBookMarkedUsers(filteredData);
  };

  const handleSearchChange = (e) => {
    const search = e.target.value;
    setInput(e.target.value);
    const searchedValue = usersData.filter((res) => res.login.toLowerCase().includes(search.toLowerCase()));
    setUsersData(searchedValue);
  };

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Users" {...a11yProps(0)} />
            <Tab label="BookMarked Users" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <input id="outlined-basic" label="Outlined" className={styles.textfield} onChange={(e) => handleSearchChange(e)} value={input} />
        <CustomTabPanel value={value} index={0}>
          <div className={styles.mainWrapper}>
            {usersData?.map((user) => {
              return (
                <Card>
                  <div className={styles.cardMainSection}>
                    <Avatar alt="Remy Sharp" src={user.avatar_url} />
                    <h4>{user.login}</h4>
                    {!user.isBookMarked ? (
                      <BookmarkBorderIcon className={styles.bookmark} onClick={() => handleBookMark(user.id)} />
                    ) : (
                      <BookmarkIcon className={styles.bookmark} onClick={() => handleUserUnBookMark(user.id)} />
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div className={styles.mainWrapper}>
            {bookMarkedUsers?.length ? (
              bookMarkedUsers?.map((user) => {
                return (
                  <Card>
                    <div className={styles.cardMainSection}>
                      <Avatar alt="Remy Sharp" src={user.avatar_url} />
                      <h4>{user.login}</h4>
                      {!user.isBookMarked ? (
                        <BookmarkBorderIcon className={styles.bookmark} onClick={() => handleBookMark(user.id)} />
                      ) : (
                        <BookmarkIcon className={styles.bookmark} onClick={() => handleUnBookMark(user.id)} />
                      )}
                    </div>
                  </Card>
                );
              })
            ) : (
              <h4>No BookMark Users Found</h4>
            )}
          </div>
        </CustomTabPanel>
      </Box>
    </>
  );
};

export default HomePage;
