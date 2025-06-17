import { create } from "zustand";

import axiosInstance from "./axiosinstance";
import { isAxiosError } from "axios";

interface Game {
  id: string;
  title: string;
  type:
    | "pocker"
    | "bingo"
    | "avatar"
    | "game 04"
    | "game 05"
    | "game 06"
    | "game 07"
    | "game 08"
    | "game 09"
    | "game 10";
  image: string;
  status: "open" | "hosting" | "finished";
  startDate: Date;
  playersCount: number;
  maxNumOfPlayers: number;
  creatorName: string | null;
  winnerName: string | null;
  playersNames: string[];
}

interface GameState {
  isGameLoading: boolean;
  game: Game[];

  createGame: (
    title: string,
    type: string,
    maxNumOfPlayers: number,
    privacy: string,
    spectatorMode: boolean,
    startDarte: string,
    gameImgFile: File
  ) => Promise<{
    status: "success" | "error";
    message: string;
  }>;

  getGame: () => void;
}

const useGame = create<GameState>((set) => ({
  isGameLoading: false,
  game: [],

  createGame: async (
    title,
    type,
    maxNumOfPlayers,
    privacy,
    spectatorMode,
    startDate,
    gameImgFile
  ) => {
    set({ isGameLoading: true });

    try {
      const formData = new FormData();
      if (title) formData.append("title", title);
      if (type) formData.append("type", type);
      if (maxNumOfPlayers)
        formData.append("maxNumOfPlayers", maxNumOfPlayers.toString());
      if (privacy) formData.append("privacy", privacy);
      if (spectatorMode)
        formData.append("spectatorMode", spectatorMode.toString());
      if (startDate) formData.append("startDate", startDate);
      if (gameImgFile) formData.append("game", gameImgFile);

      const response = await axiosInstance.post("/game/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        return {
          status: "success",
          message: response.data.message || "Registration was successful.",
        };
      } else {
        return {
          status: "error",
          message: response.data.message || "Game creation failed.",
        };
      }
    } catch (error) {
      if (isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          "Image update failed. Please try again.";
        return { status: "error", message };
      }
      return { status: "error", message: "Unexpected error." };
    } finally {
      set({ isGameLoading: false });
    }
  },

  getGame: async () => {
    set({ isGameLoading: true });

    try {
      const res = await axiosInstance.get("/game/all");

      const gameData: Game[] = res.data.games;

      set({ game: gameData });
    } catch (err) {
      set({ game: [] });
      console.error("Failed to fetch Games", err);
    } finally {
      set({ isGameLoading: false });
    }
  },
}));

export default useGame;
