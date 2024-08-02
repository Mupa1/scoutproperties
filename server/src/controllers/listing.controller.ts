import dotenv from 'dotenv';
import { Request, Response } from 'express';

import { CustomRequest } from '@/types';

import { prisma } from '../lib/prisma';
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

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
    console.error(err);
    res.status(500).json({ message: 'Failed to create listing!' });
  }
};

export const getListings = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { city, type, property, bedroom, minPrice, maxPrice } = req.query;
  try {
    const listings = await prisma.listing.findMany({
      where: {
        city: typeof city === 'string' ? city : undefined,
        type:
          typeof type === 'string' && Object.values(Type).includes(type as Type)
            ? (type as Type)
            : undefined,
        property:
          typeof property === 'string' &&
          Object.values(Property).includes(property as Property)
            ? (property as Property)
            : undefined,

        bedroom: parseInt(bedroom as string) || undefined,
        price: {
          gte: parseInt(minPrice as string) || undefined,
          lte: parseInt(maxPrice as string) || undefined,
        },
      },
    });

    res.status(200).json(listings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to get listings!' });
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
    console.error(err);
    res.status(500).json({ message: 'Failed to get listing!' });
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
    console.error(err);
    res.status(500).json({ message: 'Failed to delete listing!' });
  }
};
