import { create } from "zustand";
import axiosInstance from "./axiosinstance";
import { isAxiosError } from "axios";
import useUser from "./useUser";

const ACCESS_TOKEN_KEY = "accessToken";

interface AuthState {
  isAuthLoading: boolean;
  accessToken: string | null;

  setAccessToken: (token: string | null) => void;
  logout: (fingerprint: string | null) => void;

  login: (
    email: string,
    password: string,
    fingerprint: string | null
  ) => Promise<{
    status: "success" | "otp_required" | "error";
    message: string;
  }>;

  newDevicelogin: (
    email: string,
    otp: string,
    fingerprint: string | null
  ) => Promise<{
    status: "success" | "error";
    message: string;
  }>;

  sendEmailVerification: (email: string) => Promise<{
    status: "success" | "error";
    message: string;
  }>;

  verifyNewEmail: (token: string) => Promise<{
    status: "success" | "error";
    message: string;
    email: string | null;
  }>;

  register: (
    email: string,
    username: string,
    password: string
  ) => Promise<{
    status: "success" | "error";
    message: string;
  }>;

  sendForgetOTP: (email: string) => Promise<{
    status: "success" | "error";
    message: string;
  }>;

  verifyForgetOTP: (
    email: string,
    otp: string
  ) => Promise<{
    status: "success" | "error";
    message: string;
  }>;

  resetPassword: (
    email: string,
    newPassword: string
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

  logout: async (fingerprint) => {
    set({ isAuthLoading: true });

    try {
      await axiosInstance.post("/auth/logout", {
        fingerprint,
      });
    } catch (error) {
      console.log(error);
    } finally {
      if (typeof window !== "undefined") {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
      }
      set({ accessToken: null, isAuthLoading: false });
      useUser.getState().removeUser();
    }
  },

  login: async (email, password, fingerprint) => {
    set({ isAuthLoading: true });

    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
        fingerprint,
      });

      if (response.status === 202) {
        return {
          status: "otp_required",
          message: response.data.message || "OTP verification required.",
        };
      }

      if (response.data.success) {
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

  newDevicelogin: async (email, otp, fingerprint) => {
    set({ isAuthLoading: true });

    try {
      const response = await axiosInstance.post("/auth/verify-and-login", {
        email,
        otp,
        fingerprint,
      });

      if (response.data.success) {
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

  sendEmailVerification: async (email) => {
    set({ isAuthLoading: true });

    try {
      const response = await axiosInstance.post(
        "/auth/send-verification-token",
        {
          email,
        }
      );

      if (response.data.success) {
        return {
          status: "success",
          message:
            response.data.message || "Email Verification Sent to your email",
        };
      }

      return {
        status: "error",
        message: response.data.message || "Unknown Request error.",
      };
    } catch (error) {
      if (isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Request failed. Please try again.";
        return { status: "error", message };
      }
      return { status: "error", message: "Unexpected error." };
    } finally {
      set({ isAuthLoading: false });
    }
  },

  verifyNewEmail: async (token) => {
    set({ isAuthLoading: true });

    try {
      const response = await axiosInstance.get(
        `/auth/verify-token?token=${token}`
      );

      if (response.data.success) {
        const email = response.data.email;

        return {
          status: "success",
          message: response.data.message || "Verification was successful.",
          email,
        };
      }

      return {
        status: "error",
        message: response.data.message || "Unknown Verification error.",
        email: null,
      };
    } catch (error) {
      console.log("verify Email Error ", error);
      if (isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          "Verification failed. Please try again.";
        return { status: "error", message, email: null };
      }
      return { status: "error", message: "Unexpected error.", email: null };
    } finally {
      set({ isAuthLoading: false });
    }
  },

  register: async (email, username, password) => {
    set({ isAuthLoading: true });

    try {
      const response = await axiosInstance.post("/auth/register", {
        email,
        username,
        password,
      });

      if (response.data.success) {
        return {
          status: "success",
          message: response.data.message || "Registration was successful.",
        };
      }

      return {
        status: "error",
        message: response.data.message || "Unknown Registration error.",
      };
    } catch (error) {
      if (isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          "Registration failed. Please try again.";
        return { status: "error", message };
      }
      return { status: "error", message: "Unexpected error." };
    } finally {
      set({ isAuthLoading: false });
    }
  },

  sendForgetOTP: async (email) => {
    set({ isAuthLoading: true });

    try {
      const response = await axiosInstance.post("/auth/request-forget-otp", {
        email,
      });

      if (response.data.success) {
        return {
          status: "success",
          message: response.data.message || "OTP Sent to your email",
        };
      }

      return {
        status: "error",
        message: response.data.message || "Unknown Request error.",
      };
    } catch (error) {
      if (isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Request failed. Please try again.";
        return { status: "error", message };
      }
      return { status: "error", message: "Unexpected error." };
    } finally {
      set({ isAuthLoading: false });
    }
  },

  verifyForgetOTP: async (email, otp) => {
    set({ isAuthLoading: true });

    try {
      const response = await axiosInstance.post("/auth/verify-forget-otp", {
        email,
        otp,
      });

      if (response.data.success) {
        return {
          status: "success",
          message:
            response.data.message || "Forget OTP Verification was successful.",
        };
      }

      return {
        status: "error",
        message:
          response.data.message || "Unknown Forget OTP Verification error.",
      };
    } catch (error) {
      if (isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          "Forget OTP Verification failed. Please try again.";
        return { status: "error", message };
      }
      return { status: "error", message: "Unexpected error." };
    } finally {
      set({ isAuthLoading: false });
    }
  },

  resetPassword: async (email, newPassword) => {
    set({ isAuthLoading: true });

    try {
      const response = await axiosInstance.post("/auth/reset-password", {
        email,
        newPassword,
      });

      if (response.data.success) {
        return {
          status: "success",
          message: response.data.message || "Password Reset was successful.",
        };
      }

      return {
        status: "error",
        message: response.data.message || "Unknown Password Reset error.",
      };
    } catch (error) {
      if (isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          "Password Reset failed. Please try again.";
        return { status: "error", message };
      }
      return { status: "error", message: "Unexpected error." };
    } finally {
      set({ isAuthLoading: false });
    }
  },
}));

export default useAuth;
