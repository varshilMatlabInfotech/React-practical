import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBookmark, removeBookmark } from '../../store/slices/bookmarksSlice';
import { Card, Button, Image } from 'react-bootstrap';

const UserCard = ({ user }) => {
    const dispatch = useDispatch();
    const bookmarkedUsers = useSelector((state) => state.bookmarks.data);
    const isBookmarked = bookmarkedUsers.some((bookmark) => bookmark.id === user.id);

    const handleBookmark = () => {
        if (isBookmarked) {
            dispatch(removeBookmark(user.id));
        } else {
            dispatch(addBookmark(user));
        }
    };


    return (
        <Card className="mb-3 user-card">
          <Card.Body className="d-flex flex-column flex-md-row align-items-center p-3 w-100">
            <div className="d-flex align-items-center user-avatar me-md-3">
              <Image
                src={user.avatar_url}
                roundedCircle
                width={50}
                height={50}
                className="me-3 me-md-0"
                alt={user.login}
              />
              <Card.Title className="mb-0 mt-2 mt-md-0 ms-md-3">{user.login}</Card.Title>
            </div>
            <Button
              variant={isBookmarked ? 'danger' : 'primary'}
              onClick={handleBookmark}
              className="bookmark-btn mt-2 mt-md-0 ms-md-auto"
              size="sm"
            >
              {isBookmarked ? 'Remove' : 'Bookmark'}
            </Button>
          </Card.Body>
        </Card>
      );

};

export default UserCard;