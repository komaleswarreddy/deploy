import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../app';
import Profile from '../models/profile.model';

describe('Profile API', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await Profile.deleteMany({});
  });

  describe('POST /api/profile', () => {
    it('should create a new profile', async () => {
      const profileData = {
        name: 'John Doe',
        email: 'john@example.com',
        age: 30
      };

      const response = await request(app)
        .post('/api/profile')
        .send(profileData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.profile.firstName).toBe('John');
      expect(response.body.data.profile.lastName).toBe('Doe');
      expect(response.body.data.profile.email).toBe('john@example.com');
      expect(response.body.data.profile.age).toBe(30);
    });

    it('should update existing profile when email exists', async () => {
      // Create initial profile
      const initialProfile = new Profile({
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        age: 25
      });
      await initialProfile.save();

      const updateData = {
        name: 'Jane Smith Updated',
        email: 'jane@example.com',
        age: 26
      };

      const response = await request(app)
        .post('/api/profile')
        .send(updateData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.profile.firstName).toBe('Jane');
      expect(response.body.data.profile.lastName).toBe('Smith Updated');
      expect(response.body.data.profile.age).toBe(26);
    });

    it('should return validation error for invalid data', async () => {
      const invalidData = {
        name: 'Jo', // Too short
        email: 'invalid-email',
        age: -5
      };

      const response = await request(app)
        .post('/api/profile')
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.errors).toHaveLength(3);
    });
  });

  describe('GET /api/profile', () => {
    it('should return profile if exists', async () => {
      const profile = new Profile({
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        age: 30
      });
      await profile.save();

      const response = await request(app)
        .get('/api/profile')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.profile.email).toBe('test@example.com');
    });

    it('should return 404 if no profile exists', async () => {
      const response = await request(app)
        .get('/api/profile')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Profile not found');
    });
  });

  describe('PUT /api/profile', () => {
    it('should update existing profile', async () => {
      const profile = new Profile({
        firstName: 'Original',
        lastName: 'Name',
        email: 'original@example.com',
        age: 25
      });
      await profile.save();

      const updateData = {
        name: 'Updated Name',
        email: 'updated@example.com',
        age: 26
      };

      const response = await request(app)
        .put('/api/profile')
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.profile.firstName).toBe('Updated');
      expect(response.body.data.profile.lastName).toBe('Name');
      expect(response.body.data.profile.email).toBe('updated@example.com');
    });

    it('should return 404 if no profile exists', async () => {
      const updateData = {
        name: 'New Name',
        email: 'new@example.com'
      };

      const response = await request(app)
        .put('/api/profile')
        .send(updateData)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Profile not found');
    });
  });

  describe('DELETE /api/profile', () => {
    it('should delete existing profile', async () => {
      const profile = new Profile({
        firstName: 'Delete',
        lastName: 'Me',
        email: 'delete@example.com'
      });
      await profile.save();

      const response = await request(app)
        .delete('/api/profile')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Profile deleted successfully');
    });

    it('should return 404 if no profile exists', async () => {
      const response = await request(app)
        .delete('/api/profile')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Profile not found');
    });
  });
});
