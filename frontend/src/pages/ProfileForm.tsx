import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Box, Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootStateTyped } from '../store';
import { createOrUpdateProfile, clearError } from '../features/profile/profileSlice';
import type { CreateProfileData } from '../types/profile';
import ProfileFormCard from '../components/ProfileFormCard';

const ProfileForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { profile, status, error } = useSelector((state: RootStateTyped) => state.profile);
  const formSubmittedRef = useRef(false);

  // Get initial data from location state (for editing)
  const initialData = location.state?.profile as Partial<CreateProfileData> | undefined;

  useEffect(() => {
    // Clear any previous errors when component mounts
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    // Only navigate to profile view after successful form submission
    // This prevents automatic redirect when just visiting the edit form
    if (status === 'succeeded' && profile && formSubmittedRef.current) {
      navigate('/profile', { replace: true });
    }
  }, [status, profile, navigate]);

  const handleSubmit = (data: CreateProfileData) => {
    formSubmittedRef.current = true;
    dispatch(createOrUpdateProfile(data));
  };

  const handleCancel = () => {
    if (profile) {
      navigate('/profile');
    } else {
      navigate('/');
    }
  };

  const handleCloseSnackbar = () => {
    dispatch(clearError());
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <ProfileFormCard
          initialData={initialData}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={(status as 'idle' | 'loading' | 'succeeded' | 'failed') === 'loading'}
          error={error}
        />
      </Box>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProfileForm;
