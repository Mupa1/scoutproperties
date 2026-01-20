import { PrismaClient } from '@prisma/client';

// For Prisma 7, MongoDB connections work with the connection URL from environment variables
// The URL is configured in prisma.config.ts for Migrate/CLI tools
// PrismaClient automatically reads DATABASE_URL from environment variables
// MongoDB doesn't require a separate adapter like SQL databases do
export const prisma = new PrismaClient();
