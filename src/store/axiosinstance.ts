import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { BASE_URL } from "./baseApi";
import { useAuth, useFingerprint } from ".";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Attach token to request
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuth.getState().accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- Refresh Token Locking Mechanism ---
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function onRefreshed(token: string) {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
}

function addRefreshSubscriber(callback: (token: string) => void) {
  refreshSubscribers.push(callback);
}

// Handle 403 (expired/invalid token)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    const { setAccessToken } = useAuth.getState();
    const { fingerprint } = useFingerprint.getState();

    if (
      error.response?.status === 403 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const res = await axios.post(
            `${BASE_URL}/auth/refresh`,
            { fingerprint },
            { withCredentials: true }
          );

          const newToken = res.data.token;
          setAccessToken(newToken);
          axiosInstance.defaults.headers.Authorization = `Bearer ${newToken}`;

          onRefreshed(newToken);
          isRefreshing = false;

          return axiosInstance(originalRequest);
        } catch (refreshError) {
          setAccessToken("");
          refreshSubscribers = [];
          isRefreshing = false;
          return Promise.reject(refreshError);
        }
      }

      // Wait for token to refresh
      return new Promise((resolve) => {
        addRefreshSubscriber((token: string) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(axiosInstance(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
