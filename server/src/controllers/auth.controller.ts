import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { prisma } from '@/lib/prisma';
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

if (!JWT_SECRET_KEY) {
  throw new Error('JWT_SECRET_KEY is not defined in the environment variables');
}

export const register = async (req: Request, res: Response) => {
  const { name, email, username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json({ message: 'User registered successfully!' });
    return newUser;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        return res.status(400).json({
          message: 'User with this email or username already exists!',
        });
      }
    }
    res
      .status(500)
      .json({ message: 'Failed to register user! Please try again!' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) return res.status(401).json({ message: 'Invalid Credentials!' });

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword)
      return res.status(401).json({ message: 'Invalid Credentials!' });

    const age = 1000 * 60 * 60 * 24 * 7;
    const token = jwt.sign(
      {
        id: user.id,
      },
      JWT_SECRET_KEY,
      { expiresIn: age },
    );

    const { password: userPassword, ...userData } = user;
    res
      .cookie('token', token, {
        httpOnly: true,
        secure: true,
        maxAge: age,
      })
      .status(200)
      .json(userData);
    return userPassword;
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to login user!' });
  }
};

export const logout = (req: Request, res: Response) => {
  res
    .clearCookie('token')
    .status(200)
    .json({ message: 'User logged out successfully!' });
};
