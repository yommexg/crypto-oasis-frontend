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
  games: Game[];
  currentGames: Game[];
  hostedGames: Game[];
  playedGames: Game[];
  currentGameId: string | null;

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

  getGames: () => void;
  getCurrentGames: () => void;
  getHostedGames: () => void;
  getPlayedGames: () => void;
  getIndividualGameData: (gameId: string) => void;
}

const useGame = create<GameState>((set) => ({
  isGameLoading: false,
  games: [],
  currentGames: [],
  hostedGames: [],
  playedGames: [],
  currentGameId: null,

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

      const response = await axiosInstance.post("/games/create", formData, {
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

  getGames: async () => {
    set({ isGameLoading: true });

    try {
      const res = await axiosInstance.get("/games/all");

      const gameData: Game[] = res.data.games;

      set({ games: gameData });
    } catch (err) {
      set({ games: [] });
      console.error("Failed to fetch Games", err);
    } finally {
      set({ isGameLoading: false });
    }
  },

  getCurrentGames: async () => {
    set({ isGameLoading: true });

    try {
      const res = await axiosInstance.get("/games/current");

      const gameData: Game[] = res.data.games;

      set({ currentGames: gameData });
    } catch (err) {
      set({ currentGames: [] });
      console.error("Failed to fetch Games", err);
    } finally {
      set({ isGameLoading: false });
    }
  },

  getHostedGames: async () => {
    set({ isGameLoading: true });

    try {
      const res = await axiosInstance.get("/games/hosted");

      const gameData: Game[] = res.data.games;

      set({ hostedGames: gameData });
    } catch (err) {
      set({ hostedGames: [] });
      console.error("Failed to fetch Games", err);
    } finally {
      set({ isGameLoading: false });
    }
  },

  getPlayedGames: async () => {
    set({ isGameLoading: true });

    try {
      const res = await axiosInstance.get("/games/played");

      const gameData: Game[] = res.data.games;

      set({ playedGames: gameData });
    } catch (err) {
      set({ playedGames: [] });
      console.error("Failed to fetch Games", err);
    } finally {
      set({ isGameLoading: false });
    }
  },

  getIndividualGameData: async (gameId) => {
    set({ currentGameId: gameId });
  },
}));

export default useGame;
