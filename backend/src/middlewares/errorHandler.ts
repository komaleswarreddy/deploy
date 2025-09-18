import { Request, Response, NextFunction } from 'express';
import { Error } from 'mongoose';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = 500;
  let message = 'Internal Server Error';
  let errors: Array<{ field: string; message: string; value?: any }> = [];

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed';
    const validationError = err as Error.ValidationError;
    errors = Object.keys(validationError.errors).map(field => ({
      field,
      message: validationError.errors[field].message,
      value: validationError.errors[field].value
    }));
  }

  // Mongoose duplicate key error
  if (err.name === 'MongoServerError' && (err as any).code === 11000) {
    statusCode = 400;
    message = 'Duplicate field value';
    const field = Object.keys((err as any).keyPattern)[0];
    errors = [{
      field,
      message: `${field} already exists`,
      value: (err as any).keyValue[field]
    }];
  }

  // Mongoose cast error
  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid data format';
    const castError = err as Error.CastError;
    errors = [{
      field: castError.path,
      message: `Invalid ${castError.kind} for field ${castError.path}`,
      value: castError.value
    }];
  }

  // Custom error with status code
  if ((err as any).statusCode) {
    statusCode = (err as any).statusCode;
    message = err.message;
  }

  // Log error for debugging
  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    statusCode,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  res.status(statusCode).json({
    success: false,
    message,
    ...(errors.length > 0 && { errors })
  });
};
