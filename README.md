# Profile Management Application

A full-stack profile management application built with React, TypeScript, Material-UI, Redux Toolkit, Node.js, Express, and MongoDB.

## Features

- ✅ Create, read, update, and delete user profiles
- ✅ Form validation with Zod and React Hook Form
- ✅ Responsive Material-UI design
- ✅ Redux Toolkit for state management
- ✅ Local storage synchronization
- ✅ TypeScript for type safety
- ✅ RESTful API with Express.js
- ✅ MongoDB for data persistence
- ✅ Error handling and loading states
- ✅ Mobile-first responsive design

## Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for build tooling
- **Material-UI (MUI)** for UI components
- **Redux Toolkit** for state management
- **React Router** for navigation
- **React Hook Form** with Zod validation
- **Emotion** for styling

### Backend
- **Node.js** with TypeScript
- **Express.js** for REST API
- **MongoDB** with Mongoose ODM
- **Express Validator** for input validation
- **CORS** for cross-origin requests

## Project Structure

```
profile-management/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── features/        # Redux slices
│   │   ├── services/        # API services
│   │   ├── hooks/           # Custom React hooks
│   │   ├── types/           # TypeScript type definitions
│   │   ├── theme/           # MUI theme configuration
│   │   └── store/           # Redux store configuration
│   ├── package.json
│   └── vite.config.ts
├── backend/                 # Express backend API
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── middlewares/     # Express middlewares
│   │   └── utils/           # Utility functions
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd profile-management
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Environment Setup

1. **Backend Environment**
   ```bash
   cd backend
   cp env.example .env
   ```
   
   Edit `.env` file:
   ```env
   MONGODB_URI=mongodb://localhost:27017/profile-management
   PORT=4000
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:3000
   ```

2. **Frontend Environment**
   ```bash
   cd frontend
   cp env.example .env
   ```
   
   Edit `.env` file:
   ```env
   REACT_APP_API_BASE_URL=http://localhost:4000/api
   NODE_ENV=development
   ```

### Running the Application

1. **Start MongoDB**
   - Make sure MongoDB is running on your system
   - Or use MongoDB Atlas cloud instance

2. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   The API will be available at `http://localhost:4000`

3. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   The application will be available at `http://localhost:3000`

## API Endpoints

### Profile Management

- `POST /api/profile` - Create or update profile
- `GET /api/profile` - Get profile
- `PUT /api/profile` - Update profile
- `DELETE /api/profile` - Delete profile

### Health Check

- `GET /health` - Server health status

## Usage

1. **Create Profile**: Navigate to the profile form and fill in your information
2. **View Profile**: View your profile information with edit and delete options
3. **Edit Profile**: Click the edit button to modify your profile
4. **Delete Profile**: Click the delete button to remove your profile

## Data Model

### Profile Schema

```typescript
interface Profile {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  age?: number;
  createdAt: string;
  updatedAt: string;
}
```

## Development

### Backend Development

```bash
cd backend
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm test            # Run tests
```

### Frontend Development

```bash
cd frontend
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run ESLint
npm run type-check  # Run TypeScript type checking
```

## Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Deployment

### Vercel Deployment (Frontend)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard:
   - `REACT_APP_API_BASE_URL`: Your backend API URL
3. Deploy automatically on push to main branch

### Backend Deployment

#### Option 1: Vercel Serverless Functions
- Deploy as Vercel serverless functions
- Add `vercel.json` configuration

#### Option 2: Render/Heroku
- Deploy Express app to Render or Heroku
- Set environment variables:
  - `MONGODB_URI`: Your MongoDB connection string
  - `NODE_ENV`: production
  - `CORS_ORIGIN`: Your frontend URL

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Support

If you encounter any issues or have questions, please open an issue in the GitHub repository.
