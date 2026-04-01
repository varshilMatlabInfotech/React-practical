import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

const Loader = ({ text = "Loading..." }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 5, gap: 2 }}>
      <CircularProgress size={48} />
      <Typography variant="body1" color="primary" sx={{ animation: 'pulse 1.5s infinite ease-in-out' }}>
        {text}
      </Typography>
      <style>{`
        @keyframes pulse {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }
      `}</style>
    </Box>
  );
};

export default Loader;
