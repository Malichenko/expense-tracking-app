import axios from "axios";
import { authRequestInterceptor } from "../interceptors/request/auth-request-interceptor";
import { createTokenRefreshInterceptor } from "../interceptors/response/token-refresh-interceptor";

export const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_FIREBASE_BACKEND_URL,
});

apiClient.interceptors.request.use(authRequestInterceptor);

apiClient.interceptors.response.use(
  (response) => response,
  createTokenRefreshInterceptor(apiClient)
);
