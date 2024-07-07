import axios from 'axios';

const apiKey =
  import.meta.env.VITE_API_BASE_URL || 'http://api.scout-properties.com';

export const axiosInstance = axios.create({
  baseURL: apiKey,
  withCredentials: true,
});
