import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { profile } = useSelector((state: RootState) => state.profile);

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleProfileClick = () => {
    if (profile) {
      navigate('/profile');
    } else {
      navigate('/profile-form');
    }
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
          onClick={handleLogoClick}
        >
          Profile Manager
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {profile ? (
            <>
              <Avatar
                sx={{
                  bgcolor: 'secondary.main',
                  width: 32,
                  height: 32,
                  fontSize: '0.875rem',
                }}
              >
                {profile.firstName.charAt(0).toUpperCase()}
                {profile.lastName?.charAt(0).toUpperCase() || ''}
              </Avatar>
              <Typography variant="body2" sx={{ color: 'white' }}>
                {profile.firstName} {profile.lastName}
              </Typography>
              <Button
                color="inherit"
                onClick={handleProfileClick}
                sx={{ ml: 1 }}
              >
                View Profile
              </Button>
            </>
          ) : (
            <Button
              color="inherit"
              onClick={handleProfileClick}
              variant="outlined"
              sx={{
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              Create Profile
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
