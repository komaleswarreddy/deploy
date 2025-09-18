import Profile, { IProfile } from '../models/profile.model';

export interface CreateProfileData {
  name: string;
  email: string;
  age?: number;
}

export interface UpdateProfileData {
  name?: string;
  email?: string;
  age?: number;
}

export class ProfileService {
  /**
   * Split name into firstName and lastName
   */
  private static splitName(name: string): { firstName: string; lastName?: string } {
    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : undefined;
    
    return { firstName, lastName };
  }

  /**
   * Create or update a profile (idempotent operation)
   */
  static async createOrUpdateProfile(data: CreateProfileData): Promise<IProfile> {
    const { firstName, lastName } = this.splitName(data.name);
    
    // Check if profile exists by email
    const existingProfile = await Profile.findOne({ email: data.email });
    
    if (existingProfile) {
      // Update existing profile
      existingProfile.firstName = firstName;
      existingProfile.lastName = lastName;
      existingProfile.email = data.email;
      existingProfile.age = data.age;
      
      return await existingProfile.save();
    } else {
      // Create new profile
      const profile = new Profile({
        firstName,
        lastName,
        email: data.email,
        age: data.age
      });
      
      return await profile.save();
    }
  }

  /**
   * Get the profile (since this is a single-profile app)
   */
  static async getProfile(): Promise<IProfile | null> {
    return await Profile.findOne();
  }

  /**
   * Update an existing profile
   */
  static async updateProfile(data: UpdateProfileData): Promise<IProfile> {
    const profile = await Profile.findOne();
    
    if (!profile) {
      throw new Error('Profile not found');
    }

    if (data.name) {
      const { firstName, lastName } = this.splitName(data.name);
      profile.firstName = firstName;
      profile.lastName = lastName;
    }

    if (data.email) {
      profile.email = data.email;
    }

    if (data.age !== undefined) {
      profile.age = data.age;
    }

    return await profile.save();
  }

  /**
   * Delete the profile
   */
  static async deleteProfile(): Promise<boolean> {
    const result = await Profile.deleteOne();
    return result.deletedCount > 0;
  }

  /**
   * Get profile count (for debugging)
   */
  static async getProfileCount(): Promise<number> {
    return await Profile.countDocuments();
  }
}
