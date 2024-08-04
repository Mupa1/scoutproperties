import { QueryFunctionContext } from '@tanstack/react-query';

import {
  CreateListingData,
  CreateListingResponse,
  NewUser,
  QueryParams,
} from '@/types';

import { axiosInstance } from './axiosInstance';

export const signupUser = async (data: NewUser) => {
  try {
    const response = await axiosInstance.post('/auth/register', data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const signinUser = async (data: { email: string; password: string }) => {
  try {
    const response = await axiosInstance.post('/auth/login', data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    const response = await axiosInstance.post('/auth/logout');
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateCurrentUser = async (id: string, data: Partial<NewUser>) => {
  try {
    const response = await axiosInstance.put(`/users/${id}`, data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createListing = async (
  data: CreateListingData,
): Promise<CreateListingResponse> => {
  try {
    const response = await axiosInstance.post('/listings', data);
    return response.data;
  } catch (error) {
    console.error('Failed to create listing:', error);
    throw error;
  }
};

export const updateListing = async (
  id: string,
  data: CreateListingData,
): Promise<CreateListingResponse> => {
  try {
    const response = await axiosInstance.put(`/listings/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Failed to update listing:', error);
    throw error;
  }
};

export const getListings = async ({
  queryKey,
}: QueryFunctionContext<[string, QueryParams]>) => {
  const [, queryParams] = queryKey;
  const queryString = new URLSearchParams(queryParams).toString();
  const response = await axiosInstance.get(`/listings?${queryString}`);
  return response.data;
};

export const getListingById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/listings/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to get listing:', error);
    throw error;
  }
};

export const getProfileListings = async () => {
  try {
    const response = await axiosInstance.get('/users/profileListings');
    return response.data;
  } catch (error) {
    console.error('Failed to get profile listings:', error);
    throw error;
  }
};
