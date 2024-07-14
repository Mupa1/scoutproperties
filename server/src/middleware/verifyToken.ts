import dotenv from 'dotenv';
import { NextFunction, Response } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';

import { CustomRequest } from '../types';

dotenv.config();

interface JwtPayload {
  id: string;
}

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

if (!JWT_SECRET_KEY) {
  throw new Error('JWT_SECRET_KEY is not defined in the environment variables');
}

export const verifyToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Not Authenticated!' });
  }

  jwt.verify(
    token,
    JWT_SECRET_KEY,
    (err: VerifyErrors | null, decoded: string | unknown) => {
      if (err) {
        return res.status(403).json({ message: 'Token is not valid' });
      }

      const payload = decoded as JwtPayload;

      if (payload && payload.id) {
        req.userId = payload.id;
      }

      next();
    },
  );
};
