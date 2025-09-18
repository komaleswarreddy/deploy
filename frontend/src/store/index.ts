import { configureStore } from '@reduxjs/toolkit';
import profileReducer from '../features/profile/profileSlice';

export const store = configureStore({
  reducer: {
    profile: profileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Explicitly type the profile state
export interface RootStateTyped {
  profile: {
    profile: any;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  };
}