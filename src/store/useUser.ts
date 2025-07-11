import { create } from "zustand";
import { isAxiosError } from "axios";

import axiosInstance from "./axiosinstance";

interface User {
  email: string;
  username: string;
  bio?: string | null;
  XUrl?: string | null;
  discordUrl?: string | null;
  websiteUrl?: string | null;
  avatarUrl?: string | null;
  bannerUrl?: string | null;
  games: {
    played: number;
    hosted: number;
    wins: number;
  };
}

interface UserState {
  isUserLoading: boolean;
  user: User | null;

  getUser: () => void;

  removeUser: () => void;

  updateUserInfo: (
    username: string,
    bio?: string | null,
    XUrl?: string | null,
    discordUrl?: string | null,
    websiteUrl?: string | null
  ) => Promise<{
    status: "success" | "error";
    message: string;
  }>;

  updateUserImages: (
    avatarFile?: File,
    bannerFile?: File
  ) => Promise<{
    status: "success" | "error";
    message: string;
  }>;
}

const useUser = create<UserState>((set) => ({
  isUserLoading: false,
  user: null,

  removeUser: () => {
    set({ user: null });
  },

  getUser: async () => {
    set({ isUserLoading: true });

    try {
      const res = await axiosInstance.get("/user/me");

      const userData = res.data.user;

      set({ user: userData });
    } catch (err) {
      set({ user: null });
      console.error("Failed to fetch user", err);
    } finally {
      set({ isUserLoading: false });
    }
  },

  updateUserInfo: async (username, bio, XUrl, discordUrl, websiteUrl) => {
    set({ isUserLoading: true });

    try {
      const response = await axiosInstance.patch("/user/update-info", {
        username,
        bio,
        XUrl,
        discordUrl,
        websiteUrl,
      });

      if (response.data.success) {
        return {
          status: "success",
          message: response.data.message || "User Info Update was successful.",
        };
      }

      return {
        status: "error",
        message: response.data.message || "Unknown User Info error.",
      };
    } catch (error) {
      console.log(error);
      if (isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          "User Info failed. Please try again.";
        return { status: "error", message };
      }
      return { status: "error", message: "Unexpected error." };
    } finally {
      set({ isUserLoading: false });
    }
  },

  updateUserImages: async (avatarFile, bannerFile) => {
    set({ isUserLoading: true });

    try {
      const formData = new FormData();
      if (avatarFile) formData.append("avatar", avatarFile);
      if (bannerFile) formData.append("banner", bannerFile);

      const response = await axiosInstance.post(
        "/user/upload-user-images",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        return {
          status: "success",
          message: response.data.message || "User images updated successfully.",
        };
      }

      return {
        status: "error",
        message: response.data.message || "Unknown image update error.",
      };
    } catch (error) {
      console.log(error);
      if (isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          "Image update failed. Please try again.";
        return { status: "error", message };
      }
      return { status: "error", message: "Unexpected error." };
    } finally {
      set({ isUserLoading: false });
    }
  },
}));

export default useUser;
