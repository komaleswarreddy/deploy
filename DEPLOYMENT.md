# Vercel Deployment Guide

## Full-Stack Deployment to Vercel

This project is configured to deploy both frontend and backend to Vercel.

### Prerequisites

1. **MongoDB Atlas Account** (for production database)
2. **Vercel Account**
3. **GitHub Repository** (public)

### Environment Variables Setup

#### Backend Environment Variables (in Vercel Dashboard)

1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add the following variables:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/profile-management
NODE_ENV=production
CORS_ORIGIN=https://your-app-name.vercel.app
PORT=3000
```

#### Frontend Environment Variables (Optional)

The frontend is configured to automatically use `/api` for production, but you can override:

```
VITE_API_BASE_URL=/api
NODE_ENV=production
```

### Deployment Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Configure for Vercel deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect the configuration

3. **Configure Build Settings**
   - Root Directory: Leave empty (uses root)
   - Build Command: `npm run build`
   - Output Directory: `public`

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete

### Project Structure for Vercel

```
/
├── vercel.json              # Vercel configuration
├── package.json             # Root package.json with workspaces
├── frontend/                # React frontend
│   ├── package.json
│   ├── vite.config.ts
│   └── dist/               # Built frontend (generated)
├── backend/                 # Express backend
│   ├── src/                # Source code
│   └── api/                # Vercel API entry point
│       └── index.ts
└── public/                 # Static files (generated)
```

### API Routes

- Frontend: `https://your-app.vercel.app/`
- API: `https://your-app.vercel.app/api/profile`

### Troubleshooting

1. **Build Errors**: Check that all dependencies are installed
2. **API Not Working**: Verify MongoDB connection string
3. **CORS Issues**: Check CORS_ORIGIN environment variable
4. **Frontend Not Loading**: Verify build output directory

### Local Development

```bash
# Install all dependencies
npm run install:all

# Start both frontend and backend
npm run dev

# Build for production
npm run build
```

### Environment URLs

- **Development**: 
  - Frontend: http://localhost:3000
  - Backend: http://localhost:4000
- **Production**: 
  - Both: https://your-app.vercel.app
