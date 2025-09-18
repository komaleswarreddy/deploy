import { apiClient } from './apiClient';
import type { Profile, CreateProfileData, UpdateProfileData, ApiResponse } from '../types/profile';

export class ProfileApiService {
  static async createOrUpdateProfile(data: CreateProfileData): Promise<ApiResponse<{ profile: Profile }>> {
    return apiClient.post<ApiResponse<{ profile: Profile }>>('/profile', data);
  }

  static async getProfile(): Promise<ApiResponse<{ profile: Profile }>> {
    return apiClient.get<ApiResponse<{ profile: Profile }>>('/profile');
  }

  static async updateProfile(data: UpdateProfileData): Promise<ApiResponse<{ profile: Profile }>> {
    return apiClient.put<ApiResponse<{ profile: Profile }>>('/profile', data);
  }

  static async deleteProfile(): Promise<ApiResponse<{ message: string }>> {
    return apiClient.delete<ApiResponse<{ message: string }>>('/profile');
  }
}
