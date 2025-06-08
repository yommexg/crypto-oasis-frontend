import { AxiosError } from "axios";
import { create } from "zustand";

import { BASE_URL } from "./baseApi";
import axiosInstance from "./axiosinstance";

interface AuthState {
  isAuthLoading: boolean;
  accessToken: string | null;

  setAccessToken: (token: string) => void;
  logout: () => void;
  login: (
    email: string,
    password: string
  ) => Promise<{
    status: "success" | "otp_required" | "error";
    message: string;
  }>;
  newDevicelogin: (
    email: string,
    otp: string
  ) => Promise<{
    status: "success" | "error";
    message: string;
  }>;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthLoading: false,

  accessToken: localStorage.getItem("accessToken"),

  setAccessToken: (token) => {
    localStorage.setItem("accessToken", token);
    set({ accessToken: token });
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    set({ accessToken: null, isAuthLoading: false });
    // axiosInstance.post("/auth/logout").catch(() => {});
  },

  login: async (email, password) => {
    set({ isAuthLoading: true });

    try {
      const response = await axiosInstance.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });

      if (response.status === 202) {
        return {
          status: "otp_required",
          message: response.data.message || "OTP verification required.",
        };
      }

      if (response.status === 200) {
        const token = response.data.token;
        useAuthStore.getState().setAccessToken(token);

        return {
          status: "success",
          message: response.data.message || "Login successful.",
        };
      }

      return {
        status: "error",
        message: response.data.message || "Unknown login error.",
      };
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message =
        err.response?.data?.message || "Login failed. Please try again.";

      return {
        status: "error",
        message,
      };
    } finally {
      set({ isAuthLoading: false });
    }
  },

  newDevicelogin: async (email, otp) => {
    set({ isAuthLoading: true });

    try {
      const response = await axiosInstance.post(
        `${BASE_URL}/auth/verify-and-login`,
        {
          email,
          otp,
        }
      );

      if (response.status === 200) {
        const token = response.data.token;
        useAuthStore.getState().setAccessToken(token);

        return {
          status: "success",
          message: response.data.message || "Login successful.",
        };
      }

      return {
        status: "error",
        message: response.data.message || "Unknown login error.",
      };
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message =
        err.response?.data?.message || "Login failed. Please try again.";

      return {
        status: "error",
        message,
      };
    } finally {
      set({ isAuthLoading: false });
    }
  },
}));

export default useAuthStore;
