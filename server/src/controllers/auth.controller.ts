import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

export const register = async (req: Request, res: Response) => {
  const { password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  res.status(201).json({ message: 'User registered successfully' });
};

export const login = (req: Request, res: Response) => {
  res.status(200).json({ message: 'User logged in successfully' });
};

export const logout = (req: Request, res: Response) => {
  res.status(200).json({ message: 'User logged out successfully' });
};
