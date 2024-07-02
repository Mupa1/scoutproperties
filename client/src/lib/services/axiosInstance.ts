import axios from 'axios';

const apiKey = import.meta.env.VITE_API_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: apiKey,
  withCredentials: true,
});
