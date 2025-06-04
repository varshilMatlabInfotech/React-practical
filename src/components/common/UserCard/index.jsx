import React from 'react';
import { Card, CardContent, Avatar, Typography, IconButton, Box } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

const UserCard = ({ user, onBookmark, isBookmarked }) => {
  return (
    <Card sx={{ display: 'flex', mb: 2, p: 1 }}>
      <Avatar
        src={user.avatar_url}
        alt={user.login}
        sx={{ width: 60, height: 60, mr: 2 }}
      />
      <CardContent sx={{ flex: 1, display: 'flex', alignItems: 'center', p: '8px !important' }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" component="div">
            {user.login}
          </Typography>
        </Box>
        <IconButton onClick={() => onBookmark(user)} color="primary">
          {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default UserCard; 