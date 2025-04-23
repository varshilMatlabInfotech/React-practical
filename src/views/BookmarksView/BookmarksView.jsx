import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeBookmark, setBookmarkSearchTerm } from '../../store/slices/bookmarksSlice';
import UserCard from '../../components/common/UserCard';
import SearchInput from '../../components/common/SearchInput';
import { Container, Row, Col, Alert } from 'react-bootstrap';

const BookmarksView = () => {
  const dispatch = useDispatch();
  const { data, searchTerm } = useSelector((state) => state.bookmarks);

  const handleSearch = (term) => {
    dispatch(setBookmarkSearchTerm(term.toLowerCase()));
  };

  const filteredBookmarks = data.filter((user) =>
    user.login.toLowerCase().includes(searchTerm)
  );

  return (
    <Container>
      <Row className="mb-3">
        <Col>
          <h2>Bookmarked Users</h2>
          <SearchInput onSearch={handleSearch} placeholder="Search bookmarks..." />
        </Col>
      </Row>
      <Row>
        <Col>
          {filteredBookmarks.length === 0 ? (
            <Alert variant="info">No bookmarked users found</Alert>
          ) : (
            filteredBookmarks.map((user) => (
              <UserCard key={user.id} user={user} />
            ))
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default BookmarksView;