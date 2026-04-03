import { Box, Button, Stack } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const outlineBtnSx = {
  fontWeight: 700,
  textTransform: 'none',
  borderColor: 'grey.300',
  color: 'text.primary',
  bgcolor: 'background.paper',
  flexShrink: 0,
  '&:hover': { borderColor: 'grey.400', bgcolor: 'grey.50' },
};

function PageNavigator({
  page,
  pageCount, 
  onPrevious,
  onNext,
  disabled = false, 
  previousLabel = 'Previous',
  nextLabel = 'Next',
}) {
  const safeCount = Math.max(1, pageCount);
  const safePage = Math.min(Math.max(1, page), safeCount);
  const atFirst = safePage <= 1;
  const atLast = safePage >= safeCount;

  return (
    <Box
      role="navigation"
      aria-label="Page navigation"
      sx={{
        width: '100%',
        maxWidth: '100%',
        py: { xs: 1.5, sm: 2 },
        px: { xs: 1, sm: 2 },
        bgcolor: 'background.paper',
        borderRadius: 2,
        border: 1,
        borderColor: 'divider',
        boxSizing: 'border-box',
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          width: '100%',
          flexWrap: { xs: 'nowrap', sm: 'wrap', md: 'nowrap' },
          gap: { xs: 1, sm: 1, md: 2 },
          rowGap: 1,
          overflowX: { xs: 'auto', sm: 'visible' },
          pb: { xs: 0.25, sm: 0 },
          '&::-webkit-scrollbar': { height: 6 },
        }}
      >
        <Button
          variant="outlined"
          size="small"
          onClick={onPrevious}
          disabled={disabled || atFirst}
          startIcon={<ChevronLeftIcon sx={{ fontSize: { xs: '1.125rem', sm: '1.25rem' } }} />}
          sx={{
            ...outlineBtnSx,
            px: { xs: 1, sm: 1.5 },
            py: { sm: 0.75 },
          }}
        >
          {previousLabel}
        </Button>

        <Button
          variant="outlined"
          size="small"
          onClick={onNext}
          disabled={disabled || atLast}
          endIcon={<ChevronRightIcon sx={{ fontSize: { xs: '1.125rem', sm: '1.25rem' } }} />}
          sx={{
            ...outlineBtnSx,
            px: { xs: 1, sm: 1.5 },
            py: { sm: 0.75 },
          }}
        >
          {nextLabel}
        </Button>
      </Stack>
    </Box>
  );
}



export default PageNavigator;
