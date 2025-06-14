import { create } from "zustand";
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
}

interface UserState {
  isUserLoading: boolean;
  user: User | null;

  getUser: () => void;
}

const useUser = create<UserState>((set) => ({
  isUserLoading: false,
  user: null,

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
}));

export default useUser;
