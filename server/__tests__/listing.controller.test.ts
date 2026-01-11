import dotenv from 'dotenv';
import express, { NextFunction, Response } from 'express';
import request from 'supertest';

import { prisma } from '../src/lib/prisma';
import listingRouter from '../src/routes/listing.route';
import { CustomRequest } from '../src/types';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/listings', listingRouter);

jest.mock('../src/lib/prisma', () => ({
  prisma: {
    listing: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  },
}));

jest.mock('../src/middleware/verifyToken', () => ({
  verifyToken: (req: CustomRequest, res: Response, next: NextFunction) => {
    req.userId = '1';
    next();
  },
}));

const mockListing = {
  id: '1',
  title: 'Beautiful House',
  images: ['img1', 'img2'],
  bedroom: 3,
  bathroom: 2,
  price: 100000,
  address: '123 Main St',
  city: 'Sample City',
  latitude: '45.0',
  longitude: '90.0',
  type: 'Buy',
  property: 'House',
  createdAt: new Date().toISOString(),
  userId: '1',
};

const mockListingDetails = {
  id: '1',
  description: 'A beautiful house',
  parking: 'available',
  size: 1200,
  school: 500,
  bus: 300,
  restaurant: 100,
  listingId: '1',
};

const setupMocks = () => {
  (prisma.listing.create as jest.Mock).mockReset();
  (prisma.listing.findMany as jest.Mock).mockReset();
  (prisma.listing.findUnique as jest.Mock).mockReset();
  (prisma.listing.update as jest.Mock).mockReset();
};

describe('Listing Controller', () => {
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

  describe('GET /listings', () => {
    it('should return all listings', async () => {
      const mockListings = [mockListing];
      (prisma.listing.findMany as jest.Mock).mockResolvedValue(mockListings);

      const res = await request(app).get('/listings');
      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockListings);
    });

    it('should return 500 if there is a server error', async () => {
      (prisma.listing.findMany as jest.Mock).mockRejectedValue(
        new Error('Internal server error'),
      );

      const res = await request(app).get('/listings');
      expect(res.status).toBe(500);
      expect(res.body.message).toBe('Failed to get listings!');
    });
  });

  describe('GET /listings/:id', () => {
    it('should return a listing by id', async () => {
      (prisma.listing.findUnique as jest.Mock).mockResolvedValue({
        ...mockListing,
        listingDetails: mockListingDetails,
      });

      const res = await request(app).get('/listings/1');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        ...mockListing,
        listingDetails: mockListingDetails,
        user: null,
      });
    });

    it('should return 500 if there is a server error', async () => {
      (prisma.listing.findUnique as jest.Mock).mockRejectedValue(
        new Error('Failed to get listing!'),
      );

      const res = await request(app).get('/listings/1');
      expect(res.status).toBe(500);
      expect(res.body.message).toBe('Failed to get listing!');
    });
  });

  describe('POST /listings', () => {
    it('should create a new listing', async () => {
      const newListing = {
        ...mockListing,
        listingDetails: mockListingDetails,
      };
      (prisma.listing.create as jest.Mock).mockResolvedValue(newListing);

      const res = await request(app).post('/listings').send(newListing);
      expect(res.status).toBe(200);
      expect(res.body).toEqual(newListing);
    });

    it('should return 500 if there is a server error', async () => {
      (prisma.listing.create as jest.Mock).mockRejectedValue(
        new Error('Failed to create listing!'),
      );

      const res = await request(app).post('/listings').send(mockListing);
      expect(res.status).toBe(500);
      expect(res.body.message).toBe('Failed to create listing!');
    });
  });

  describe('PUT /listings/:id', () => {
    it('should update an existing listing', async () => {
      const updatedListing = {
        ...mockListing,
        title: 'Updated Beautiful House',
        listingDetails: {
          ...mockListingDetails,
          description: 'Updated description',
        },
      };
      (prisma.listing.update as jest.Mock).mockResolvedValue(updatedListing);
      (prisma.listing.findUnique as jest.Mock).mockResolvedValue(mockListing);

      const res = await request(app)
        .put('/listings/1')
        .send({
          listingData: {
            title: 'Updated Beautiful House',
            images: ['img1', 'img2'],
            bedroom: 3,
            bathroom: 2,
            price: 100000,
            address: '123 Main St',
            city: 'Sample City',
            latitude: '45.0',
            longitude: '90.0',
            type: 'Buy',
            property: 'House',
          },
          listingDetails: {
            description: 'Updated description',
            parking: 'available',
            size: 1200,
            school: 500,
            bus: 300,
            restaurant: 100,
          },
        });

      expect(res.status).toBe(200);
      expect(res.body).toEqual(updatedListing);
    });

    it('should return 403 if the user is not authorized to update the listing', async () => {
      const anotherUserListing = { ...mockListing, userId: '2' };
      (prisma.listing.findUnique as jest.Mock).mockResolvedValue(
        anotherUserListing,
      );

      const res = await request(app)
        .put('/listings/1')
        .send({
          listingData: {
            title: 'Updated Beautiful House',
            images: ['img1', 'img2'],
            bedroom: 3,
            bathroom: 2,
            price: 100000,
            address: '123 Main St',
            city: 'Sample City',
            latitude: '45.0',
            longitude: '90.0',
            type: 'Buy',
            property: 'House',
          },
          listingDetails: {
            description: 'Updated description',
            parking: 'available',
            size: 1200,
            school: 500,
            bus: 300,
            restaurant: 100,
          },
        });

      expect(res.status).toBe(403);
      expect(res.body.message).toBe('Not Authorized!');
    });

    it('should return 500 if there is a server error', async () => {
      (prisma.listing.update as jest.Mock).mockRejectedValue(
        new Error('Internal server error'),
      );
      (prisma.listing.findUnique as jest.Mock).mockResolvedValue(mockListing);

      const res = await request(app)
        .put('/listings/1')
        .send({
          listingData: {
            title: 'Updated Beautiful House',
            images: ['img1', 'img2'],
            bedroom: 3,
            bathroom: 2,
            price: 100000,
            address: '123 Main St',
            city: 'Sample City',
            latitude: '45.0',
            longitude: '90.0',
            type: 'Buy',
            property: 'House',
          },
          listingDetails: {
            description: 'Updated description',
            parking: 'available',
            size: 1200,
            school: 500,
            bus: 300,
            restaurant: 100,
          },
        });

      expect(res.status).toBe(500);
      expect(res.body.message).toBe('Failed to update listing!');
    });
  });
});
