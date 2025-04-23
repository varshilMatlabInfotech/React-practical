import React, { useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUsers, resetUsers, setSearchTerm } from '../../store/slices/usersSlice';
import UserCard from '../../components/common/UserCard';
import SearchInput from '../../components/common/SearchInput';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import { usePullToRefresh } from '../../hooks/usePullToRefresh';
import { ArrowDown, ArrowUp } from 'react-bootstrap-icons';

const UsersView = () => {
    const dispatch = useDispatch();
    const { data, loading, error, page, hasMore, searchTerm } = useSelector((state) => state.users);

    const loadMoreUsers = useCallback(() => {
        if (!loading && hasMore) {
            dispatch(loadUsers(page));
        }
    }, [dispatch, loading, hasMore, page]);

    const handleSearch = (term) => {
        dispatch(setSearchTerm(term.toLowerCase()));
    };

    const handleRefresh = useCallback(() => {
        dispatch(resetUsers());
        dispatch(loadUsers(1));
    }, [dispatch]);

    usePullToRefresh(handleRefresh);

    const hasDispatched = useRef(false);

    useEffect(() => {
        if (!hasDispatched.current && data.length === 0 && !loading) {
            dispatch(loadUsers(1));
            hasDispatched.current = true;
        }
    }, [dispatch, data.length, loading]);

    const filteredUsers = data.filter((user) =>
        user.login.toLowerCase().includes(searchTerm)
    );

    const showNoResults = searchTerm && filteredUsers.length === 0;
    const showInitialLoading = data.length === 0 && loading;
    const showNoMoreUsers = !hasMore && !showNoResults;

    return (
        <Container fluid className="px-0 px-md-3">
          <Row className="mb-3 mx-0">
            <Col xs={12}>
              <h2 className="mb-3">GitHub Users</h2>
              <SearchInput onSearch={handleSearch} placeholder="Search users..." />
            </Col>
          </Row>
          <Row className="mx-0">
            <Col xs={12}>
              {/* Error and status messages */}
              {error && <Alert variant="danger" className="mx-2">{error}</Alert>}
              {showNoResults && (
                <Alert variant="info" className="mx-2">No users found matching your search</Alert>
              )}
    
              {/* Loading and content */}
              {showInitialLoading ? (
                <div className="text-center my-5">
                  <Spinner animation="border" />
                  <p className="mt-2">Loading users...</p>
                </div>
              ) : (
                <InfiniteScroll
                  dataLength={filteredUsers.length}
                  next={loadMoreUsers}
                  hasMore={hasMore}
                  loader={!showNoResults && (
                    <div className="text-center my-3">
                      <Spinner animation="border" />
                    </div>
                  )}
                  refreshFunction={handleRefresh}
                  pullDownToRefresh
                  pullDownToRefreshThreshold={50}
                  pullDownToRefreshContent={
                    <div className="pull-to-refresh">
                      <h3><ArrowDown size={20} /> Pull down to refresh</h3>
                    </div>
                  }
                  releaseToRefreshContent={
                    <div className="pull-to-refresh">
                      <h3><ArrowUp size={20} /> Release to refresh</h3>
                    </div>
                  }
                >
                  <div className="px-2">
                    {filteredUsers.map((user) => (
                      <UserCard key={user.id * Math.random()} user={user} />
                    ))}
                  </div>
                </InfiniteScroll>
              )}
    
              {showNoMoreUsers && (
                <div className="text-center my-3">
                  <p>No more users to load</p>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      );
};

export default UsersView;