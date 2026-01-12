import { NextFunction, Response } from 'express';

import { notFound, unauthorized } from '../lib/errors';
import { prisma } from '../lib/prisma';
import { CustomRequest } from '../types';

type ResourceType = 'listing' | 'user';

interface CheckOwnershipOptions {
  resourceType: ResourceType;
  paramId?: string; // Default is 'id'
}

export const checkOwnership = (options: CheckOwnershipOptions) => {
  const { resourceType, paramId = 'id' } = options;

  return async (
    req: CustomRequest,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    const paramValue = req.params[paramId];
    const resourceId =
      typeof paramValue === 'string' ? paramValue : paramValue[0];
    const userId = req.userId;

    if (!userId) {
      return unauthorized(res);
    }

    try {
      let resource;

      if (resourceType === 'listing') {
        resource = await prisma.listing.findUnique({
          where: { id: resourceId },
        });
      } else if (resourceType === 'user') {
        resource = await prisma.user.findUnique({
          where: { id: resourceId },
        });
      }

      if (!resource) {
        return notFound(res, resourceType === 'listing' ? 'Listing' : 'User');
      }

      const resourceUserId =
        resourceType === 'listing'
          ? (resource as { userId: string }).userId
          : resource.id;

      if (resourceUserId !== userId) {
        return unauthorized(res);
      }

      next();
    } catch (error) {
      console.error('Error checking ownership:', error);
      return unauthorized(res);
    }
  };
};
