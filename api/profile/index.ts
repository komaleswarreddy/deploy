import type { VercelRequest, VercelResponse } from '@vercel/node';
import dotenv from 'dotenv';
import { connectDB } from '../../backend/src/utils/database';
import profileRoutes from '../../backend/src/routes/profile.routes';
import express from 'express';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Use the profile routes
app.use('/', profileRoutes);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
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
        console.error('Profile API Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        reject(err);
      } else {
        resolve(undefined);
      }
    });
  });
}
