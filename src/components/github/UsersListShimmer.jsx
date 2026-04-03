import { Box } from '@mui/material';
import { ShimmerCategoryItems } from 'shimmer-effects-react';

 
function UsersListShimmer({ rows = 10, compact = false }) {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: compact ? 240 : { xs: '50vh', sm: '45vh' },
        py: 1,
      }}
      aria-busy="true"
      aria-label="Loading users"
    >
      <ShimmerCategoryItems
        mode="light"
        imageRounded={50}
        loading
        items={rows}
        itemGap={compact ? 12 : 18}
        hasImage
        hasTitle
        hasText
        hasButton
        contentPosition="start"
      />
    </Box>
  );
}

export default UsersListShimmer;
