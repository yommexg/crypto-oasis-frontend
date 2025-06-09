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

  getUser: () => void;
}

const useUser = create<UserState>((set) => ({
  isUserLoading: false,
  user: null,

  getUser: async () => {
    set({ isUserLoading: true });

    try {
      const res = await axiosInstance.get("/user/me");

      const userData = res.data;

      set({ user: userData });
      console.log(userData);
    } catch (err) {
      set({ user: null });
      console.error("Failed to fetch user", err);
    } finally {
      set({ isUserLoading: false });
    }
  },
}));

export default useUser;
