import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import profileRoutes from './routes/profile.routes';
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';

// Load environment variables
dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      process.env.CORS_ORIGIN,
      'http://localhost:5173',
      'http://localhost:3000',
      'https://frontend-vercel-zbmt.onrender.com',
      'https://internnext-frontend.onrender.com',
      'https://frontend-vercel-zbmt.onrender.com/',
      'https://internnext-frontend.onrender.com/',
      'https://profile-management-deploy.vercel.app',
      'https://profile-management-deploy.vercel.app/'
    ].filter(Boolean); // Remove undefined values
    
    // Allow all Vercel domains
    const isVercelDomain = origin.includes('.vercel.app') || origin.includes('vercel.app');
    
    console.log('CORS check - Origin:', origin, 'Allowed origins:', allowedOrigins, 'Is Vercel:', isVercelDomain);
    
    if (allowedOrigins.includes(origin) || isVercelDomain) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root API endpoint
app.get('/api', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/api/health',
      profile: '/api/profile'
    }
  });
});

// API routes
app.use('/api/profile', profileRoutes);

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`, {
    origin: req.headers.origin,
    userAgent: req.headers['user-agent'],
    contentType: req.headers['content-type']
  });
  next();
});

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

export default app;