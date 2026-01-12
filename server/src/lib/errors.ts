import { Prisma } from '@prisma/client';
import { Response } from 'express';

export const handleError = (
  res: Response,
  error: unknown,
  defaultMessage: string,
  statusCode = 500,
): Response => {
  console.error(defaultMessage, error);

  // Handle Prisma known errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return res.status(400).json({
        message: 'Resource already exists',
      });
    }
  }

  return res.status(statusCode).json({ message: defaultMessage });
};

export const notFound = (res: Response, resource: string): Response => {
  return res.status(404).json({ message: `${resource} not found` });
};

export const unauthorized = (
  res: Response,
  message = 'Not Authorized!',
): Response => {
  return res.status(403).json({ message });
};
