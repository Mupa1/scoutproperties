import dotenv from 'dotenv';
dotenv.config();

import { Request, Response } from 'express';

import { CustomRequest } from '@/types';

import { prisma } from '../lib/prisma';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const handlePrismaError = (err: unknown, res: Response) => {
  console.error('❌ Prisma error:', err);

  if (err instanceof Error && err.message.includes('Authentication failed')) {
    res.status(500).json({
      message: 'Database authentication failed',
    });
    return;
  }

  res.status(500).json({ message: 'Internal server error' });
};

if (!JWT_SECRET_KEY) {
  throw new Error('JWT_SECRET_KEY is not defined in the environment variables');
}

enum Type {
  Buy = 'Buy',
  Rent = 'Rent',
}

enum Property {
  Apartment = 'Apartment',
  House = 'House',
  Condo = 'Condo',
  Land = 'Land',
}

export const createListing = async (
  req: CustomRequest,
  res: Response,
): Promise<void> => {
  const body = req.body;
  const tokenUserId = req.userId;

  try {
    const newlisting = await prisma.listing.create({
      data: {
        ...body.listingData,
        userId: tokenUserId,
        listingDetails: {
          create: body.listingDetails,
        },
      },
    });
    res.status(200).json(newlisting);
  } catch (err) {
    handlePrismaError(err, res);
  }
};

export const updateListing = async (req: CustomRequest, res: Response) => {
  const { id } = req.params;
  const { listingData, listingDetails } = req.body;
  const tokenUserId = req.userId;

  try {
    const listing = await prisma.listing.findUnique({ where: { id } });
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    if (listing.userId !== tokenUserId) {
      return res.status(403).json({ message: 'Not Authorized!' });
    }

    const updatedListing = await prisma.listing.update({
      where: { id },
      data: {
        ...listingData,
        listingDetails: {
          update: listingDetails,
        },
      },
    });

    res.status(200).json(updatedListing);
  } catch (err) {
    handlePrismaError(err, res);
  }
};

export const getListings = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { city, type, property, bedroom, minPrice, maxPrice } = req.query;
  try {
    // Parse price values
    const parsedMinPrice = minPrice ? parseInt(minPrice as string) : undefined;
    const parsedMaxPrice = maxPrice ? parseInt(maxPrice as string) : undefined;

    // Build price filter only if at least one price value is provided
    const priceFilter: { gte?: number; lte?: number } = {};
    if (parsedMinPrice && !isNaN(parsedMinPrice)) {
      priceFilter.gte = parsedMinPrice;
    }
    if (parsedMaxPrice && !isNaN(parsedMaxPrice)) {
      priceFilter.lte = parsedMaxPrice;
    }

    // Parse bedroom value
    const parsedBedroom = bedroom ? parseInt(bedroom as string) : undefined;

    const whereClause: Record<string, unknown> = {};

    // Add city filter if provided
    if (typeof city === 'string' && city.trim() !== '') {
      whereClause.city = city;
    }

    // Add type filter if provided
    if (
      typeof type === 'string' &&
      Object.values(Type).includes(type as Type)
    ) {
      whereClause.type = type as Type;
    }

    // Add property filter if provided
    if (
      typeof property === 'string' &&
      Object.values(Property).includes(property as Property)
    ) {
      whereClause.property = property as Property;
    }

    // Only add bedroom filter if it's a valid number
    if (parsedBedroom && !isNaN(parsedBedroom)) {
      whereClause.bedroom = parsedBedroom;
    }

    // Only add price filter if at least one price value is provided
    if (Object.keys(priceFilter).length > 0) {
      whereClause.price = priceFilter;
    }

    const listings = await prisma.listing.findMany({
      where: whereClause,
    });

    res.status(200).json(listings);
  } catch (err) {
    handlePrismaError(err, res);
  }
};

export const getListing = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const id = req.params.id;
  try {
    const listing = await prisma.listing.findUnique({
      where: { id },
      include: {
        listingDetails: true,
        user: {
          select: {
            name: true,
            company: true,
            email: true,
            avatar: true,
          },
        },
      },
    });

    res.status(200).json(listing);
  } catch (err) {
    handlePrismaError(err, res);
  }
};

export const deleteListing = async (
  req: CustomRequest,
  res: Response,
): Promise<void> => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  try {
    const listing = await prisma.listing.findUnique({
      where: { id },
    });

    if (listing?.userId !== tokenUserId) {
      res.status(403).json({ message: 'Not Authorized!' });
      return;
    }

    await prisma.listing.delete({
      where: { id },
    });

    res.status(200).json({ message: 'Listing deleted!' });
  } catch (err) {
    handlePrismaError(err, res);
  }
};
