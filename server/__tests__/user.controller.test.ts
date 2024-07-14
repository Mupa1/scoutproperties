import bcrypt from 'bcrypt';
import express, { NextFunction } from 'express';
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

describe('User Controller', () => {
  describe('GET /users', () => {
    it('should return all users', async () => {
      const mockUsers = [{ id: '1', name: 'John Doe' }];
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
      expect(res.body).toEqual({ message: 'Failed to get users!' });
    });
  });

  describe('GET /users/:id', () => {
    it('should return a user by id', async () => {
      const mockUser = { id: '1', name: 'John Doe' };
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
      expect(res.body).toEqual({ message: 'Failed to get user!' });
    });
  });

  describe('PUT /users/:id', () => {
    it('should update a user by id', async () => {
      const mockUser = {
        id: '1',
        name: 'John Doe',
        password: 'hashedPassword',
      };
      const updateUserPayload = {
        name: 'John Updated',
        password: 'newPassword',
      };
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      (prisma.user.update as jest.Mock).mockResolvedValue(mockUser);

      const res = await request(app).put('/users/1').send(updateUserPayload);
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ id: '1', name: 'John Doe' });
    });

    it('should return 500 if there is a server error', async () => {
      (prisma.user.update as jest.Mock).mockRejectedValue(
        new Error('Failed to update users!'),
      );

      const res = await request(app)
        .put('/users/1')
        .send({ name: 'John Updated' });
      expect(res.status).toBe(500);
      expect(res.body).toEqual({ message: 'Failed to update users!' });
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete a user by id', async () => {
      (prisma.user.delete as jest.Mock).mockResolvedValue({});

      const res = await request(app).delete('/users/1');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ message: 'User deleted successfully!' });
    });

    it('should return 500 if there is a server error', async () => {
      (prisma.user.delete as jest.Mock).mockRejectedValue(
        new Error('Failed to delete user'),
      );

      const res = await request(app).delete('/users/1');
      expect(res.status).toBe(500);
      expect(res.body).toEqual({ message: 'Failed to delete user' });
    });
  });
});
