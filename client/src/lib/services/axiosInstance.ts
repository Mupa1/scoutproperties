import axios from 'axios';

const BASE_API_URL = 'https://api.scout-properties.com';

export const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
