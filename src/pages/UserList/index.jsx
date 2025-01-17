import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import styles from './userStyles.module.css';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import UseListComponent from './UseListComponent';
import TextField from '@mui/material/TextField';
import { fetchData, SET_FAV_DATA, SET_UNFAV_DATA } from 'utils/store/Action/index';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import BookmarkedUser from 'pages/BookmarkedUser/index';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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
const UserList = () => {
  const dispatch=useDispatch();
  const selector=useSelector((state)=>state.user)
  const {data:reduxUserData=[],favData=[]}=selector
 
  useEffect(() => {
    dispatch(fetchData())
  }, []);
  const handleFavClick = (value) => {
    const checkData = favData?.find((element) => element.id === value.id);
    if (!checkData) {
    dispatch(SET_FAV_DATA(value))
    setValue(1)
}
  };
  const handleUnFavClick = (value) => {
    dispatch(SET_UNFAV_DATA(value))
  };

  const [searchText, setSearchText] = useState('');
  const [serachData, setSearchData] = useState([]);
  useEffect(() => {
    const findSearchData = reduxUserData?.find((ele) => {
      const name = ele?.firstName + ele?.lastName;
      return name === searchText;
    });
    if (findSearchData) setSearchData([findSearchData] || []);
  }, [searchText]);
  const checkData = serachData?.length > 0 ? serachData : reduxUserData;

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={styles.mainContainer}>
      
      <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div className={styles.mainContainer}>
      <TextField
        id="filled-search"
        label="Search field"
        type="search"
        variant="filled"
        name="searchText"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      />
      <div className={styles.cardContainer}>
        
        {checkData?.map((element, index) => {
          const { firstName = '', lastName = '', image = '' } = element;
          const isFavData = favData?.find((ele) => ele.id === element.id);
          return (
            <Card sx={{ maxWidth: 345 }} key={index}>
              <CardMedia sx={{ height: 140 }} image={`${image}`} title="green iguana" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {firstName + lastName}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
                <IconButton aria-label="add to favorites">
                  {isFavData ? (
                    <FavoriteIcon onClick={() => handleUnFavClick(element)} style={{ fill: 'red' }} />
                  ) : (
                    <FavoriteIcon onClick={() => handleFavClick(element)} />
                  )}
                </IconButton>
              </CardActions>
            </Card>
          );
        })}
      </div>
      </div>

      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <BookmarkedUser setValue={setValue}/>
      </CustomTabPanel>
      
    </Box>
      
    </div>
  );
};

export default UserList;
