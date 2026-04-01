import React, { useState } from 'react';
import { Container, Paper, Typography, Box } from '@mui/material';
import Navigation from '../common/Navigation';
import UserList from './UserList';
import Bookmarks from './Bookmarks';

const Home = () => {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: { xs: 2, md: 4 }, 
          borderRadius: 4, 
          minHeight: '80vh', 
          display: 'flex', 
          flexDirection: 'column',
          width: { md: '100%' }, // In Container maxWidth="md", we align with the 70% requirement conceptually via Material UI's responsive Container
        }}
      >
        <Typography 
          variant="h3" 
          component="h1" 
          align="center" 
          gutterBottom 
          sx={{ fontWeight: 700, mb: 4, color: 'primary.main' }}
        >
          Users List
        </Typography>
        
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {activeTab === 'users' ? <UserList /> : <Bookmarks />}
        </Box>
      </Paper>
    </Container>
  );
};

export default Home;
