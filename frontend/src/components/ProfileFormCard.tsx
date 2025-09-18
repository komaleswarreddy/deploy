import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { CreateProfileData } from '../types/profile';

const profileSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  age: z
    .number()
    .min(13, 'Age must be at least 13')
    .max(120, 'Age must be less than 120')
    .optional()
    .or(z.literal('')),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileFormCardProps {
  initialData?: Partial<CreateProfileData>;
  onSubmit: (data: CreateProfileData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  error?: string | null;
}

const ProfileFormCard: React.FC<ProfileFormCardProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
  error,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: initialData?.name || '',
      email: initialData?.email || '',
      age: initialData?.age || '',
    },
    mode: 'onChange',
  });

  const handleFormSubmit = (data: ProfileFormData) => {
    const submitData: CreateProfileData = {
      name: data.name,
      email: data.email,
      age: data.age ? Number(data.age) : undefined,
    };
    onSubmit(submitData);
  };

  return (
    <Card sx={{ maxWidth: 600, width: '100%', mx: 'auto' }}>
      <CardContent>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          {initialData ? 'Update Profile' : 'Create Profile'}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
          {initialData 
            ? 'Update your profile information below.' 
            : 'Fill in your information to create your profile.'
          }
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Full Name"
                placeholder="Enter your full name"
                error={!!errors.name}
                helperText={errors.name?.message}
                disabled={isLoading}
                sx={{ mb: 2 }}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Email Address"
                placeholder="Enter your email address"
                type="email"
                error={!!errors.email}
                helperText={errors.email?.message}
                disabled={isLoading}
                sx={{ mb: 2 }}
              />
            )}
          />

          <Controller
            name="age"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Age (Optional)"
                placeholder="Enter your age"
                type="number"
                inputProps={{ min: 13, max: 120 }}
                error={!!errors.age}
                helperText={errors.age?.message || 'Age is optional (13-120)'}
                disabled={isLoading}
                sx={{ mb: 2 }}
                value={field.value || ''}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value === '' ? '' : Number(value));
                }}
              />
            )}
          />
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
        <Button
          onClick={onCancel}
          disabled={isLoading}
          sx={{ minWidth: 100 }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(handleFormSubmit)}
          variant="contained"
          disabled={isLoading || !isValid}
          sx={{ minWidth: 100 }}
        >
          {isLoading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            initialData ? 'Update Profile' : 'Create Profile'
          )}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProfileFormCard;
