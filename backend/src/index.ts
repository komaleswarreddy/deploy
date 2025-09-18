import type { VercelRequest, VercelResponse } from '@vercel/node';
import dotenv from 'dotenv';
import { connectDB } from './utils/database';
import app from './app';

// Load environment variables
dotenv.config();

// Connect to MongoDB (only once)
let isConnected = false;
const connectToDB = async () => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
};

// Vercel serverless function handler
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Connect to database
  await connectToDB();
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Use the Express app to handle the request
  return new Promise((resolve, reject) => {
    app(req, res, (err: any) => {
      if (err) {
        console.error('API Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        reject(err);
      } else {
        resolve(undefined);
      }
    });
  });
}

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 4000;
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
    });
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err: Error) => {
    console.error('Unhandled Promise Rejection:', err.message);
    process.exit(1);
  });

  // Handle uncaught exceptions
  process.on('uncaughtException', (err: Error) => {
    console.error('Uncaught Exception:', err.message);
    process.exit(1);
  });
}
