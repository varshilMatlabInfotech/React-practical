import { useMemo, useCallback } from 'react'; 
import { Stack, Typography, Box } from '@mui/material';
import UserRow from 'components/github/UserRow';

function UserList({ users, bookmarkedIds, onToggleBookmark, emptyMessage }) {
  const idSet = useMemo(() => new Set(bookmarkedIds), [bookmarkedIds]);

  const handleToggle = useCallback(
    (user) => {
      onToggleBookmark(user);
    },
    [onToggleBookmark],
  );

  if (!users.length) {
    return (
      <Box sx={{ py: 6, textAlign: 'center' }}>
        <Typography color="text.secondary">{emptyMessage}</Typography>
      </Box>
    );
  }

  return (
    <Stack spacing={1.5} role="list">
      {users.map((user) => (
        <UserRow
          key={user.id}
          user={user}
          bookmarked={idSet.has(user.id)}
          onToggleBookmark={handleToggle}
        />
      ))}
    </Stack>
  );
}

export default UserList;
