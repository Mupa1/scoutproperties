import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET_KEY_ENV = process.env.JWT_SECRET_KEY;

if (!JWT_SECRET_KEY_ENV) {
  throw new Error('JWT_SECRET_KEY is not defined in the environment variables');
}

const JWT_SECRET_KEY: string = JWT_SECRET_KEY_ENV;

export const config = {
  jwtSecret: JWT_SECRET_KEY,
};
