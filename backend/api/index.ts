import dotenv from 'dotenv';
import { connectDB } from '../src/utils/database';
import app from '../src/app';

// Load environment variables
dotenv.config();

// Connect to MongoDB
const startServer = async () => {
  try {
    await connectDB();
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
};

// Initialize database connection
startServer();

// Export the app for Vercel
export default app;
