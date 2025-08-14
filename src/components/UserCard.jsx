import { useDispatch, useSelector } from 'react-redux';
import { Card, Avatar, Typography, IconButton, Box } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const isBookmarked = useSelector(state => 
    state.bookmarks.bookmarkedUsers.some(b => b.id === user.id)
  );

  const handleToggleBookmark = () => {
    dispatch({ type: 'bookmarks/toggleBookmark', payload: user });
  };

  return (
    <Card 
      sx={{ 
        mb: 2, 
        display: 'flex', 
        alignItems: 'center',
        p: 2,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 4,
        }
      }}
    >
      <Avatar
        src={user.avatar_url}
        alt={user.login}
        sx={{ width: 60, height: 60, mr: 2 }}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h3" gutterBottom>
          {user.login}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ID: {user.id}
        </Typography>
      </Box>
      <IconButton
        onClick={handleToggleBookmark}
        color={isBookmarked ? 'primary' : 'default'}
        aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
      >
        {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
      </IconButton>
    </Card>
  );
};

export default UserCard;
