import { Router } from 'express';
import {
  createOrUpdateProfile,
  getProfile,
  updateProfile,
  deleteProfile,
  getProfileStats
} from '../controllers/profile.controller';
import { validateRequest } from '../middlewares/validateRequest';
import { validateProfile, validateUpdateProfile } from '../utils/validation';

const router = Router();

/**
 * @route   POST /api/profile
 * @desc    Create or update profile (idempotent)
 * @access  Public
 */
router.post('/', validateRequest(validateProfile), createOrUpdateProfile);

/**
 * @route   GET /api/profile
 * @desc    Get profile
 * @access  Public
 */
router.get('/', getProfile);

/**
 * @route   PUT /api/profile
 * @desc    Update profile
 * @access  Public
 */
router.put('/', validateRequest(validateUpdateProfile), updateProfile);

/**
 * @route   DELETE /api/profile
 * @desc    Delete profile
 * @access  Public
 */
router.delete('/', deleteProfile);

/**
 * @route   GET /api/profile/stats
 * @desc    Get profile statistics (for debugging)
 * @access  Public
 */
router.get('/stats', getProfileStats);

export default router;
