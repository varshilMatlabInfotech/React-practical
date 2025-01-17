import React, { useEffect, useState } from 'react';
import styles from '../UserList/userStyles.module.css';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TextField from '@mui/material/TextField';
import { SET_FAV_DATA, SET_UNFAV_DATA } from 'utils/store/Action/index';
import { useDispatch } from 'react-redux';

const BookmarkedUser = ({setValue=()=>{}}) => {
    const dispatch=useDispatch()
  const getLocalData = JSON.parse(localStorage.getItem('bookMarkedData'));
  const [favData, setFavData] = useState(getLocalData || []);
  const commonFavHandler = (favDatArray) => {
    setFavData(favDatArray);
    localStorage.setItem('bookMarkedData', JSON.stringify(favDatArray));
  };
  const handleFavClick = (value) => {
    const checkData = favData?.find((element) => element.id === value.id);
    if (!checkData) {
      const newData = [...favData, value];
    dispatch(SET_FAV_DATA(value))
   
}
  };
  const handleUnFavClick = (value) => {
    dispatch(SET_UNFAV_DATA(value))
    setValue(0) 
  };
  const [searchText, setSearchText] = useState('');
  const [serachData, setSearchData] = useState([]);
  useEffect(() => {
    const findSearchData = favData?.find((ele) => {
      const name = ele?.firstName + ele?.lastName;

      return name === searchText;
    });
    if (findSearchData) setSearchData([findSearchData] || []);
  }, [searchText]);
  const checkData = serachData?.length > 0 ? serachData : favData;
  return (checkData.length>0?
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
    :<h1>No data found</h1>
  );
};

export default BookmarkedUser;
