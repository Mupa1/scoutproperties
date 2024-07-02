import bcrypt from 'bcrypt';
import request from 'supertest';

import app from '../src/app';
import { prisma } from '../src/lib/prisma';

jest.mock('../src/lib/prisma', () => ({
  prisma: {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
      deleteMany: jest.fn(),
    },
    $disconnect: jest.fn(),
  },
}));

describe('Auth API', () => {
  const mockUser = {
    id: '1',
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    password: bcrypt.hashSync('password123', 10),
  };

  beforeEach(async () => {
    await prisma.user.deleteMany({});
    (prisma.user.create as jest.Mock).mockReset();
    (prisma.user.findUnique as jest.Mock).mockReset();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);

      const response = await request(app).post('/api/auth/register').send({
        name: 'John Doe',
        username: 'johndoe',
        email: 'john@example.com',
        password: 'password123',
      });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('User registered successfully!');
    });

    it('should fail to register a user with existing email', async () => {
      const error = {
        code: 'P2002',
        meta: { target: ['email'] },
      };

      (prisma.user.create as jest.Mock).mockRejectedValueOnce(error);

      const response = await request(app).post('/api/auth/register').send({
        name: 'Jane Doe',
        username: 'janedoe',
        email: 'john@example.com',
        password: 'password123',
      });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe(
        'Failed to register user! Please try again!',
      );
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login a user', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const response = await request(app).post('/api/auth/login').send({
        email: 'john@example.com',
        password: 'password123',
      });

      expect(response.status).toBe(200);
      expect(response.body.email).toBe('john@example.com');
    });

    it('should fail to login with invalid credentials', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      const response = await request(app).post('/api/auth/login').send({
        email: 'nonexistent@example.com',
        password: 'wrongpassword',
      });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Invalid Credentials!');
    });
  });

  describe('POST /api/auth/logout', () => {
    it('should logout a user', async () => {
      const response = await request(app).post('/api/auth/logout');
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('User logged out successfully!');
    });
  });
});
