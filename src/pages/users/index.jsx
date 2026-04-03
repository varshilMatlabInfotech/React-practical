import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { Alert, Box, Button, Container, Stack, Tab, Tabs, Typography } from '@mui/material';
import { goToPage, loadUsersInitial, refreshUsers } from 'actions/userActions';
import { toggleBookmark } from 'actions/bookmarkActions';
import SearchField from 'components/github/SearchField';
import UserList from 'components/github/UserList';
import UsersListShimmer from 'components/github/UsersListShimmer';
import PageNavigator from 'components/common/PageNavigator';
import { useThrottledValue } from 'hooks/useThrottledValue';
import { useBookmarkStorageSync } from 'hooks/useBookmarkStorageSync'; 

function filterUsersByLogin(users, query) {
  const q = query.trim().toLowerCase();
  if (!q) return users;
  return users.filter((u) => u.login.toLowerCase().includes(q));
}

export default function UsersPage() {
  const dispatch = useDispatch();
  const { pages, activePage, loading, loadingMore, error, hasMore } = useSelector((s) => s.users);
  const bookmarkUsers = useSelector((s) => s.bookmarks.users);

  const [usersSearchInput, usersSearchThrottled, setUsersSearchInput] = useThrottledValue('', 300);
  const [bmSearchInput, bmSearchThrottled, setBmSearchInput] = useThrottledValue('', 300);

  const [tab, setTab] = React.useState(0);

  useBookmarkStorageSync();

  useEffect(() => {
    dispatch(loadUsersInitial());
  }, [dispatch]);

  const bookmarkedIds = useMemo(() => bookmarkUsers.map((u) => u.id), [bookmarkUsers]);

  const allLoadedUsers = useMemo(() => pages.flat(), [pages]);

  const currentPageUsers = useMemo(() => {
    if (!pages.length) return [];
    const idx = Math.min(Math.max(1, activePage), pages.length) - 1;
    return pages[idx] ?? [];
  }, [pages, activePage]);

  const isSearchActive = Boolean(usersSearchThrottled.trim());

  const listUsers = useMemo(() => {
    if (isSearchActive) {
      return filterUsersByLogin(allLoadedUsers, usersSearchThrottled);
    }
    return currentPageUsers;
  }, [isSearchActive, allLoadedUsers, usersSearchThrottled, currentPageUsers]);

  const filteredBookmarks = useMemo(() => filterUsersByLogin(bookmarkUsers, bmSearchThrottled), [bookmarkUsers, bmSearchThrottled]);

  const handleToggleBookmark = useCallback(
    (user) => {
      dispatch(toggleBookmark(user));
    },
    [dispatch],
  );

  const handleRefresh = useCallback(() => {
    return dispatch(refreshUsers());
  }, [dispatch]);

  const paginationCount = useMemo(() => {
    if (pages.length === 0) return 1;
    return pages.length + (hasMore ? 1 : 0);
  }, [pages.length, hasMore]);

  const controlledPage = Math.min(activePage, paginationCount);

  const handleNavFirst = useCallback(() => {
    dispatch(goToPage(1));
  }, [dispatch]);

  const handleNavPrev = useCallback(() => {
    dispatch(goToPage(controlledPage - 1));
  }, [dispatch, controlledPage]);

  const handleNavNext = useCallback(() => {
    dispatch(goToPage(controlledPage + 1));
  }, [dispatch, controlledPage]);

  const fetchingUsers = loading || loadingMore;
  const isInitialFetch = loading && pages.length === 0;

  const emptyUsersMessage = useMemo(() => {
    if (allLoadedUsers.length === 0 && !loading) {
      return 'No users loaded yet.';
    }
    if (isSearchActive) {
      return 'No users match your search.';
    }
    if (currentPageUsers.length === 0 && pages.length > 0) {
      return 'No users on this page.';
    }
    return 'No users to show.';
  }, [allLoadedUsers.length, isSearchActive, currentPageUsers.length, pages.length, loading]);

  const navDisabled = fetchingUsers;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        py: { xs: 2, sm: 3 },
        overflowX: 'hidden',
      }}
    >
      <Container maxWidth="md" sx={{ px: { xs: 2, sm: 3 }, maxWidth: '100%' }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 1, textAlign: 'center', width: '100%' }}>
          GitHub users
        </Typography>

        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tab label="Users" id="tab-users" aria-controls="tabpanel-users" />
          <Tab label={`Bookmarked (${bookmarkUsers.length})`} id="tab-bookmarks" aria-controls="tabpanel-bookmarks" />
        </Tabs>

        {error && (
          <Alert
            severity="error"
            sx={{ mb: 2 }}
            action={
              <Button color="inherit" size="small" onClick={() => dispatch(refreshUsers())}>
                Retry
              </Button>
            }
          >
            {error}
          </Alert>
        )}

        {tab === 0 && (
          <Box role="tabpanel" id="tabpanel-users" aria-labelledby="tab-users" sx={{ width: '100%', minWidth: 0 }}>
            <SearchField
              label="Search loaded users"
              value={usersSearchInput}
              onChange={setUsersSearchInput}
              placeholder="Filter by User Name..."
            />
            {isSearchActive && allLoadedUsers.length > 0 && (
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                Searching across {allLoadedUsers.length} loaded user
                {allLoadedUsers.length === 1 ? '' : 's'} (all pages).
              </Typography>
            )}

            <PullToRefresh onRefresh={handleRefresh}>
              <Stack spacing={2} sx={{ minHeight: 200, width: '100%' }}>
                {fetchingUsers && (
                  <UsersListShimmer
                    rows={isInitialFetch ? 12 : 8}
                    compact={pages.length > 0}
                  />
                )}

                {!fetchingUsers && (
                  <>
                    <Box sx={{ width: '100%', minWidth: 0 }}>
                      <UserList
                        users={listUsers}
                        bookmarkedIds={bookmarkedIds}
                        onToggleBookmark={handleToggleBookmark}
                        emptyMessage={emptyUsersMessage}
                      />
                    </Box>

                    {pages.length > 0 && (
                      <Stack
                        spacing={1.5}
                        sx={{
                          mt: 1,
                          pt: 2,
                          borderTop: 1,
                          borderColor: 'divider',
                          width: '100%',
                          minWidth: 0,
                        }}
                      >
                        <PageNavigator
                          page={controlledPage}
                          pageCount={paginationCount}
                          onFirst={handleNavFirst}
                          onPrevious={handleNavPrev}
                          onNext={handleNavNext}
                          disabled={navDisabled}
                        />
                      </Stack>
                    )}
                  </>
                )}
              </Stack>
            </PullToRefresh>
          </Box>
        )}

        {tab === 1 && (
          <Box role="tabpanel" id="tabpanel-bookmarks" aria-labelledby="tab-bookmarks">
            <SearchField
              label="Search bookmarked users"
              value={bmSearchInput}
              onChange={setBmSearchInput}
              placeholder="Filter by login (throttled 300ms)"
            />
            <UserList
              users={filteredBookmarks}
              bookmarkedIds={bookmarkedIds}
              onToggleBookmark={handleToggleBookmark}
              emptyMessage={
                bookmarkUsers.length === 0
                  ? 'No bookmarked users yet. Use the bookmark icon on the Users tab.'
                  : 'No bookmarked users match your search.'
              }
            />
          </Box>
        )}
      </Container>
    </Box>
  );
}
