import * as z from 'zod';

export const SignupValidation = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  company: z
    .string()
    .min(2, { message: 'company must be at least 2 characters.' }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters.' }),
});

export const SigninValidation = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters.' }),
});

export const ProfileValidation = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  company: z
    .string()
    .min(2, { message: 'company must be at least 2 characters.' }),
  email: z.string().email(),
  password: z
    .string()
    .refine((val) => val === '' || val.length >= 8, {
      message: 'Password must be at least 8 characters.',
    })
    .optional(),
});

export const ListingValidation = z.object({
  title: z.string().min(1, 'Title is required'),
  price: z.number().min(0, 'Price must be a positive number'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  description: z.string().min(1, 'Description is required'),
  bedroom: z.number().min(1, 'At least one bedroom is required'),
  bathroom: z.number().min(1, 'At least one bathroom is required'),
  latitude: z.string().min(1, 'Latitude is required'),
  longitude: z.string().min(1, 'Longitude is required'),
  type: z.enum(['Rent', 'Buy']),
  property: z.enum(['Apartment', 'House', 'Condo', 'Land']),
  parking: z.enum(['Available', 'Unavailable']).optional(),
  size: z.number().min(0, 'Size must be a positive number').optional(),
  school: z.number().min(0, 'School must be a positive number').optional(),
  bus: z.number().min(0, 'Bus must be a positive number').optional(),
  restaurant: z
    .number()
    .min(0, 'Restaurant must be a positive number')
    .optional(),
});
