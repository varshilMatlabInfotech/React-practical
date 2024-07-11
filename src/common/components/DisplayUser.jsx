import React from 'react';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { updateUserBookmark } from 'reducers/userActions';
import { useDispatch } from 'react-redux';

const DisplayUser = ({ user }) => {
  const dispatch = useDispatch();
  return (
    <div className="border w-72">
      <div className="flex align-top ">
        <Avatar src={user.avatar_url} />
        <Typography>{user.login}</Typography>
        <Button
          onClick={() => {
            dispatch(updateUserBookmark(user.id, !user.isBookmarked));
          }}
        >
          {user.isBookmarked ? 'Remove from Bookmark' : 'bookmark'}
        </Button>
      </div>
    </div>
  );
};

export default DisplayUser;
