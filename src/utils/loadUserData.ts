// import { useWallet } from "../context/Wallet";
import { useUser, useGame } from "../store";

export const useLoadUserData = () => {
  const { getUser } = useUser();
  const { getGames, getCurrentGames, getHostedGames, getPlayedGames } =
    useGame();

  const loadUserData = async () => {
    try {
      await Promise.all([
        getUser(),
        getGames(),
        getCurrentGames(),
        getHostedGames(),
        getPlayedGames(),
      ]);
    } catch (error) {
      console.error("Error loading user data:", error);
      throw error;
    }
  };

  return loadUserData;
};
