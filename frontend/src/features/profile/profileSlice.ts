import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Profile, CreateProfileData, UpdateProfileData, ProfileState } from '../../types/profile';
import { ProfileApiService } from '../../services/profileApi';

const initialState: ProfileState = {
  profile: null,
  status: 'idle',
  error: null,
};

// Async thunks
export const createOrUpdateProfile = createAsyncThunk(
  'profile/createOrUpdateProfile',
  async (data: CreateProfileData, { rejectWithValue }) => {
    try {
      const response = await ProfileApiService.createOrUpdateProfile(data);
      if (response.success && response.data) {
        return response.data.profile;
      }
      throw new Error(response.message || 'Failed to create/update profile');
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'An error occurred');
    }
  }
);

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ProfileApiService.getProfile();
      if (response.success && response.data) {
        return response.data.profile;
      }
      throw new Error(response.message || 'Profile not found');
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'An error occurred');
    }
  }
);

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (data: UpdateProfileData, { rejectWithValue }) => {
    try {
      const response = await ProfileApiService.updateProfile(data);
      if (response.success && response.data) {
        return response.data.profile;
      }
      throw new Error(response.message || 'Failed to update profile');
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'An error occurred');
    }
  }
);

export const deleteProfile = createAsyncThunk(
  'profile/deleteProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ProfileApiService.deleteProfile();
      if (response.success) {
        return true;
      }
      throw new Error(response.message || 'Failed to delete profile');
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'An error occurred');
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.profile = null;
      state.status = 'idle';
      state.error = null;
    },
    setProfile: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload;
      state.status = 'succeeded';
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create or Update Profile
      .addCase(createOrUpdateProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createOrUpdateProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(createOrUpdateProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Fetch Profile
      .addCase(fetchProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Delete Profile
      .addCase(deleteProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteProfile.fulfilled, (state) => {
        state.status = 'succeeded';
        state.profile = null;
        state.error = null;
      })
      .addCase(deleteProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { clearProfile, setProfile, clearError } = profileSlice.actions;
export default profileSlice.reducer;
