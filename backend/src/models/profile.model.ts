import mongoose, { Document, Schema } from 'mongoose';

export interface IProfile extends Document {
  firstName: string;
  lastName?: string;
  email: string;
  age?: number;
  createdAt: Date;
  updatedAt: Date;
}

const profileSchema = new Schema<IProfile>(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      minlength: [1, 'First name must be at least 1 character long'],
      maxlength: [50, 'First name cannot exceed 50 characters']
    },
    lastName: {
      type: String,
      required: false,
      trim: true,
      maxlength: [50, 'Last name cannot exceed 50 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address'
      ]
    },
    age: {
      type: Number,
      required: false,
      min: [0, 'Age must be a positive number'],
      max: [150, 'Age cannot exceed 150']
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: function(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
);

// Index for better query performance
profileSchema.index({ email: 1 });

// Pre-save middleware to ensure only one profile exists
profileSchema.pre('save', async function(next) {
  // Only check for duplicates on new documents or when email is being modified
  if (this.isNew || this.isModified('email')) {
    const existingProfile = await Profile.findOne({ email: this.email });
    if (existingProfile && existingProfile._id.toString() !== this._id.toString()) {
      const error = new Error('A profile with this email already exists');
      return next(error);
    }
  }
  next();
});

const Profile = mongoose.model<IProfile>('Profile', profileSchema);

export default Profile;
