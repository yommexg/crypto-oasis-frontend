import { create } from "zustand";
import axiosInstance from "./axiosinstance";

interface User {
  id: string;
  email: string;
  username: string;
}

interface UserState {
  isUserLoading: boolean;
  user: User | null;
  setUser: (user: User) => void;
  getUser: () => Promise<User | null>;
}

export const useUserStore = create<UserState>((set) => ({
  isUserLoading: false,
  user: null,

  setUser: (user) => set({ user }),

  getUser: async () => {
    set({ isUserLoading: true });

    try {
      const res = await axiosInstance.get("/user/me", {
        withCredentials: true,
      });
      // console.log(res.data);
      const userData = res.data;
      set({ user: userData });
      return userData;
    } catch (err) {
      console.error("Failed to fetch user", err);
      return null;
    } finally {
      set({ isUserLoading: false });
    }
  },
}));
