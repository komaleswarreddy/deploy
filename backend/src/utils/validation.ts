import { body } from 'express-validator';

export const validateProfile = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long')
    .isLength({ max: 100 })
    .withMessage('Name cannot exceed 100 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail()
    .isLength({ max: 100 })
    .withMessage('Email cannot exceed 100 characters'),

  body('age')
    .optional()
    .isInt({ min: 13, max: 120 })
    .withMessage('Age must be an integer between 13 and 120')
    .toInt()
];

export const validateUpdateProfile = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long')
    .isLength({ max: 100 })
    .withMessage('Name cannot exceed 100 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),

  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail()
    .isLength({ max: 100 })
    .withMessage('Email cannot exceed 100 characters'),

  body('age')
    .optional()
    .isInt({ min: 13, max: 120 })
    .withMessage('Age must be an integer between 13 and 120')
    .toInt()
];
