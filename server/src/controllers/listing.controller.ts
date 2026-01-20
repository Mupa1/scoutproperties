import { Property, Type } from '@prisma/client';
import { Request, Response } from 'express';

import { CustomRequest } from '@/types';

import { handleError, notFound, unauthorized } from '../lib/errors';
import { prisma } from '../lib/prisma';

export const createListing = async (
  req: CustomRequest,
  res: Response,
): Promise<Response | void> => {
  const body = req.body;
  const tokenUserId = req.userId;

  if (!tokenUserId) {
    return unauthorized(res, 'User must be authenticated to create listings');
  }

  try {
    // Verify user exists before creating listing
    const user = await prisma.user.findUnique({
      where: { id: tokenUserId },
    });

    if (!user) {
      return handleError(
        res,
        new Error('User not found'),
        'User not found. Cannot create listing.',
        404,
      );
    }

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
    return handleError(res, err, 'Failed to create listing!');
  }
};

export const updateListing = async (
  req: CustomRequest,
  res: Response,
): Promise<Response | void> => {
  const { id } = req.params;
  const idString = typeof id === 'string' ? id : id[0];
  const { listingData, listingDetails } = req.body;
  const tokenUserId = req.userId;

  try {
    const listing = await prisma.listing.findUnique({
      where: { id: idString },
    });
    if (!listing) {
      return notFound(res, 'Listing');
    }

    if (listing.userId !== tokenUserId) {
      return unauthorized(res);
    }

    const updatedListing = await prisma.listing.update({
      where: { id: idString },
      data: {
        ...listingData,
        listingDetails: {
          update: listingDetails,
        },
      },
    });

    res.status(200).json(updatedListing);
  } catch (err) {
    return handleError(res, err, 'Failed to update listing!');
  }
};

export const getListings = async (
  req: Request,
  res: Response,
): Promise<Response | void> => {
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
      whereClause.city = {
        contains: city.trim(),
      };
    }

    // Add type filter if provided
    if (typeof type === 'string' && (type === Type.Buy || type === Type.Rent)) {
      whereClause.type = type as Type;
    }

    // Add property filter if provided
    if (
      typeof property === 'string' &&
      (property === Property.Apartment ||
        property === Property.House ||
        property === Property.Condo ||
        property === Property.Land)
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
      where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
    });

    res.status(200).json(listings);
  } catch (err) {
    return handleError(res, err, 'Failed to get listings!');
  }
};

export const getListing = async (
  req: Request,
  res: Response,
): Promise<Response | void> => {
  const { id } = req.params;
  const idString = typeof id === 'string' ? id : id[0];
  try {
    // Get listing with listingDetails and user
    // Since listings are always created by users, user should always exist
    const listing = await prisma.listing.findUnique({
      where: { id: idString },
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

    if (!listing) {
      return notFound(res, 'Listing');
    }

    // If user doesn't exist (shouldn't happen due to foreign key, but handle gracefully)
    if (!listing.user) {
      console.error('User not found for listing:', listing.userId);
      return handleError(
        res,
        new Error('User associated with listing not found'),
        'Failed to get listing!',
        500,
      );
    }

    // Extract user and return listing with user
    const { user, ...listingData } = listing;
    res.status(200).json({
      ...listingData,
      user,
    });
  } catch (err) {
    return handleError(res, err, 'Failed to get listing!');
  }
};

export const deleteListing = async (
  req: CustomRequest,
  res: Response,
): Promise<Response | void> => {
  const { id } = req.params;
  const idString = typeof id === 'string' ? id : id[0];
  const tokenUserId = req.userId;

  try {
    const listing = await prisma.listing.findUnique({
      where: { id: idString },
    });

    if (!listing) {
      return notFound(res, 'Listing');
    }

    if (listing.userId !== tokenUserId) {
      return unauthorized(res);
    }

    await prisma.listing.delete({
      where: { id: idString },
    });

    res.status(200).json({ message: 'Listing deleted!' });
  } catch (err) {
    return handleError(res, err, 'Failed to delete listing!');
  }
};
