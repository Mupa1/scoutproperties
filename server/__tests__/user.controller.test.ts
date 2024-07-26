import bcrypt from 'bcrypt';
import express, { NextFunction, Response } from 'express';
import request from 'supertest';

import { prisma } from '../src/lib/prisma';
import userRouter from '../src/routes/user.route';
import { CustomRequest } from '../src/types';

const app = express();
app.use(express.json());
app.use('/users', userRouter);

jest.mock('../src/lib/prisma', () => ({
  prisma: {
    user: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

jest.mock('bcrypt');
jest.mock('../src/middleware/verifyToken', () => ({
  verifyToken: (req: CustomRequest, res: Response, next: NextFunction) => {
    req.userId = '1';
    next();
  },
}));

const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'johndoe@mail.com',
  company: 'listing company',
  avatar: 'img1',
  createdAt: '2024-07-25T06:07:00.128Z',
};

const setupMocks = () => {
  (prisma.user.findMany as jest.Mock).mockReset();
  (prisma.user.findUnique as jest.Mock).mockReset();
  (prisma.user.update as jest.Mock).mockReset();
  (prisma.user.delete as jest.Mock).mockReset();
  (bcrypt.hash as jest.Mock).mockReset();
};

describe('User Controller', () => {
  let originalError: typeof console.error;

  beforeAll(() => {
    originalError = console.error;
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalError;
  });

  beforeEach(async () => {
    setupMocks();
  });

  describe('GET /users', () => {
    it('should return all users', async () => {
      const mockUsers = [mockUser];
      (prisma.user.findMany as jest.Mock).mockResolvedValue(mockUsers);

      const res = await request(app).get('/users');
      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockUsers);
    });

    it('should return 500 if there is a server error', async () => {
      (prisma.user.findMany as jest.Mock).mockRejectedValue(
        new Error('Failed to get users!'),
      );

      const res = await request(app).get('/users');
      expect(res.status).toBe(500);
      expect(res.body.message).toBe('Failed to get users!');
    });
  });

  describe('GET /users/:id', () => {
    it('should return a user by id', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const res = await request(app).get('/users/1');
      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockUser);
    });

    it('should return 500 if there is a server error', async () => {
      (prisma.user.findUnique as jest.Mock).mockRejectedValue(
        new Error('Failed to get user!'),
      );

      const res = await request(app).get('/users/1');
      expect(res.status).toBe(500);
      expect(res.body.message).toBe('Failed to get user!');
    });
  });

  describe('PUT /users/:id', () => {
    it('should update a user by id', async () => {
      const updatedUser = { ...mockUser, name: 'John Updated' };
      const updateUserPayload = {
        name: 'John Updated',
        email: 'johnupdated@mail.com',
        password: 'newPassword',
      };
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      (prisma.user.update as jest.Mock).mockResolvedValue(updatedUser);

      const res = await request(app).put('/users/1').send(updateUserPayload);
      expect(res.status).toBe(200);
      expect(res.body).toEqual(updatedUser);
    });

    it('should return 500 if there is a server error', async () => {
      (prisma.user.update as jest.Mock).mockRejectedValue(
        new Error('Failed to update users!'),
      );

      const res = await request(app)
        .put('/users/1')
        .send({ name: 'John Updated' });
      expect(res.status).toBe(500);
      expect(res.body.message).toBe('Failed to update users!');
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete a user by id', async () => {
      (prisma.user.delete as jest.Mock).mockResolvedValue({});

      const res = await request(app).delete('/users/1');
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('User deleted successfully!');
    });

    it('should return 500 if there is a server error', async () => {
      (prisma.user.delete as jest.Mock).mockRejectedValue(
        new Error('Failed to delete user'),
      );

      const res = await request(app).delete('/users/1');
      expect(res.status).toBe(500);
      expect(res.body.message).toBe('Failed to delete user');
    });
  });
});
