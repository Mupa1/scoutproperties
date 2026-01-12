import { NextFunction, Response } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';

import { config } from '../lib/config';
import { CustomRequest } from '../types';

interface JwtPayload {
  id: string;
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
    config.jwtSecret,
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
