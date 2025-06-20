// axiosInstance.ts
import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { BASE_URL } from "./baseApi";
import { useAuth } from ".";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Attach token
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

// Refresh on 403
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.get(`${BASE_URL}/auth/refresh`, {
          withCredentials: true,
        });

        const newToken = res.data.token;

        const { setAccessToken } = useAuth.getState();

        setAccessToken(newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        const { logout } = useAuth.getState();

        logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
