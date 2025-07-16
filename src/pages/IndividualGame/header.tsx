import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FiCopy } from "react-icons/fi";
import { FaX } from "react-icons/fa6";
import { IoPlayOutline } from "react-icons/io5";

import { useAuth, useGame } from "../../store";
import { formatDate2 } from "../../utils/formatDate";

const IndividualGameHeader = () => {
  const { currentGame, getIndividualGameData } = useGame();
  const { accessToken } = useAuth();
  const { gameId } = useParams();

  useEffect(() => {
    if (accessToken && gameId) {
      getIndividualGameData(gameId);
    }
  }, [gameId, accessToken, getIndividualGameData]);

  return currentGame ? (
    <div className="md:flex flex-row px-4 md:px-10 xl:px-16 md:py-8 md:justify-between relative">
      <div className="flex gap-4">
        <div className="w-32 h-32">
          <img
            src={currentGame.image}
            alt={currentGame.title}
            className="h-full w-full rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-1 justify-center">
          <h4
            className="bg-[#CCE919] w-20 rounded-full py-[2px] font-semibold
           text-black text-[10px] text-center">
            Round {currentGame.currentRound}
          </h4>
          <h2
            className="capitalize mt-1 text-lg font-bold truncate whitespace-nowrap 
          overflow-hidden max-w-[120px] md:max-w-[250px] lg:max-w-[500px] xl:max-w-[650px]">
            {currentGame.title}
            bjkgbkjdbkjbkjfgiierilreiuggugeukigoueqkjgigbilbjbbgfv5fjkgbfjkgvb5fjlkgligbilagbilgbilklgbilgbjlgblbglgbil
          </h2>
          <p className="font-medium text-[#9FA0AF] text-[10px]">
            {formatDate2(currentGame.startDate.toString())}
          </p>
          <div className="flex mt-2 gap-4">
            <button
              className="flex items-center gap-1 md:gap-2 border-2 rounded-md 
            border-[#30B943] px-2 md:px-4 py-[6px] text-[10px] md:text-xs cursor-pointer">
              <IoPlayOutline size={18} />
              <p>Start Game</p>
            </button>
            <button
              className="flex items-center gap-1 md:gap-2 border-2 rounded-md 
            border-[#C34C4C] px-2 md:px-4 py-[6px] text-[10px] md:text-xs 
            cursor-pointer">
              <FaX size={10} />
              <p>Cancel</p>
            </button>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-4 md:static flex flex-col gap-2 md:justify-normal items-end">
        <button
          className="flex items-center gap-2 bg-[#292A33] font-medium text-[#BFC0CC]
        px-2 py-1 rounded-sm text-[8px] md:text-[10px] cursor-pointer">
          <p>Copy Invite link</p>
          <FiCopy />
        </button>

        <button
          className="px-4 md:px-6 md:mt-8 py-[2px] md:py-[6px] bg-[#30B943] rounded-md shadow md:w-40
          shadow-[#30B943] hover:shadow-lg hover:opacity-70 transition-shadow
           duration-300 font-semibold text-white cursor-pointer text-[10px] md:text-xs">
          Lobby
        </button>
      </div>
    </div>
  ) : (
    <div className="text-center">This Game is Not Availiable</div>
  );
};

export default IndividualGameHeader;
