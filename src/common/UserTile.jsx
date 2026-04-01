import React from 'react';
import { Card, Box, Avatar, Typography, IconButton } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const UserTile = ({ user, isBookmarked, onToggleBookmark }) => {
  return (
    <Card 
      variant="outlined" 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        p: 1.5, 
        mb: 2, 
        borderRadius: 3,
        '&:hover': { boxShadow: 2 } 
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 0 }}>
        <Avatar 
          src={user.avatar_url} 
          alt={user.login} 
          sx={{ width: 56, height: 56, border: '2px solid #f0f0f0' }} 
        />
        <Typography 
          variant="h6" 
          noWrap 
          sx={{ fontWeight: 600, color: 'text.primary' }}
        >
          {user.login}
        </Typography>
      </Box>
      <IconButton 
        onClick={() => onToggleBookmark(user)} 
        color={isBookmarked ? "primary" : "default"}
      >
        {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
      </IconButton>
    </Card>
  );
};

export default UserTile;
