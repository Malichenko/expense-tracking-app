import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_FIREBASE_BACKEND_URL,
});

// Add request interceptor to include auth token
apiClient.interceptors.request.use(async (config) => {
  // TODO: Get token from secure storage and add to headers
  // config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Add response interceptor to handle token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // TODO: Handle token refresh or logout
    }
    return Promise.reject(error);
  }
);
