import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';

const UseListComponent = ({ favData = [] }) => {
  return data?.users?.map((element, index) => {
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
  });
};

export default UseListComponent;
