import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { config } from '../lib/config';
import { handleError } from '../lib/errors';
import { comparePassword, hashPassword } from '../lib/password';
import { prisma } from '../lib/prisma';

export const register = async (req: Request, res: Response) => {
  const { name, email, company, password } = req.body;

  try {
    const hashedPassword = await hashPassword(password);
    const newUser = await prisma.user.create({
      data: {
        name,
        company,
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json({ message: 'User registered successfully!' });
    return newUser;
  } catch (err: unknown) {
    // Check for Prisma unique constraint violation (P2002)
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === 'P2002'
    ) {
      return res.status(400).json({
        message: 'User with this email or company already exists!',
      });
    }

    // Also check for plain object with P2002 code (for test mocks)
    if (
      err &&
      typeof err === 'object' &&
      'code' in err &&
      err.code === 'P2002'
    ) {
      return res.status(400).json({
        message: 'User with this email or company already exists!',
      });
    }

    return handleError(res, err, 'Failed to register user! Please try again!');
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) return res.status(401).json({ message: 'Invalid Credentials!' });

    const isValidPassword = await comparePassword(password, user.password);

    if (!isValidPassword)
      return res.status(401).json({ message: 'Invalid Credentials!' });

    const age = 1000 * 60 * 60 * 24 * 7;
    const token = jwt.sign(
      {
        id: user.id,
      },
      config.jwtSecret,
      { expiresIn: age },
    );

    const { password: userPassword, ...userData } = user;
    res
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: age,
      })
      .status(200)
      .json(userData);
    return userPassword;
  } catch (err) {
    return handleError(res, err, 'Failed to login user!');
  }
};

export const logout = (req: Request, res: Response) => {
  res
    .clearCookie('token')
    .status(200)
    .json({ message: 'User logged out successfully!' });
};
