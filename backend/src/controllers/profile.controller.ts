import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { ProfileService } from '../services/profile.service';

/**
 * Create or update profile (idempotent operation)
 * POST /api/profile
 */
export const createOrUpdateProfile = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, age } = req.body;

  const profile = await ProfileService.createOrUpdateProfile({
    name,
    email,
    age
  });

  res.status(201).json({
    success: true,
    message: 'Profile created/updated successfully',
    data: {
      profile: {
        id: profile.id,
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        age: profile.age,
        createdAt: profile.createdAt.toISOString(),
        updatedAt: profile.updatedAt.toISOString()
      }
    }
  });
});

/**
 * Get profile
 * GET /api/profile
 */
export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const profile = await ProfileService.getProfile();

  if (!profile) {
    res.status(404).json({
      success: false,
      message: 'Profile not found'
    });
    return;
  }

  res.status(200).json({
    success: true,
    message: 'Profile retrieved successfully',
    data: {
      profile: {
        id: profile.id,
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        age: profile.age,
        createdAt: profile.createdAt.toISOString(),
        updatedAt: profile.updatedAt.toISOString()
      }
    }
  });
});

/**
 * Update profile
 * PUT /api/profile
 */
export const updateProfile = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, age } = req.body;

  const profile = await ProfileService.updateProfile({
    name,
    email,
    age
  });

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    data: {
      profile: {
        id: profile.id,
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        age: profile.age,
        createdAt: profile.createdAt.toISOString(),
        updatedAt: profile.updatedAt.toISOString()
      }
    }
  });
});

/**
 * Delete profile
 * DELETE /api/profile
 */
export const deleteProfile = asyncHandler(async (req: Request, res: Response) => {
  const deleted = await ProfileService.deleteProfile();

  if (!deleted) {
    res.status(404).json({
      success: false,
      message: 'Profile not found'
    });
    return;
  }

  res.status(200).json({
    success: true,
    message: 'Profile deleted successfully'
  });
});

/**
 * Get profile statistics (for debugging)
 * GET /api/profile/stats
 */
export const getProfileStats = asyncHandler(async (req: Request, res: Response) => {
  const count = await ProfileService.getProfileCount();

  res.status(200).json({
    success: true,
    message: 'Profile statistics retrieved successfully',
    data: {
      totalProfiles: count
    }
  });
});
