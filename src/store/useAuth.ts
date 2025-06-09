import { create } from "zustand";
import axiosInstance from "./axiosinstance";
import { isAxiosError } from "axios";

const ACCESS_TOKEN_KEY = "accessToken";

interface AuthState {
  isAuthLoading: boolean;
  accessToken: string | null;

  setAccessToken: (token: string | null) => void;
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

const getInitialToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }
  return null;
};

const useAuth = create<AuthState>((set) => ({
  isAuthLoading: false,
  accessToken: getInitialToken(),

  setAccessToken: (token) => {
    if (typeof window !== "undefined") {
      if (token) {
        localStorage.setItem(ACCESS_TOKEN_KEY, token);
      } else {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
      }
    }
    set({ accessToken: token });
  },

  logout: () => {
    set({ isAuthLoading: true });

    if (typeof window !== "undefined") {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
    }

    set({ accessToken: null, isAuthLoading: false });

    axiosInstance
      .post("/auth/logout")
      .catch(() => {})
      .finally(() => {
        set({ isAuthLoading: false });
      });
  },

  login: async (email, password) => {
    set({ isAuthLoading: true });

    try {
      const response = await axiosInstance.post("/auth/login", {
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
        set({ accessToken: token });
        if (typeof window !== "undefined") {
          localStorage.setItem(ACCESS_TOKEN_KEY, token);
        }

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
      if (isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Login failed. Please try again.";
        return { status: "error", message };
      }
      return { status: "error", message: "Unexpected error." };
    } finally {
      set({ isAuthLoading: false });
    }
  },

  newDevicelogin: async (email, otp) => {
    set({ isAuthLoading: true });

    try {
      const response = await axiosInstance.post("/auth/verify-and-login", {
        email,
        otp,
      });

      if (response.status === 200) {
        const token = response.data.token;
        set({ accessToken: token });
        if (typeof window !== "undefined") {
          localStorage.setItem(ACCESS_TOKEN_KEY, token);
        }

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
      if (isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Login failed. Please try again.";
        return { status: "error", message };
      }
      return { status: "error", message: "Unexpected error." };
    } finally {
      set({ isAuthLoading: false });
    }
  },
}));

export default useAuth;
