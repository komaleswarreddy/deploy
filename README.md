 # Profile Management Application - Implementation Guide

## Detailed Features Implementation

profile-management/
├── frontend/                 # React frontend application
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── Layout/
│   │   │   │   ├── Header.tsx
│   │   │   │   └── Footer.tsx
│   │   │   ├── Profile/
│   │   │   │   ├── ProfileForm.tsx
│   │   │   │   ├── ProfileView.tsx
│   │   │   │   └── ProfileCard.tsx
│   │   │   ├── UI/
│   │   │   │   ├── LoadingSpinner.tsx
│   │   │   │   ├── ErrorAlert.tsx
│   │   │   │   └── ConfirmationDialog.tsx
│   │   │   └── index.ts
│   │   ├── pages/           # Page components
│   │   │   ├── HomePage.tsx
│   │   │   ├── ProfilePage.tsx
│   │   │   └── NotFoundPage.tsx
│   │   ├── features/        # Redux slices
│   │   │   └── profile/
│   │   │       ├── profileSlice.ts
│   │   │       └── profileThunks.ts
│   │   ├── services/        # API services
│   │   │   └── api.ts
│   │   ├── hooks/           # Custom React hooks
│   │   │   ├── useLocalStorage.ts
│   │   │   └── useFormValidation.ts
│   │   ├── types/           # TypeScript type definitions
│   │   │   └── index.ts
│   │   ├── theme/           # MUI theme configuration
│   │   │   └── theme.ts
│   │   ├── store/           # Redux store configuration
│   │   │   └── index.ts
│   │   ├── utils/           # Utility functions
│   │   │   ├── validation.ts
│   │   │   └── helpers.ts
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── main.tsx
│   │   └── vite-env.d.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
│   ├── index.html
│   └── .env
├── backend/                 # Express backend API
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   │   └── profileController.ts
│   │   ├── models/          # MongoDB models
│   │   │   └── Profile.ts
│   │   ├── routes/          # API routes
│   │   │   └── profileRoutes.ts
│   │   ├── services/        # Business logic
│   │   │   └── profileService.ts
│   │   ├── middlewares/     # Express middlewares
│   │   │   ├── errorHandler.ts
│   │   │   ├── validation.ts
│   │   │   └── auth.ts
│   │   ├── utils/           # Utility functions
│   │   │   ├── logger.ts
│   │   │   └── database.ts
│   │   ├── types/           # TypeScript types
│   │   │   └── index.ts
│   │   └── app.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env
│   └── server.ts
└── README.md

### 1. CRUD Operations
- **Create Profile**: Form with validation for creating new profiles
- **View Profile**: Display profile details in organized card layout
- **Edit Profile**: Pre-filled form with existing data for updates
- **Delete Profile**: Confirmation dialog before permanent deletion

### 2. Form Validation System
- **Zod Schema**: Define validation rules for all profile fields
- **React Hook Form Integration**: Real-time validation with error messages
- **Custom Validators**: Email format, age range, and required field validation
- **Async Validation**: Check for duplicate emails before submission

### 3. State Management
- **Redux Toolkit**: Centralized state for profile data
- **Local Storage Sync**: Automatic persistence of profile data
- **Loading States**: Visual indicators for API operations
- **Error Handling**: Graceful error handling with user feedback

### 4. Responsive UI/UX
- **Material-UI Components**: Consistent design system
- **Mobile-First Design**: Optimized for all screen sizes
- **Theme Customization**: Brand-consistent color scheme
- **Accessibility**: ARIA labels and keyboard navigation support

### 5. API Integration
- **RESTful Endpoints**: Standard CRUD operations
- **Error Handling**: HTTP status code management
- **Authentication Ready**: JWT token support (if needed)
- **CORS Configuration**: Cross-origin request handling

## Backend Setup & Execution

### Prerequisites
- Node.js (v16 or higher)
- MongoDB instance (local or MongoDB Atlas)
- npm or yarn package manager

### Installation Steps

1. **Navigate to backend directory**
   ```bash
   cd profile-management/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment configuration**
   - Copy `.env.example` to `.env`
   - Configure your MongoDB connection string:
     ```
     MONGODB_URI=mongodb://localhost:27017/profile-management
     PORT=4000
     NODE_ENV=development
     CORS_ORIGIN=http://localhost:3000
     ```

4. **Start the backend server**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm run build
   npm start
   ```

5. **Verify server is running**
   - Check health endpoint: `http://localhost:4000/health`
   - Should return: `{"status":"OK","timestamp":"2023-11-15T10:30:00.000Z"}`

## Vercel Deployment Guide

### Full-Stack Deployment (Recommended)

1. **Prepare for Deployment**
   - Ensure all code is committed to GitHub
   - Set up MongoDB Atlas (cloud database) for production

2. **Vercel Configuration**
   - Connect your GitHub repository to Vercel
   - Vercel will auto-detect the project structure

3. **Environment Variables in Vercel**
   - Go to your project settings in Vercel dashboard
   - Add these environment variables:
     ```
     MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/profile-management
     NODE_ENV=production
     CORS_ORIGIN=https://your-app.vercel.app
     ```

4. **Deploy**
   - Vercel will automatically deploy when you push to main branch
   - The deployment process will:
     - Build both frontend and backend
     - Create serverless functions for API routes
     - Deploy static assets for the React app

 