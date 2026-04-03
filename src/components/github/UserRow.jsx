import React, { memo } from 'react';
import {
  Avatar,
  Box,
  Chip,
  IconButton,
  Link,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

function UserRow({ user, bookmarked, onToggleBookmark }) {
  const theme = useTheme();
  const compact = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 2,
        py: 1.5,
        px: { xs: 1.5, sm: 2 },
        borderRadius: 2,
        bgcolor: 'background.paper',
        border: 1,
        borderColor: 'divider',
        transition: 'box-shadow 0.2s',
        '&:hover': {
          boxShadow: 1,
        },
      }}
    >
      <Avatar
        src={user.avatar_url}
        alt={`${user.login} avatar`}
        sx={{ width: compact ? 44 : 52, height: compact ? 44 : 52, flexShrink: 0 }}
        imgProps={{ loading: 'lazy' }}
      />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant={compact ? 'subtitle2' : 'subtitle1'}
          component="p"
          sx={{
            fontWeight: 700,
            wordBreak: 'break-word',
            m: 0,
            lineHeight: 1.3,
          }}
        >
          {user.login}
        </Typography>
        <Stack
          direction="row"
          spacing={0.75}
          flexWrap="wrap"
          useFlexGap
          alignItems="center"
          sx={{ mt: 0.75 }}
        >
          {user.type ? (
            <Chip
              size="small"
              label={user.type}
              variant="outlined"
              sx={{ height: 22, '& .MuiChip-label': { px: 1, fontSize: '0.7rem' } }}
            />
          ) : null}
          {user.site_admin ? (
            <Chip
              size="small"
              label="GitHub Staff"
              color="secondary"
              sx={{ height: 22, '& .MuiChip-label': { px: 1, fontSize: '0.7rem' } }}
            />
          ) : null}
        </Stack>
        {user.html_url ? (
          <Link
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            variant="caption"
            sx={{
              mt: 0.75,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.35,
              fontWeight: 600,
            }}
          >
            View on GitHub
            <OpenInNewIcon sx={{ fontSize: 14 }} aria-hidden />
          </Link>
        ) : null}
      </Box>
      <IconButton
        color={bookmarked ? 'primary' : 'default'}
        onClick={() => onToggleBookmark(user)}
        aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
        size={compact ? 'small' : 'medium'}
        sx={{ flexShrink: 0, mt: -0.5 }}
      >
        {bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
      </IconButton>
    </Box>
  );
}

export default memo(UserRow);
