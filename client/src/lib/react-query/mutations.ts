import { useMutation } from '@tanstack/react-query';

import { CreateListingData, CreateListingResponse, NewUser } from '@/types';

import {
  createListing,
  signinUser,
  signOut,
  signupUser,
  updateCurrentUser,
  updateListing,
} from '../services/api';

export const useSignup = () => {
  return useMutation({
    mutationFn: (data: NewUser) => signupUser(data),
  });
};

export const useSignin = () => {
  return useMutation({
    mutationFn: (data: { email: string; password: string }) => signinUser(data),
  });
};

export const useSignout = () => {
  return useMutation({
    mutationFn: signOut,
  });
};

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: (data: { id: string; user: Partial<NewUser> }) =>
      updateCurrentUser(data.id, data.user),
  });
};

export const useCreateListing = () => {
  return useMutation<CreateListingResponse, Error, CreateListingData>({
    mutationFn: (data: CreateListingData) => createListing(data),
  });
};

export const useUpdateListing = () => {
  return useMutation<
    CreateListingResponse,
    Error,
    { id: string; data: CreateListingData }
  >({
    mutationFn: ({ id, data }) => updateListing(id, data),
  });
};
