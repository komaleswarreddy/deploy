# InterNext - Render Deployment Guide

This guide will help you deploy your InterNext application to Render. Your application consists of a React frontend and Node.js/Express backend.

## Prerequisites

1. **Render Account**: Sign up at [render.com](https://render.com)
2. **MongoDB Database**: You'll need a MongoDB Atlas cluster (free tier available)
3. **GitHub Repository**: Your code should be pushed to GitHub

## Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Create a database user
4. Whitelist all IP addresses (0.0.0.0/0) for Render
5. Get your connection string (it will look like: `mongodb+srv://username:password@cluster.mongodb.net/profile-management?retryWrites=true&w=majority`)

## Step 2: Deploy Backend to Render

### Option A: Using Render Dashboard

1. **Create New Web Service**:
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure Backend Service**:
   - **Name**: `internnext-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install && npm run build`
   - **Start Command**: `cd backend && npm start`
   - **Plan**: Free

3. **Set Environment Variables**:
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/profile-management?retryWrites=true&w=majority
   CORS_ORIGIN=https://internnext-frontend.onrender.com
   ```

4. **Deploy**: Click "Create Web Service"

### Option B: Using render.yaml (Recommended)

1. Push your code to GitHub with the `render.yaml` files
2. In Render Dashboard, click "New +" → "Blueprint"
3. Connect your repository
4. Render will automatically detect and use the `render.yaml` configuration

## Step 3: Deploy Frontend to Render

### Option A: Using Render Dashboard

1. **Create New Static Site**:
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Static Site"
   - Connect your GitHub repository

2. **Configure Frontend Service**:
   - **Name**: `internnext-frontend`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`
   - **Plan**: Free

3. **Set Environment Variables**:
   ```
   VITE_API_BASE_URL=https://internnext-backend.onrender.com/api
   ```

4. **Deploy**: Click "Create Static Site"

### Option B: Using render.yaml

The frontend `render.yaml` is already configured for static site deployment.

## Step 4: Update URLs After Deployment

After both services are deployed, you'll need to update the URLs:

1. **Backend CORS_ORIGIN**: Update to your actual frontend URL
2. **Frontend VITE_API_BASE_URL**: Update to your actual backend URL

## Step 5: Environment Variables Summary

### Backend Environment Variables:
```bash
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/profile-management?retryWrites=true&w=majority
CORS_ORIGIN=https://internnext-frontend.onrender.com
```

### Frontend Environment Variables:
```bash
VITE_API_BASE_URL=https://internnext-backend.onrender.com/api
```

## Step 6: Testing Your Deployment

1. **Backend Health Check**: Visit `https://your-backend-url.onrender.com/api/profiles`
2. **Frontend**: Visit your frontend URL
3. **Test CRUD Operations**: Create, read, update, and delete profiles

## Troubleshooting

### Common Issues:

1. **Build Failures**:
   - Check Node.js version (Render uses Node 18 by default)
   - Ensure all dependencies are in `package.json`
   - Check build logs in Render dashboard

2. **Database Connection Issues**:
   - Verify MongoDB Atlas cluster is running
   - Check connection string format
   - Ensure IP whitelist includes Render's IPs

3. **CORS Issues**:
   - Update `CORS_ORIGIN` to match your frontend URL
   - Check that URLs don't have trailing slashes

4. **Environment Variables**:
   - Ensure all required variables are set
   - Check variable names match exactly
   - Restart services after changing environment variables

### Render Free Tier Limitations:

- **Sleep Mode**: Free services sleep after 15 minutes of inactivity
- **Cold Starts**: First request after sleep may take 30+ seconds
- **Build Time**: 90 minutes per month
- **Bandwidth**: 100GB per month

## Production Optimizations

1. **Upgrade to Paid Plan**: For better performance and no sleep mode
2. **Custom Domain**: Add your own domain name
3. **SSL Certificate**: Automatically provided by Render
4. **Monitoring**: Use Render's built-in monitoring tools

## File Structure for Render

```
InterNext/
├── backend/
│   ├── render.yaml          # Backend deployment config
│   ├── package.json         # Backend dependencies
│   └── src/                 # Backend source code
├── frontend/
│   ├── render.yaml          # Frontend deployment config
│   ├── package.json         # Frontend dependencies
│   └── src/                 # Frontend source code
└── render.yaml              # Root deployment config (optional)
```

## Next Steps

1. Deploy backend first
2. Note the backend URL
3. Deploy frontend with correct backend URL
4. Test the complete application
5. Set up custom domain (optional)
6. Configure monitoring and alerts

## Support

- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [React Deployment Guide](https://create-react-app.dev/docs/deployment/)
