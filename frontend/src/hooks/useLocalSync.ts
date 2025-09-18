import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootStateTyped, AppDispatch } from '../store';
import { setProfile, clearProfile } from '../features/profile/profileSlice';
import type { Profile } from '../types/profile';

const PROFILE_STORAGE_KEY = 'profile-management-profile';

export const useLocalSync = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { profile, status } = useSelector((state: RootStateTyped) => state.profile);

  // Load profile from localStorage on app start
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (savedProfile) {
        const parsedProfile: Profile = JSON.parse(savedProfile);
        dispatch(setProfile(parsedProfile));
      }
    } catch (error) {
      console.error('Failed to load profile from localStorage:', error);
      // Clear corrupted data
      localStorage.removeItem(PROFILE_STORAGE_KEY);
    }
  }, [dispatch]);

  // Save profile to localStorage when it changes
  useEffect(() => {
    if (profile && status === 'succeeded') {
      try {
        localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
      } catch (error) {
        console.error('Failed to save profile to localStorage:', error);
      }
    } else if (!profile && status === 'succeeded') {
      // Clear localStorage when profile is deleted
      try {
        localStorage.removeItem(PROFILE_STORAGE_KEY);
      } catch (error) {
        console.error('Failed to clear profile from localStorage:', error);
      }
    }
  }, [profile, status]);

  // Clear profile function
  const clearProfileData = () => {
    dispatch(clearProfile());
    try {
      localStorage.removeItem(PROFILE_STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear profile from localStorage:', error);
    }
  };

  return {
    clearProfileData,
  };
};
