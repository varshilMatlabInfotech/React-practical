import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Avatar,
  CircularProgress,
  Container,
  Typography,
  Tabs,
  Tab,
  TextField,
  Stack,
  Pagination,
} from '@mui/material';
import { fetchUsers, refreshUsers, usersSetQuery } from 'reducers/usersReducer';
import { bookmarksToggle, selectBookmarksArray, selectIsBookmarked, bookmarksHydrate } from 'reducers/bookmarksReducer';

const useDebouncedValue = (value, delayMs = 300) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(t);
  }, [value, delayMs]);
  return debounced;
};

const UsersList = ({ items, onToggleBookmark, isBookmarked }) => (
  <Stack spacing={2}>
    {items.map((u) => (
      <Card key={u.id}>
        <CardHeader
          avatar={<Avatar src={u.avatar_url} alt={u.login} />}
          title={u.login}
          action={
            <Button variant={isBookmarked(u.id) ? 'contained' : 'outlined'} size="small" onClick={() => onToggleBookmark(u)}>
              {isBookmarked(u.id) ? 'Bookmarked' : 'Bookmark'}
            </Button>
          }
        />
      </Card>
    ))}
  </Stack>
);

const UserPage = () => {
  const dispatch = useDispatch();
  const { items, loading, query } = useSelector((s) => s.users);
  const perPage = useSelector((s) => s.users.perPage);
  const hasMore = useSelector((s) => s.users.hasMore);
  const bookmarks = useSelector(selectBookmarksArray);
  const [tab, setTab] = useState(0);
  const [searchUsers, setSearchUsers] = useState('');
  const [searchBookmarks, setSearchBookmarks] = useState('');
  const [pageIndex, setPageIndex] = useState(1); // 1-based page index for Users tab
  const [bookmarkPageIndex, setBookmarkPageIndex] = useState(1); // 1-based page index for Bookmarks tab
  const debouncedUsers = useDebouncedValue(searchUsers, 300);
  const debouncedBookmarks = useDebouncedValue(searchBookmarks, 300);

  useEffect(() => {
    dispatch(fetchUsers({ reset: true }));
    dispatch(bookmarksHydrate());
  }, [dispatch]);

  useEffect(() => {
    dispatch(usersSetQuery(tab === 0 ? debouncedUsers : debouncedBookmarks));
  }, [debouncedUsers, debouncedBookmarks, tab, dispatch]);

  // Reset Users pagination when switching tabs or search changes
  useEffect(() => {
    if (tab === 0) setPageIndex(1);
  }, [debouncedUsers, tab]);

  // Reset Bookmarks pagination when switching tabs or search changes
  useEffect(() => {
    if (tab === 1) setBookmarkPageIndex(1);
  }, [debouncedBookmarks, tab]);

  const isIdBookmarked = useMemo(() => {
    const map = Object.fromEntries(bookmarks.map((b) => [b.id, b]));
    return (id) => Boolean(map[id]);
  }, [bookmarks]);

  const filteredUsers = useMemo(() => {
    const q = (query || '').trim().toLowerCase();
    if (!q) return items;
    return items.filter((u) => (u.login || '').toLowerCase().includes(q));
  }, [items, query]);

  const filteredBookmarks = useMemo(() => {
    const q = (query || '').trim().toLowerCase();
    if (!q) return bookmarks;
    return bookmarks.filter((u) => (u.login || '').toLowerCase().includes(q));
  }, [bookmarks, query]);

  const perPageBookmarks = 10;
  const totalPagesBookmarks = Math.max(1, Math.ceil((filteredBookmarks?.length || 0) / perPageBookmarks));
  const bookmarksPageStart = (bookmarkPageIndex - 1) * perPageBookmarks;
  const bookmarksPageEnd = bookmarksPageStart + perPageBookmarks;
  const pagedBookmarks = filteredBookmarks.slice(bookmarksPageStart, bookmarksPageEnd);

  const totalPagesUsers = Math.max(1, Math.ceil((filteredUsers?.length || 0) / perPage));
  const usersPageStart = (pageIndex - 1) * perPage;
  const usersPageEnd = usersPageStart + perPage;
  const pagedUsers = filteredUsers.slice(usersPageStart, usersPageEnd);

  const handleUsersPageChange = async (_e, newPage) => {
    // If user requests a page beyond what is loaded, try to fetch more first
    if (newPage > totalPagesUsers && hasMore && !loading) {
      await dispatch(fetchUsers({ append: true }));
    }
    setPageIndex(newPage);
  };

  const handleRefresh = () => dispatch(refreshUsers());
  const handleLoadMore = () => dispatch(fetchUsers({ append: true }));
  const handleToggleBookmark = (user) => dispatch(bookmarksToggle(user));

  const renderTabContent = () => {
    if (tab === 0) {
      return (
        <Box>
          {loading && items.length === 0 ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
              <CircularProgress />
            </Box>
          ) : (
            <>
              <UsersList items={pagedUsers} onToggleBookmark={handleToggleBookmark} isBookmarked={isIdBookmarked} />
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                alignItems={{ xs: 'stretch', sm: 'center' }}
                justifyContent="space-between"
                sx={{ mt: 2 }}
              >
                <Button variant="outlined" onClick={handleRefresh} disabled={loading}>
                  Refresh
                </Button>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent={{ xs: 'space-between', sm: 'flex-end' }}>
                  <Typography variant="body2" color="text.secondary">
                    Page {pageIndex} of {totalPagesUsers}
                  </Typography>
                  <Pagination
                    page={pageIndex}
                    onChange={handleUsersPageChange}
                    count={Math.max(1, totalPagesUsers + (hasMore ? 1 : 0))}
                    color="primary"
                    size="small"
                    showFirstButton
                    showLastButton
                  />
                </Stack>
              </Stack>
              {!hasMore && pageIndex >= totalPagesUsers && (
                <Box mt={2} textAlign="center">
                  <Typography variant="body2" color="text.secondary">
                    End of users
                  </Typography>
                </Box>
              )}
            </>
          )}
        </Box>
      );
    }
    return (
      <Box>
        <UsersList items={pagedBookmarks} onToggleBookmark={handleToggleBookmark} isBookmarked={isIdBookmarked} />
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ xs: 'stretch', sm: 'center' }}
          justifyContent="flex-end"
          sx={{ mt: 2 }}
        >
          <Typography variant="body2" color="text.secondary">
            Page {bookmarkPageIndex} of {totalPagesBookmarks}
          </Typography>
          <Pagination
            page={bookmarkPageIndex}
            onChange={(_, p) => setBookmarkPageIndex(p)}
            count={Math.max(1, totalPagesBookmarks)}
            color="primary"
            size="small"
            showFirstButton
            showLastButton
          />
        </Stack>
      </Box>
    );
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight={700}>
        Users
      </Typography>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
        <Tab label={`Users (${items.length})`} />
        <Tab label={`Bookmarked (${bookmarks.length})`} />
      </Tabs>
      {tab === 0 ? (
        <TextField
          value={searchUsers}
          onChange={(e) => setSearchUsers(e.target.value)}
          placeholder="Search users (local)"
          size="small"
          fullWidth
          sx={{ mb: 2 }}
        />
      ) : (
        <TextField
          value={searchBookmarks}
          onChange={(e) => setSearchBookmarks(e.target.value)}
          placeholder="Search bookmarks"
          size="small"
          fullWidth
          sx={{ mb: 2 }}
        />
      )}
      {renderTabContent()}
    </Container>
  );
};

export default UserPage;
