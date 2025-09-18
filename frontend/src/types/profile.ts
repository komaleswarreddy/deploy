export interface Profile {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  age?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProfileData {
  name: string;
  email: string;
  age?: number;
}

export interface UpdateProfileData {
  name: string;
  email: string;
  age?: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Array<{
    field: string;
    message: string;
    value?: any;
  }>;
}

export interface ProfileState {
  profile: Profile | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Re-export all types to ensure they're available
export type { 
  Profile, 
  CreateProfileData, 
  UpdateProfileData, 
  ApiResponse, 
  ProfileState 
};
